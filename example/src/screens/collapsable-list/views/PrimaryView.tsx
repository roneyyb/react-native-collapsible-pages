import { View, Image } from 'react-native'
import React from 'react'
import TextNormal from '../../../component/text/TextNormal'
import ButtonPressableWithText from '../../../component/button/ButtonPressableWithText'
import type { IYogaData } from '../data'

interface PrimaryViewProps extends IYogaData {
    uri: string
    description: string
    onNext: Function
}

const PrimaryView = ({
    onNext,
    stepDetails: { by, title, step, image, duration, description },
}: PrimaryViewProps) => {
    return (
        <View style={{ flex: 1 }}>
            <Image
                source={{
                    uri: image,
                }}
                style={{ height: '50%', width: '100%' }}
                resizeMode="cover"
            />
            <View style={{ marginLeft: 20, marginTop: 10 }}>
                <TextNormal
                    text={`Step ${step}`}
                    textStyle={{
                        color: '#222222',
                        fontSize: 15,
                        fontWeight: '600',
                    }}
                />
                <View style={{}}>
                    <TextNormal
                        text={title}
                        textStyle={{
                            color: 'rgba(4,4,4,255)',
                            fontSize: 20,
                            fontWeight: '600',
                        }}
                    />
                    <TextNormal
                        text={`By ${by}`}
                        textStyle={{
                            color: 'rgba(30,40,49,255)',
                            fontSize: 10,
                            fontWeight: '600',
                        }}
                    />

                    <TextNormal
                        text={duration}
                        textStyle={{ color: '#80858d' }}
                    />
                </View>
                <TextNormal
                    text={description}
                    textStyle={{
                        color: '#0b0b0b',

                        marginTop: 10,
                        fontWeight: 400,
                    }}
                />
            </View>
            <View
                style={{
                    flex: 1,
                    marginHorizontal: 20,

                    // alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <ButtonPressableWithText
                    buttonStyle={{
                        height: 50,
                        width: '100%',
                        backgroundColor: '#5498c9',
                        elevation: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                    }}
                    text={'Next Step'}
                    textStyle={{
                        color: '#FFFFFF',
                        fontSize: 16,
                        fontWeight: 600,
                    }}
                    onPress={() => {
                        onNext()
                    }}
                />
            </View>
        </View>
    )
}

export default PrimaryView
