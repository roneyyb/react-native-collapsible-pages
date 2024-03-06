import React, { useState } from 'react'
import { BackHandler, Keyboard } from 'react-native'
import Animated, { runOnJS, useAnimatedRef } from 'react-native-reanimated'
import HOCForWrappingComponentWithAnimation from './hofc/HOFC_ForWrappingComponentWithAnimation'

export interface IItemsListAnimation {
    primaryView: (props: any) => React.ReactElement
    secondaryView: (props: any) => React.ReactElement

    secondaryViewHeight: number
    primaryViewHeight: number
}

type ZeroToOne = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1

interface IHOCForAddingAnimationFunctionalityPage {
    data: IItemsListAnimation[]
    callBack: (props: any, index: number) => void
    activeIndex: number
    setActiveIndex: Function
    initialCollapsedState?: boolean[]
    showAll?: boolean
    onPressHardwareBack?: Function
    secondaryViewSnapThresholdForNextView: ZeroToOne
    activeIndexThersholdDetection: ZeroToOne
}

const HOCForAddingAnimationFunctionalityPage = ({
    data,
    callBack,
    activeIndex,
    setActiveIndex,
    showAll,
    initialCollapsedState,
    onPressHardwareBack,
    secondaryViewSnapThresholdForNextView = 0.5,
    activeIndexThersholdDetection = 0.3,
}: IHOCForAddingAnimationFunctionalityPage) => {
    //console.log('data is here', callBack, activeIndex, setActiveIndex)

    const animatedRef = useAnimatedRef<Animated.ScrollView>()
    const [step, setStep] = useState(1)

    const [collapsedState, setCollapsed] = React.useState(
        initialCollapsedState || new Array(data.length).fill(false),
    )

    // Here collapsed is previous state and collapsedState is pervious collapsed State array
    const callAnimated = React.useCallback(
        (index: number, collapsed: boolean, collapsedState: boolean[]) => {
            console.log(index, collapsed, collapsedState, 'Collapsed State')
            let nextOpenIndex = collapsedState.findIndex(
                (item, currentItemIndex) => currentItemIndex > index && !item,
            )

            console.log(nextOpenIndex, 'nextOpenIndex')

            nextOpenIndex =
                nextOpenIndex === -1 ? data.length - 1 : nextOpenIndex
            if (!collapsed) setActiveIndex(nextOpenIndex)
            else {
                setActiveIndex(index)
            }

            const itemOpenGap = nextOpenIndex - index
            if (index === data.length - 1 && collapsed) {
                animatedRef.current?.scrollToEnd({ animated: true })
            } else if (index === 0 && collapsed) {
                animatedRef.current?.scrollTo({ animated: true, y: 0 })
            } else {
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
                                            ? cv.secondaryViewHeight
                                            : index1 === 0
                                              ? cv.primaryViewHeight
                                              : cv.primaryViewHeight -
                                                (data?.[index1 - 1]
                                                    ?.secondaryViewHeight ||
                                                    0) *
                                                    secondaryViewSnapThresholdForNextView),
                                    0,
                                ) +
                            (!collapsedState?.[index - 1]
                                ? index - 1 === 0
                                    ? (data[index - 1]?.primaryViewHeight ||
                                          0) -
                                      (data[index - 1]?.secondaryViewHeight ||
                                          0) *
                                          secondaryViewSnapThresholdForNextView
                                    : (data[index - 1]?.primaryViewHeight ||
                                          0) -
                                      ((data[index - 2]?.secondaryViewHeight ||
                                          0) *
                                          secondaryViewSnapThresholdForNextView +
                                          (data[index - 1]
                                              ?.secondaryViewHeight || 0) *
                                              secondaryViewSnapThresholdForNextView)
                                : (data[index - 1]?.secondaryViewHeight || 0) *
                                  (1 - secondaryViewSnapThresholdForNextView))

                        // nextY -= data[index - 1]?.secondaryViewHeight || 0
                    } else {
                        nextY =
                            index === 0 && itemOpenGap === 1
                                ? (data[0] || { secondaryViewHeight: 0 })
                                      .secondaryViewHeight *
                                  (1 - secondaryViewSnapThresholdForNextView)
                                : data
                                      .slice(0, nextOpenIndex - 1)
                                      .reduce(
                                          (pv, cv, index1) =>
                                              pv +
                                              (collapsedState[index1]
                                                  ? cv.secondaryViewHeight
                                                  : index1 === 0
                                                    ? cv.primaryViewHeight
                                                    : cv.primaryViewHeight -
                                                      (data?.[index1 - 1]
                                                          ?.secondaryViewHeight ||
                                                          0) *
                                                          secondaryViewSnapThresholdForNextView),
                                          0,
                                      ) +
                                  ((
                                      data[nextOpenIndex - 1] || {
                                          secondaryViewHeight: 0,
                                      }
                                  ).secondaryViewHeight || 0) *
                                      (1 -
                                          secondaryViewSnapThresholdForNextView)
                    }

                    console.log(nextY, 'nextY', collapsed, collapsedState, data)

                    animatedRef.current?.scrollTo({
                        y: nextY,
                        animated: true,
                    })
                }
            }
        },
        [
            data,
            animatedRef,
            setActiveIndex,
            secondaryViewSnapThresholdForNextView,
        ],
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

        if (!collapsedState[index] && nextOpenIndex === -1) {
            setCollapsed(() => {
                return [...data.map(() => true)]
            })
        } else {
            setCollapsed((collapsedState) => {
                collapsedState[index] = !collapsedState[index]
                return [...collapsedState]
            })
        }
    }

    const backAction = React.useCallback(() => {
        if (onPressHardwareBack) {
            onPressHardwareBack()
            return true
        } else {
            if (activeIndex === 0) {
                return false
            } else {
                if (
                    activeIndex === data.length - 1 &&
                    collapsedState[activeIndex]
                ) {
                    setCollapsed((collapsedState) => {
                        collapsedState[activeIndex] =
                            !collapsedState[activeIndex]
                        return [...collapsedState]
                    })
                } else if (collapsedState[activeIndex - 1]) {
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
                            arrayIndx === activeIndex - 1 ? !item : item,
                        ),
                    )
                }

                return true
            }
        }
    }, [
        activeIndex,
        callAnimated,
        collapsedState,
        data.length,
        onPressHardwareBack,
    ])

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
                    ? item?.secondaryViewHeight || 0
                    : item?.primaryViewHeight || 0)

            let nextEndLocation =
                isItemCollapsed || index === data.length - 1
                    ? endLocation
                    : endLocation -
                      (endLocation - startLocation) *
                          activeIndexThersholdDetection
            const isLocationInRange =
                stopLocation >= startLocation && stopLocation < nextEndLocation
            if (isLocationInRange) {
                let nextIndex = index
                if (isItemCollapsed) {
                    nextIndex = collapsedState.findIndex(
                        (item, currentItemIndex) =>
                            currentItemIndex > index && !item,
                    )
                }
                nextIndex = nextIndex === -1 ? data.length - 1 : nextIndex
                setActiveIndex(nextIndex)

                break
            } else {
                startLocation = nextEndLocation
            }
        }
    }

    const allowFunctionCall = React.useRef(true)

    console.log(collapsedState)
    return (
        <Animated.ScrollView
            nestedScrollEnabled={true}
            ref={animatedRef}
            //contentContainerStyle={{ flex: 1 }}
            onMomentumScrollEnd={({ nativeEvent }) => {
                // allowFunctionCall logic is written as onMomentumEnd is called thrice
                // after every momentum end
                if (allowFunctionCall.current) {
                    allowFunctionCall.current = false
                    runOnJS(deterMineCurrentActiveIndex)(nativeEvent)
                    setTimeout(() => {
                        allowFunctionCall.current = true
                    }, 1000)
                }
            }}
            scrollEnabled={step > 1}
        >
            {(showAll ? data : data.slice(0, step)).map(
                (
                    {
                        primaryView,
                        secondaryView,
                        secondaryViewHeight,
                        primaryViewHeight,
                    },
                    index,
                ) => {
                    return (
                        <HOCForWrappingComponentWithAnimation
                            key={index}
                            primaryView={primaryView({
                                onNext: (props: any) => {
                                    setStep((prev) => {
                                        if (step < index + 2) return index + 2
                                        return prev
                                    })
                                    callBack(props, index)
                                    onChangeState(index)
                                },
                                active: !collapsedState[index],
                            })}
                            secondaryView={secondaryView({
                                onNext: (props: any) => {
                                    callBack(props, index)
                                    onChangeState(index)
                                },
                                active: !collapsedState[index],
                            })}
                            animationClosedHeight={secondaryViewHeight}
                            animationOpenHeight={
                                index === 0
                                    ? primaryViewHeight
                                    : primaryViewHeight -
                                      (data[index - 1]?.secondaryViewHeight ||
                                          0) *
                                          secondaryViewSnapThresholdForNextView
                            }
                            changeAnimationTrigger={collapsedState[index]}
                            callBackForOtherLogic={() => {
                                callAnimated(
                                    index,
                                    !collapsedState[index],
                                    collapsedState.map((item, arrayIndx) =>
                                        arrayIndx === index &&
                                        !collapsedState[index]
                                            ? !item
                                            : item,
                                    ),
                                )
                            }}
                        />
                    )
                },
            )}
        </Animated.ScrollView>
    )
}

export default HOCForAddingAnimationFunctionalityPage
