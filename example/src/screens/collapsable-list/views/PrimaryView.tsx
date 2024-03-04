import { View, Image, StyleSheet } from 'react-native'
import React from 'react'
import TextNormal from '../../../component/text/TextNormal'
import ButtonPressableWithText from '../../../component/button/ButtonPressableWithText'
import type { IStepDetails } from '../data'

interface PrimaryViewProps {
    stepDetails: IStepDetails
    onNext: Function
}

const PrimaryView = ({
    onNext,
    stepDetails: { by, title, step, image, duration, description },
}: PrimaryViewProps) => {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: image }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.contentContainer}>
                <TextNormal text={`Step ${step}`} textStyle={styles.stepText} />
                <View>
                    <TextNormal text={title} textStyle={styles.titleText} />
                    <TextNormal text={`By ${by}`} textStyle={styles.byText} />
                    <TextNormal
                        text={duration}
                        textStyle={styles.durationText}
                    />
                </View>
                <TextNormal
                    text={description}
                    textStyle={styles.descriptionText}
                />
            </View>
            <View style={styles.buttonContainer}>
                <ButtonPressableWithText
                    buttonStyle={styles.buttonStyle}
                    text="Next Step"
                    textStyle={styles.buttonText}
                    onPress={onNext}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: '50%',
        width: '100%',
    },
    contentContainer: {
        marginLeft: 20,
        marginTop: 10,
    },
    stepText: {
        color: '#222222',
        fontSize: 15,
        fontWeight: '600',
    },
    titleText: {
        color: 'rgba(4,4,4,255)',
        fontSize: 20,
        fontWeight: '600',
    },
    byText: {
        color: 'rgba(30,40,49,255)',
        fontSize: 10,
        fontWeight: '600',
    },
    durationText: {
        color: '#80858d',
    },
    descriptionText: {
        color: '#0b0b0b',
        marginTop: 10,
        fontWeight: '400',
    },
    buttonContainer: {
        flex: 1,
        marginHorizontal: 20,
        justifyContent: 'center',
    },
    buttonStyle: {
        height: 50,
        width: '100%',
        backgroundColor: '#5498c9',
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
})

export default PrimaryView
