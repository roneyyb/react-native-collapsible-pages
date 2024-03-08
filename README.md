# react-native-collapsible-pages

The Collapsible Pages component is a complex UI component designed to display primary and secondary views on the same screen, allowing seamless transition between the two views. It provides a user-friendly interface for handling hardware back actions and detecting the active index on scrolling.

Key Features:

- Display primary and secondary views with smooth transitions.
- Automatic handling of hardware back actions and active index detection on scrolling.
- Automatic detection of next open view and scrolling there on call of onNext function from any position.
- Support for specifying different heights for each data item, with internal handling for smooth transitions.

## Installation

```sh
yarn add react-native-collapsible-pages react-native-reanimated react-native-gesture-handler
```
## Demo

![Animation](https://github.com/roneyyb/react-native-collapsible-pages/blob/main/screen-20240307-1251302_resized-ezgif.com-video-to-gif-converter.gif)


## Usage

```js
import CollapsiblePages from 'react-native-collapsible-pages';

// Check example directory in github repo.

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

```

## Props and Types

## ZeroToOne Type

| Property | Type  | Description                              |
|----------|-------|------------------------------------------|
| ZeroToOne| `0 \| 0.1 \| 0.2 \| 0.3 \| 0.4 \| 0.5 \| 0.6 \| 0.7 \| 0.8 \| 0.9 \| 1` | A type representing a value between 0 and 1. |

## IViewProps Interface

| Property | Type       | Description                                                        | Required | Default |
|----------|------------|--------------------------------------------------------------------|----------|---------|
| `onNext` | `Function` | A function to handle the next action. You can call this on any button action inside primary or secondary view.                               | Yes      | -       |
| `active` | `boolean`  | A boolean indicating whether the view is active (if primary view is opened) or not.             | Yes      | -       |



## IItemsListAnimation Props

| Property              | Type                                 | Description                                                                                                       | Required | Default |
|-----------------------|--------------------------------------|-------------------------------------------------------------------------------------------------------------------|----------|---------|
| `primaryView`         | `(props: IViewProps) => React.ReactElement` | A function that takes props and returns a React element representing the primary view of the animation.          | Yes      | -       |
| `secondaryView`       | `(props: IViewProps) => React.ReactElement` | A function that takes props and returns a React element representing the secondary view of the animation.        | Yes      | -       |
| `secondaryViewHeight` | `number`                             | The height of the secondary view.                                                                                | Yes      | -       |
| `primaryViewHeight`   | `number`                             | The height of the primary view.                                                                                  | Yes      | -       |

## For Component Props

| Property                          | Type                                      | Description                                                                                                     | Required | Default |
|-----------------------------------|-------------------------------------------|-----------------------------------------------------------------------------------------------------------------|----------|---------|
| `data`                            | `IItemsListAnimation[]`                   | An array of `IItemsListAnimation` objects representing the animations to be displayed.                         | Yes      | -       |
| `callBack`                        | `(props: any, index: number) => void`     | A function that takes props and an index, and you can add any side effect here when a onNext is triggered and transition happens.| Yes      | -       |
| `activeIndex`                     | `number`                                  | The index of the active animation.                                                                              | Yes      | -       |
| `setActiveIndex`                  | `Function`                                | A function that sets the active index of the animation.                                                          | Yes      | -       |
| `initialCollapsedState`           | `boolean[]`                               | An optional array of booleans representing the initial collapsed state of each animation.                       | No       | all false according to length of data  |
| `showAll`                         | `boolean`                                 | An optional boolean indicating whether to show all view at once.                                                  | No       | false   |
| `onPressHardwareBack`             | `Function`                                | An optional function to be called when the hardware back button is pressed. This will overide default behaviour                                     | No       | -       |
| `showPreviousSecodaryViewThreshold`| `ZeroToOne`                               | A value indicating the threshold for showing the previous secondary view.                                       | Yes      | 0.5     |
| `activeViewDetectionBottomThreshold`| `ZeroToOne`                              | An optional value indicating the threshold for detecting the bottom of the active view.                         | No       | 0.3     |



## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
