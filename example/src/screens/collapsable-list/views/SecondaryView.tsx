import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import {
    Image,
    Pressable,
    StyleSheet,
    View,
    type ViewStyle,
} from 'react-native'
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
            style={[styles.container, containerStyle]}
        >
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.contentContainer}>
                <TextNormal text={`Step ${step}`} textStyle={styles.stepText} />
                <View style={{ marginTop: 10 }}>
                    <TextNormal text={by} textStyle={styles.byText} />
                    <TextNormal text={title} textStyle={styles.titleText} />
                    <TextNormal
                        text={duration}
                        textStyle={styles.durationText}
                    />
                </View>
            </View>
            <View style={styles.arrowContainer}>
                <AntDesign name="caretright" size={24} color="#5498c9" />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        elevation: 10,
        flexDirection: 'row',
        borderRadius: 10,
        alignSelf: 'center',
    },
    image: {
        height: '100%',
        aspectRatio: 1,
        borderRadius: 10,
    },
    contentContainer: {
        flex: 1,
        marginLeft: 10,
    },
    stepText: {
        color: '#222222',
        fontSize: 20,
        fontWeight: '600',
    },
    byText: {
        color: 'rgba(30,40,49,255)',
        fontSize: 10,
        fontWeight: '600',
    },
    titleText: {
        color: 'rgba(4,4,4,255)',
        fontSize: 16,
        fontWeight: '600',
    },
    durationText: {
        color: '#80858d',
    },
    arrowContainer: {
        padding: 10,
        backgroundColor: '#eaf6ff',
        justifyContent: 'center',
    },
})

export default SecondaryView
