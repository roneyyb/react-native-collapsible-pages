import React, { useState } from 'react'
import { BackHandler, Keyboard } from 'react-native'
import Animated, { runOnJS, useAnimatedRef } from 'react-native-reanimated'
import HOCForWrappingComponentWithAnimation from './hofc/HOFC_ForWrappingComponentWithAnimation'
import { AnimatedScrollView } from 'react-native-reanimated/lib/typescript/reanimated2/component/ScrollView'

export interface IItemsListAnimation {
    primaryView: (props: any) => React.ReactElement
    secondaryView: (props: any) => React.ReactElement

    animationClosingHeight: number
    animationOpeningHeight: number
}

interface IHOCForAddingAnimationFunctionalityPage {
    data: IItemsListAnimation[]

    callBack: Function
    activeIndex: number
    setActiveIndex: Function
}

const HOCForAddingAnimationFunctionalityPage = ({
    data,
    callBack,
    activeIndex,
    setActiveIndex,
}: IHOCForAddingAnimationFunctionalityPage) => {
    console.log('data is here', callBack, activeIndex, setActiveIndex)
    const animatedRef = useAnimatedRef<AnimatedScrollView>()
    const [step, setStep] = useState(1)

    const [collapsedState, setCollapsed] = React.useState(
        new Array(data.length).fill(false),
    )

    // Here collapsed is previous state
    const callAnimated = React.useCallback(
        (index: number, collapsed: boolean, collapsedState: boolean[]) => {
            let nextOpenIndex = collapsedState.findIndex(
                (item, currentItemIndex) => currentItemIndex > index && !item,
            )

            nextOpenIndex = nextOpenIndex === -1 ? 3 : nextOpenIndex
            if (!collapsed) setActiveIndex(nextOpenIndex)
            else {
                setActiveIndex(index)
            }

            if (nextOpenIndex === 3 && !collapsed) {
                animatedRef.current?.scrollTo({ animated: true, y: 0 })
                return
            }

            const itemOpenGap = nextOpenIndex - index
            if (index === data.length - 1 && collapsed) {
                animatedRef.current?.scrollToEnd({ animated: true })
            } else if (index === 0 && collapsed) {
                animatedRef.current?.scrollTo({ animated: true, y: 0 })
            } else {
                // console.log(index, "trigger", collapsed, index, data.slice(0, index - 1), collapsedState, data, (!collapsedState[index - 1] ? data[index - 1]?.animationOpeningHeight : ((data[index - 1].animationClosingHeight) / 2)));

                if (data) {
                    var nextY

                    if (collapsed) {
                        nextY =
                            data
                                .slice(0, index - 1)
                                .reduce(
                                    (pv, cv, index1) =>
                                        pv +
                                        (collapsedState[index1]
                                            ? cv.animationClosingHeight
                                            : index1 === 0
                                              ? cv.animationOpeningHeight
                                              : cv.animationOpeningHeight -
                                                (data?.[index1 - 1]
                                                    ?.animationClosingHeight ||
                                                    0) /
                                                    2),
                                    0,
                                ) +
                            (!collapsedState?.[index - 1]
                                ? index - 1 === 0
                                    ? data[index - 1]?.animationOpeningHeight ||
                                      0
                                    : data[index - 1]?.animationOpeningHeight ||
                                      0 -
                                          (data[index - 2]
                                              ?.animationClosingHeight || 0) /
                                              2
                                : (data[index - 1]?.animationClosingHeight ||
                                      0) / 2)
                    } else {
                        nextY =
                            index === 0 && itemOpenGap === 1
                                ? (data[0] || { animationClosingHeight: 0 })
                                      .animationClosingHeight * 0.5
                                : data
                                      .slice(0, nextOpenIndex - 1)
                                      .reduce(
                                          (pv, cv, index2) =>
                                              pv +
                                              (collapsedState[index2]
                                                  ? cv.animationClosingHeight
                                                  : cv.animationOpeningHeight),
                                          0,
                                      ) +
                                  ((
                                      data[nextOpenIndex - 1] || {
                                          animationClosingHeight: 0,
                                      }
                                  ).animationClosingHeight || 0) /
                                      2
                    }

                    // console.log(nextY, 'nextY', collapsed, collapsedState, data)

                    animatedRef.current?.scrollTo({
                        y: nextY,
                        animated: true,
                    })
                }
            }
        },
        [data, animatedRef, setActiveIndex],
    )

    const onChangeState = (index: number, exact = false) => {
        if (exact) {
            setCollapsed((collapsedState) => {
                collapsedState[index] = true
                return [...collapsedState]
            })
            return
        }

        let nextOpenIndex = collapsedState.findIndex(
            (item, currentItemIndex) => currentItemIndex > index && !item,
        )

        if (!collapsedState[index] && nextOpenIndex == -1) {
            setCollapsed(() => {
                return data.map(() => true)
            })
        } else {
            setCollapsed((collapsedState) => {
                collapsedState[index] = !collapsedState[index]
                return [...collapsedState]
            })
        }
    }

    const backAction = React.useCallback(() => {
        console.log('Active index', activeIndex, collapsedState)
        if (activeIndex === 0) {
            return false
        } else {
            if (collapsedState[activeIndex - 1]) {
                setCollapsed((collapsedState) => {
                    collapsedState[activeIndex - 1] =
                        !collapsedState[activeIndex - 1]
                    return [...collapsedState]
                })
            } else {
                callAnimated(
                    activeIndex - 1,
                    true,
                    collapsedState.map((item, arrayIndx) =>
                        arrayIndx == activeIndex - 1 ? !item : item,
                    ),
                )
            }

            return true
        }
    }, [activeIndex, callAnimated, collapsedState])

    React.useEffect(() => {
        const keyboardWillHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                animatedRef?.current?.scrollTo({ x: 0, y: 0, animated: true })
            },
        )

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        )

        return () => {
            keyboardWillHideListener.remove()
            backHandler.remove()
        }
    }, [backAction, collapsedState, activeIndex, animatedRef])

    const deterMineCurrentActiveIndex = (event: any) => {
        const stopLocation = event.contentOffset.y
        let startLocation = 0
        for (let index = 0; index < data.length; index++) {
            const item = data[index]
            const isItemCollapsed = collapsedState[index]
            const endLocation =
                startLocation +
                (isItemCollapsed
                    ? item?.animationClosingHeight || 0
                    : item?.animationOpeningHeight || 0)
            const isLocationInRange =
                stopLocation >= startLocation &&
                stopLocation <
                    (isItemCollapsed || index == data.length - 1
                        ? endLocation
                        : endLocation - 250)
            if (isLocationInRange) {
                let nextIndex = index
                if (isItemCollapsed) {
                    nextIndex = collapsedState.findIndex(
                        (item, currentItemIndex) =>
                            currentItemIndex > index && !item,
                    )
                }
                setActiveIndex(nextIndex)
                console.log(nextIndex, 'nextIN')
                break
            } else {
                startLocation =
                    isItemCollapsed || index === data.length - 1
                        ? endLocation
                        : endLocation - 250
            }
        }
    }

    const allowFunctionCall = React.useRef(true)

    return (
        <Animated.ScrollView
            nestedScrollEnabled={true}
            ref={animatedRef}
            onMomentumScrollEnd={({ nativeEvent }) => {
                console.log(nativeEvent.contentOffset)
                if (allowFunctionCall.current && activeIndex != data.length) {
                    allowFunctionCall.current = false
                    runOnJS(deterMineCurrentActiveIndex)(nativeEvent)
                    setTimeout(() => {
                        allowFunctionCall.current = true
                    }, 1000)
                }
            }}
            scrollEnabled={step > 1}
        >
            {data
                .slice(0, step)
                .map(
                    (
                        {
                            primaryView,
                            secondaryView,
                            animationClosingHeight,
                            animationOpeningHeight,
                        },
                        index,
                    ) => {
                        return (
                            <HOCForWrappingComponentWithAnimation
                                key={index}
                                primaryView={primaryView({
                                    onNext: (props: any) => {
                                        // if (data.length - 1 === index) {
                                        //     onChangeState(0, true)
                                        //     return
                                        // }
                                        setStep((prev) => {
                                            if (step < index + 2)
                                                return index + 2
                                            return prev
                                        })
                                        callBack(props)
                                        // InteractionManager.runAfterInteractions(() => {
                                        onChangeState(index)
                                        // })
                                    },
                                    active: !collapsedState[index],
                                })}
                                secondaryView={secondaryView({
                                    onNext: (props: any) => {
                                        callBack(props)
                                        onChangeState(index)
                                    },
                                    active: !collapsedState[index],
                                })}
                                animationClosedHeight={animationClosingHeight}
                                animationOpenHeight={
                                    index === 0
                                        ? animationOpeningHeight
                                        : animationOpeningHeight -
                                          (data[index - 1]
                                              ?.animationClosingHeight || 0) /
                                              2
                                }
                                changeAnimationTrigger={collapsedState[index]}
                                callBackForOtherLogic={() => {
                                    callAnimated(
                                        index,
                                        !collapsedState[index],
                                        collapsedState.map((item, arrayIndx) =>
                                            arrayIndx === index ? !item : item,
                                        ),
                                    )
                                }}
                            />
                        )
                    },
                )}
        </Animated.ScrollView>
        // <View />
    )
    // return <View style={{ flex: 1, backgroundColor: 'green' }} />
}

export default HOCForAddingAnimationFunctionalityPage
