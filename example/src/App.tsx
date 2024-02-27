import * as React from 'react'

import { StyleSheet, View, Text } from 'react-native'
import { multiply } from 'react-native-collapsible-pages'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function App() {
    const [result, setResult] = React.useState<number | undefined>()

    React.useEffect(() => {
        multiply(3, 7).then(setResult)
    }, [])

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text>Result: {result}</Text>
            </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        width: 60,
        height: 60,
        marginVertical: 20,
    },
})
