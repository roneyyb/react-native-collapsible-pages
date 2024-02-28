import React from 'react'
import { Text, type TextStyle } from 'react-native'

export interface TextNormalProps {
    text: string
    textStyle: TextStyle
}

const TextNormal = ({ text, textStyle }: TextNormalProps) => {
    return <Text style={textStyle}>{text}</Text>
}

export default TextNormal
