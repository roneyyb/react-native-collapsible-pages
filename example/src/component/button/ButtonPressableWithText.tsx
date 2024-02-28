import { Pressable, type ViewStyle } from 'react-native'
import React from 'react'
import type { TextNormalProps } from '../text/TextNormal'
import TextNormal from '../text/TextNormal'

interface ButtonPressableWithTextProps extends TextNormalProps {
    onPress: Function
    buttonStyle: ViewStyle
}

const ButtonPressableWithText = ({
    onPress,
    buttonStyle,
    ...rest
}: ButtonPressableWithTextProps) => {
    return (
        <Pressable
            onPress={() => {
                onPress()
            }}
            style={buttonStyle}
        >
            <TextNormal {...rest} />
        </Pressable>
    )
}

export default ButtonPressableWithText
