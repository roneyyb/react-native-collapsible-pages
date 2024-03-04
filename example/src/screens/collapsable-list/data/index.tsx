import { Dimensions } from 'react-native'

const WINDOW_HEIGHT = Dimensions.get('window').height

export interface IStepDetails {
    step: number
    title: string
    by: string
    duration: string
    description: string
    image: string
}
export interface IYogaData {
    stepDetails: IStepDetails
    viewDetails: {
        animationOpeningHeight: number
        animationClosingHeight: number
    }
}
const data: IYogaData[] = [
    {
        stepDetails: {
            step: 1,
            title: 'How to be mindful',
            by: 'Apple Mehmud',
            duration: '8-10 min',
            description:
                'Him boisterous invitation dispatched had connection inhabiting projection. By mutual an mr danger garret edward an. Diverted as strictly exertion addition no disposal by stanhill. This call wife do so sigh no gate felt. You and abode spite order get. Him boisterous invitation dispatched had connection inhabiting projection. Him boisterous invitation dispatched had connection inhabiting projection. Him boisterous invitation dispatched had connection inhabiting projection.',
            image: 'https://source.unsplash.com/800x600/?landscape',
        },
        viewDetails: {
            animationOpeningHeight: WINDOW_HEIGHT,
            animationClosingHeight: 150,
        },
    },
    {
        stepDetails: {
            step: 2,
            title: 'Emotional Support',
            by: 'Apple Mehmud',
            duration: '8-10 min',
            description:
                'Him boisterous invitation dispatched had connection inhabiting projection. By mutual an mr danger garret edward an. Diverted as strictly exertion addition no disposal by stanhill. This call wife do so sigh no gate felt. You and abode spite order get. Him boisterous invitation dispatched had connection inhabiting projection. Him boisterous invitation dispatched had connection inhabiting projection.',
            image: 'https://source.unsplash.com/800x600/?nature',
        },
        viewDetails: {
            animationOpeningHeight: WINDOW_HEIGHT,
            animationClosingHeight: 150,
        },
    },
    {
        stepDetails: {
            step: 3,
            title: 'Sleep like a baby',
            by: 'Apple Mehmud',
            duration: '8-10 min',
            description:
                'Him boisterous invitation dispatched had connection inhabiting projection. By mutual an mr danger garret edward an. Diverted as strictly exertion addition no disposal by stanhill. This call wife do so sigh no gate felt. You and abode spite order get. Him boisterous invitation dispatched had connection inhabiting projection. Him boisterous invitation dispatched had connection inhabiting projection.',
            image: 'https://source.unsplash.com/800x600/?abstract',
        },
        viewDetails: {
            animationOpeningHeight: WINDOW_HEIGHT,
            animationClosingHeight: 150,
        },
    },

    {
        stepDetails: {
            step: 4,
            title: 'Yeah you are done',
            by: 'Apple Mehmud',
            duration: '8-10 min',
            description:
                'Him boisterous invitation dispatched had connection inhabiting projection. By mutual an mr danger garret edward an. Diverted as strictly exertion addition no disposal by stanhill. This call wife do so sigh no gate felt. You and abode spite order get. Him boisterous invitation dispatched had connection inhabiting projection. Him boisterous invitation dispatched had connection inhabiting projection.',
            image: 'https://source.unsplash.com/800x600/?pattern',
        },
        viewDetails: {
            animationOpeningHeight: WINDOW_HEIGHT,
            animationClosingHeight: 150,
        },
    },
    {
        stepDetails: {
            step: 5,
            title: 'Yeah you are done',
            by: 'Apple Mehmud',
            duration: '8-10 min',
            description:
                'Him boisterous invitation dispatched had connection inhabiting projection. By mutual an mr danger garret edward an. Diverted as strictly exertion addition no disposal by stanhill. This call wife do so sigh no gate felt. You and abode spite order get. Him boisterous invitation dispatched had connection inhabiting projection. Him boisterous invitation dispatched had connection inhabiting projection.',
            image: 'https://source.unsplash.com/800x600/?cityscape',
        },
        viewDetails: {
            animationOpeningHeight: WINDOW_HEIGHT,
            animationClosingHeight: 150,
        },
    },
    {
        stepDetails: {
            step: 6,
            title: 'Yeah you are done',
            by: 'Apple Mehmud',
            duration: '8-10 min',
            description:
                'Him boisterous invitation dispatched had connection inhabiting projection. By mutual an mr danger garret edward an. Diverted as strictly exertion addition no disposal by stanhill. This call wife do so sigh no gate felt. You and abode spite order get. Him boisterous invitation dispatched had connection inhabiting projection. Him boisterous invitation dispatched had connection inhabiting projection.',
            image: 'https://source.unsplash.com/800x600/?animal',
        },
        viewDetails: {
            animationOpeningHeight: WINDOW_HEIGHT,
            animationClosingHeight: 150,
        },
    },
]

export default data

// Beautiful landscapes:

// https://source.unsplash.com/800x600/?landscape
// https://source.unsplash.com/800x600/?nature
// Abstract art:

// https://source.unsplash.com/800x600/?abstract
// Colorful patterns:

// https://source.unsplash.com/800x600/?pattern
// Cityscapes:

// https://source.unsplash.com/800x600/?cityscape
// Animals:

// https://source.unsplash.com/800x600/?animal
