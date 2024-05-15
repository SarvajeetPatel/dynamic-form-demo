import React from 'react'
import InputFields from '../components/InputFields.json'
import { useFormik } from 'formik'
import { validationSchema } from '../components/validationSchema'

const MainForm = () => {
    let initials = {}
    InputFields.map((tempField) => {
        if (tempField.type === 'checkbox') {
            initials[tempField.name] = []
        } else {
            initials[tempField.name] = ''
        }
        return true
    })

    const { values, handleChange, handleSubmit, errors, handleReset, touched } = useFormik({
        initialValues: initials,
        onSubmit: (values) => {
            if (Object.keys(errors).filter(err => errors[err]).length === 0) {
                handleReset()
            }
            console.log(values)
        },
        validationSchema: validationSchema
    })

    return (
        <>
            <form>
                {InputFields.map((ipField, fieldIndex) => (
                    (ipField.type === 'checkbox' || ipField.type === 'radio') ?
                        <div> {ipField.name} &nbsp;
                            {ipField?.list?.map((tempOptions, optionIndex) => (
                                <label key={optionIndex}>
                                    <input
                                        key={optionIndex}
                                        type={ipField.type}
                                        value={tempOptions}
                                        name={ipField.name}
                                        placeholder={ipField.placeholder}
                                        onChange={handleChange}
                                    />
                                    {tempOptions}
                                </label>
                            ))}
                            <div className='error-message'>
                                {(touched?.[ipField?.name] && errors?.[ipField?.name]) ? errors?.[ipField?.name] : null}
                            </div>
                        </div>
                        :
                        ((ipField.type === 'select') ?
                            <div> {ipField.name} &nbsp;
                                <select
                                    name={ipField.name}
                                    key={fieldIndex}
                                    onChange={handleChange}
                                    defaultValue=''
                                >

                                    <option value='' disabled={true}> Select Option </option>

                                    {ipField?.options?.map((tempOptions, optionIndex) => (
                                        <option key={optionIndex} value={tempOptions} selected={tempOptions === values[ipField.name]}> {tempOptions} </option>
                                    ))}

                                </select>
                                <div className='error-message'>
                                    {(touched?.[ipField?.name] && errors?.[ipField?.name]) ? errors?.[ipField?.name] : null}
                                </div>
                            </div>
                            :
                            <div>
                                <label> {ipField.name} &nbsp;
                                    <input
                                        type={ipField.type}
                                        name={ipField.name}
                                        onChange={handleChange}
                                        value={values[ipField.name]}
                                        placeholder={ipField.placeholder}
                                    />
                                </label>
                                <div className='error-message'>
                                    {(touched?.[ipField?.name] && errors?.[ipField?.name]) ? errors?.[ipField?.name] : null}
                                </div>
                            </div>
                        )

                ))}
                <button type='button' onClick={() => handleSubmit()}> SUBMIT </button>
            </form >
        </>
    )
}

export default MainForm