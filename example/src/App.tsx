import * as React from 'react'

import { View, Button } from 'react-native'
import HOC from 'react-native-collapsible-pages'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const PrimaryView = ({
    onNext,
    backgroundColor,
}: {
    onNext: Function
    backgroundColor: string
}) => {
    return (
        <View
            style={{
                height: 600,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: backgroundColor,
            }}
        >
            <Button
                title="Press Me Primary"
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
}: {
    onNext: Function
    backgroundColor: string
}) => {
    return (
        <View
            style={{
                height: 200,
                backgroundColor: backgroundColor,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Button
                title="Press Me Secondary"
                onPress={() => {
                    onNext()
                }}
            />
        </View>
    )
}

export default function App() {
    const views = [
        {
            primaryView: (props: any) => (
                <PrimaryView {...props} backgroundColor="green" />
            ),
            secondaryView: (props: any) => (
                <SecondaryView {...props} backgroundColor="red" />
            ),
            animationOpeningHeight: 600,
            animationClosingHeight: 200,
        },
        {
            primaryView: (props: any) => (
                <PrimaryView {...props} backgroundColor="blue" />
            ),
            secondaryView: (props: any) => (
                <SecondaryView {...props} backgroundColor="yellow" />
            ),
            animationOpeningHeight: 600,
            animationClosingHeight: 200,
        },
        {
            primaryView: (props: any) => (
                <PrimaryView {...props} backgroundColor="black" />
            ),
            secondaryView: (props: any) => (
                <SecondaryView {...props} backgroundColor="red" />
            ),
            animationOpeningHeight: 600,
            animationClosingHeight: 200,
        },
    ]

    const [activeIndex, setActiveIndex] = React.useState(0)

    return (
        <GestureHandlerRootView style={{ flex: 1, marginTop: 40 }}>
            <HOC
                data={views}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                callBack={() => {}}
            />
        </GestureHandlerRootView>
    )
}
