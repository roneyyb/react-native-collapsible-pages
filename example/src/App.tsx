import * as React from 'react'

import CollapsiblePages, {
    type IItemsListAnimation,
    type IViewProps,
} from 'react-native-collapsible-pages'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import data, {
    type IStepDetails,
    type IYogaData,
} from './screens/collapsable-list/data'
import PrimaryViewN from './screens/collapsable-list/views/PrimaryView'
import SecondaryViewN from './screens/collapsable-list/views/SecondaryView'
import { StatusBar, StyleSheet } from 'react-native'

// Define the component outside of the parent component
const PrimaryViewWrapper =
    (rest: { activeIndex: number; stepDetails: IStepDetails }) =>
    (props: IViewProps) => {
        const { stepDetails } = rest
        return <PrimaryViewN {...props} stepDetails={stepDetails} />
    }

const SecondaryViewWrapper =
    (rest: { stepDetails: IStepDetails }) => (props: IViewProps) => {
        const { stepDetails } = rest
        return <SecondaryViewN {...props} stepDetails={stepDetails} />
    }

export default function App() {
    const [activeIndex, setActiveIndex] = React.useState(0)

    // Inside the parent component
    const views: IItemsListAnimation[] = React.useMemo(
        () =>
            data.map((item: IYogaData) => ({
                primaryView: PrimaryViewWrapper({
                    activeIndex: activeIndex,
                    stepDetails: item.stepDetails,
                }),

                secondaryView: SecondaryViewWrapper({
                    stepDetails: item.stepDetails,
                }),
                ...item.viewDetails,
            })),
        [activeIndex],
    )

    console.log('active index', activeIndex)
    return (
        <GestureHandlerRootView style={styles.container}>
            <CollapsiblePages
                data={views}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                callBack={(props: any, index: number) => {
                    // Callback when onNext function is triggered from primary or secondary view
                    // to set any outside props that are shared among different component
                    console.log(props, index)
                }}
                showPreviousSecodaryViewThreshold={0.6}
            />
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        backgroundColor: '#ffffff33',
    },
})
