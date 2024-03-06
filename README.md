# react-native-collapsible-pages

Collapsible pages on the same screen with primary and secodary view

## Installation

```sh
npm install react-native-collapsible-pages
```

## Usage

```js
import { multiply } from 'react-native-collapsible-pages';

// ...

const result = await multiply(3, 7);
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

## IHOCForAddingAnimationFunctionalityPage Props

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
