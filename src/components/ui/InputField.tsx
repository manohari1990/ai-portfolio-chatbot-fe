import { useState } from "react"

export default function InputField({
    label,
    name,
    id,
    value,
    type,
    className,
    validation,
    placeholder,
    handleInput
}: any){

    const [errorText, setErrorText] = useState('')
    const validateInput = (target:any) =>{
        let err = ''
        if(validation.required && !target.value){
            err += `${label.name} is a required field.\n`
        }
        if(target.value.length >= validation.maxLength){
            err += `Maximum length for ${label.name} is ${validation.maxLength}.\n`
        }
        if(!validation.allowSpace && /\s/.test(target.value)){
            err += `${label.name} should not have spaces.\n`
        }
        setErrorText((prev) => {
            return `${err}`
        })
        handleInput({target, err})
    }
    return(
        <>
            <label htmlFor={name} className={label.className}>{label.name}</label>
            <input id={id} name={name} value={value} type={type} className={className} placeholder={placeholder} onChange={(e)=>validateInput(e.target)} />
            {errorText ? <p className="text-red-500">{errorText}</p>:''}
        </>
    )
} 