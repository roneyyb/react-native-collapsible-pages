import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { Image, Pressable, View, type ViewStyle } from 'react-native'
import TextNormal from '../../../component/text/TextNormal'
import type { IYogaData } from '../data'

interface SecondaryViewProps extends IYogaData {
    uri: string
    containerStyle: ViewStyle
    onNext: Function
}

const SecondaryView = ({
    containerStyle,
    onNext,
    stepDetails: { by, title, step, image, duration },
}: SecondaryViewProps) => {
    return (
        <Pressable
            onPress={() => {
                onNext()
            }}
            style={[
                containerStyle,
                {
                    margin: 10,
                    padding: 10,
                    // borderRadius: 10,
                    backgroundColor: '#FFFFFF',
                    elevation: 10,
                    flexDirection: 'row',
                    borderRadius: 10,
                    alignSelf: 'center',
                },
            ]}
        >
            <Image
                source={{
                    uri: image,
                }}
                style={{ height: '100%', aspectRatio: 1, borderRadius: 10 }}
            />

            <View
                style={{
                    flex: 1,
                    marginLeft: 10,
                }}
            >
                <TextNormal
                    text={`Step ${step}`}
                    textStyle={{
                        color: '#222222',
                        fontSize: 20,
                        fontWeight: '600',
                    }}
                />
                <View style={{ marginTop: 10 }}>
                    <TextNormal
                        text={by}
                        textStyle={{
                            color: 'rgba(30,40,49,255)',
                            fontSize: 10,
                            fontWeight: '600',
                        }}
                    />
                    <TextNormal
                        text={title}
                        textStyle={{
                            color: 'rgba(4,4,4,255)',
                            fontSize: 16,
                            fontWeight: '600',
                        }}
                    />
                    <TextNormal
                        text={duration}
                        textStyle={{ color: '#80858d' }}
                    />
                </View>
            </View>
            <View
                style={{
                    padding: 10,
                    backgroundColor: '#eaf6ff',
                    justifyContent: 'center',
                }}
            >
                <AntDesign name="caretright" size={24} color="#5498c9" />
            </View>
        </Pressable>
    )
}

export default SecondaryView
