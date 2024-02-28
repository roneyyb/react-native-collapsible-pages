import React from 'react'
import {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'

interface useAnimatedShiftWrapperProps {
    animationOpenHeight: number
    animationClosedHeight: number
    changeAnimationTrigger: boolean
    callBackForOtherLogic: Function
}

const useAnimatedShiftWrappers = ({
    animationClosedHeight,
    animationOpenHeight,
    changeAnimationTrigger,
    callBackForOtherLogic,
}: useAnimatedShiftWrapperProps) => {
    const animatedHeight = useSharedValue(animationOpenHeight)

    const animatedViewHeightTo = React.useCallback(
        (value: number) => {
            animatedHeight.value = withTiming(value, { duration: 135 })
            if (callBackForOtherLogic) {
                callBackForOtherLogic()
            }
        },
        [animatedHeight, callBackForOtherLogic],
    )

    const firstTime = React.useRef(true)

    React.useEffect(() => {
        if (!firstTime.current) {
            if (!changeAnimationTrigger) {
                animatedViewHeightTo(animationOpenHeight)
            } else {
                animatedViewHeightTo(animationClosedHeight)
            }
        } else {
            firstTime.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        changeAnimationTrigger,
        // animationOpenHeight,
        // animationClosedHeight,
        // animatedViewHeightTo,
    ])

    const containerAnimatedStyle = useAnimatedStyle(
        () => ({
            flex: 1,
            height: animatedHeight.value,
        }),
        [],
    )

    const collapsedViewAnimatedStyle = useAnimatedStyle(
        () => ({
            opacity: interpolate(
                animatedHeight.value,
                [animationOpenHeight, animationClosedHeight],
                [0, 1],
            ),
            zIndex: interpolate(
                animatedHeight.value,
                [animationOpenHeight, animationClosedHeight],
                [0, 1],
            ),
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
        }),
        [],
    )

    const openViewStyle = useAnimatedStyle(
        () => ({
            opacity: interpolate(
                animatedHeight.value,
                [animationOpenHeight, animationClosedHeight],
                [1, 0],
            ),
            zIndex: interpolate(
                animatedHeight.value,
                [animationOpenHeight, animationClosedHeight],
                [1, 0],
            ),
            flex: 1,
        }),
        [],
    )

    return { collapsedViewAnimatedStyle, openViewStyle, containerAnimatedStyle }
}

export default useAnimatedShiftWrappers
