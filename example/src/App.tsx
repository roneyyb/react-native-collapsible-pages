import * as React from 'react'

import { View, Pressable, Text } from 'react-native'
import HOC from 'react-native-collapsible-pages'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import ButtonPressableWithText from './component/button/ButtonPressableWithText'

interface Props {
    onNext: Function
    backgroundColor: string
    buttonColor: string
    buttonTextColor: string
    buttonText: string
}

const PrimaryView = ({
    onNext,
    backgroundColor,
    buttonColor,
    buttonTextColor,
    buttonText,
}: Props) => {
    return (
        <View
            style={{
                height: 600,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: backgroundColor,
            }}
        >
            <ButtonPressableWithText
                buttonStyle={{
                    height: '10%',
                    width: '50%',
                    backgroundColor: buttonColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                }}
                text={buttonText}
                textStyle={{ color: buttonTextColor, fontSize: 16 }}
                onPress={() => {
                    onNext()
                }}
            />
        </View>
    )
}

const SecondaryView = ({
    onNext,
    backgroundColor,
    buttonColor,
    buttonTextColor,
    buttonText,
}: Props) => {
    return (
        <View
            style={{
                height: 200,
                backgroundColor: backgroundColor,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Pressable
                onPress={() => {
                    onNext()
                }}
                style={{
                    height: '30%',
                    width: '50%',
                    backgroundColor: buttonColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                }}
            >
                <Text style={{ color: buttonTextColor, fontSize: 16 }}>
                    {buttonText}
                </Text>
            </Pressable>
        </View>
    )
}

export default function App() {
    const views = [
        {
            primaryView: (props: any) => (
                <PrimaryView
                    {...props}
                    backgroundColor="#5F4B8BFF"
                    buttonColor="#E69A8DFF"
                    buttonText="First Primary View"
                    buttonTextColor="#5F4B8BFF"
                />
            ),
            secondaryView: (props: any) => (
                <SecondaryView
                    {...props}
                    backgroundColor="#E69A8DFF"
                    buttonColor="#5F4B8BFF"
                    buttonText="First Primary View"
                    buttonTextColor="#FFFFFF"
                />
            ),
            animationOpeningHeight: 600,
            animationClosingHeight: 200,
        },
        {
            primaryView: (props: any) => (
                <PrimaryView
                    {...props}
                    backgroundColor="blue"
                    buttonColor="red"
                    buttonText="First Primary View"
                    buttonTextColor="#000000"
                />
            ),
            secondaryView: (props: any) => (
                <SecondaryView
                    {...props}
                    backgroundColor="yellow"
                    buttonColor="red"
                    buttonText="First Primary View"
                    buttonTextColor="#000000"
                />
            ),
            animationOpeningHeight: 600,
            animationClosingHeight: 200,
        },
        {
            primaryView: (props: any) => (
                <PrimaryView
                    {...props}
                    backgroundColor="black"
                    buttonColor="red"
                    buttonText="First Primary View"
                    buttonTextColor="#000000"
                />
            ),
            secondaryView: (props: any) => (
                <SecondaryView
                    {...props}
                    backgroundColor="red"
                    buttonColor="red"
                    buttonText="First Primary View"
                    buttonTextColor="#000000"
                />
            ),
            animationOpeningHeight: 600,
            animationClosingHeight: 200,
        },
    ]

    const [activeIndex, setActiveIndex] = React.useState(0)

    return (
        <GestureHandlerRootView
            style={{ flex: 1, marginTop: 40, backgroundColor: '#000' }}
        >
            <HOC
                data={views}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                callBack={() => {}}
            />
        </GestureHandlerRootView>
    )
}
