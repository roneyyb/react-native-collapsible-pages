import React from 'react'
import useAnimatedShiftWrappers from '../hooks/useAnimatedShiftWrapperStyle'
import Animated from 'react-native-reanimated'

interface IHOCForWrappingComponentWithAnimation {
    primaryView: React.ReactElement
    secondaryView: React.ReactElement
    animationClosedHeight: number
    animationOpenHeight: number
    changeAnimationTrigger: boolean
    callBackForOtherLogic: Function
}

const HOCForWrappingComponentWithAnimation = ({
    primaryView,
    secondaryView,
    animationClosedHeight,
    animationOpenHeight,
    changeAnimationTrigger,
    callBackForOtherLogic,
}: IHOCForWrappingComponentWithAnimation) => {
    const {
        containerAnimatedStyle,
        collapsedViewAnimatedStyle,
        openViewStyle,
    } = useAnimatedShiftWrappers({
        animationClosedHeight: animationClosedHeight,
        animationOpenHeight: animationOpenHeight,
        changeAnimationTrigger: changeAnimationTrigger,
        callBackForOtherLogic: callBackForOtherLogic,
    })

    return (
        <Animated.View style={[containerAnimatedStyle]}>
            <Animated.View style={[openViewStyle]}>{primaryView}</Animated.View>
            <Animated.View style={[collapsedViewAnimatedStyle]}>
                {secondaryView}
            </Animated.View>
        </Animated.View>
    )
}

export default HOCForWrappingComponentWithAnimation
