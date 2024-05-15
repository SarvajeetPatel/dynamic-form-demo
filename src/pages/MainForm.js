import React from 'react'
import InputFields from '../components/InputFields.json'
import { useFormik } from 'formik'
import { validationSchema } from '../components/validationSchema'

const MainForm = () => {
    let initials = {}
    InputFields.map((tempField) =>
        initials[tempField.name] = (tempField.type === 'checkbox') ? [] : ''
    )

    const { values, handleChange, handleSubmit, errors, handleReset, touched } = useFormik({
        initialValues: initials,
        onSubmit: (values) => {
            if (Object.keys(errors).filter(err => errors[err]).length === 0) {
                let existingData = JSON.parse(localStorage.getItem('dummy details')) || []
                existingData.push(values)
                localStorage.setItem('dummy details', JSON.stringify(existingData))
                handleReset()
            }
            console.log(values)
        },
        validationSchema: validationSchema
    })
    
    return (
        <>
            <form onSubmit={handleSubmit}>
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
                                        checked={values?.[ipField.name].includes(tempOptions)}
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
                                    <option value='' selected={values[ipField?.name] === ''} disabled={true}> Select Option </option>

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
                <button type='submit'> SUBMIT </button>
            </form >
        </>
    )
}

export default MainForm