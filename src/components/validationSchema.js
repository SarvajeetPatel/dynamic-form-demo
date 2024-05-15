import * as yup from 'yup'
import InputFields from './InputFields.json'

export const validationSchema = yup.object().shape({
    ...(() => {
        const testing = {}
        InputFields.map((tempField) => (
            Object.assign(testing, {
                [tempField.name]: (tempField.required) && ((tempField.type === 'checkbox') ? yup.array().of(
                    yup.string().required('At least One Option is Required!')
                ).min(1, 'Choose at least one Option!') :
                    yup.string().required(tempField.name + 'is Required'))
            })
        ))
        return testing
    })()
})