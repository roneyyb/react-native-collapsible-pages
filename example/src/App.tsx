import * as React from 'react'

import HOC from 'react-native-collapsible-pages'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import data, { type IYogaData } from './screens/collapsable-list/data'
import PrimaryViewN from './screens/collapsable-list/views/PrimaryView'
import SecondaryViewN from './screens/collapsable-list/views/SecondaryView'

export default function App() {
    const views = data.map((item: IYogaData) => ({
        primaryView: (props: any) => (
            <PrimaryViewN {...props} stepDetails={item.stepDetails} />
        ),
        secondaryView: (props: any) => (
            <SecondaryViewN {...props} stepDetails={item.stepDetails} />
        ),
        ...item.viewDetails,
    }))

    const [activeIndex, setActiveIndex] = React.useState(0)

    return (
        <GestureHandlerRootView
            style={{ flex: 1, marginTop: 40, backgroundColor: '#ffffff33' }}
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
