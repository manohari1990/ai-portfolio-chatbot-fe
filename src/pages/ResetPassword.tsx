import { useState } from "react";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "../components/ui/InputField";
import { resetPassword } from "../services/authService";

export default function ResetPassword(){
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const { token } = useParams();

    const comparePassword = (target)=>{
        setConfirmPassword(target.value)
        if(target.value !== password)
            setMessage('Password is not matched!')
        else
            setMessage('')
    }
    const submitRequest = async() =>{
        try{
            setIsLoading(true)
            const response = await resetPassword({token: token, password: password})
            if(!response.success)
                setMessage(response.message)
            else{
                navigate('/todos')
            }
        }catch(err){
            throw err
        }finally{
            setIsLoading(false)
        }
    }
    return (
        
        <main
            className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 dark:from-neutral-900 dark:via-neutral-700 dark:to-neutral-600">
            {isLoading && 
                <Spinner />
            }
            <div className="min-h-screen flex fle-col items-center justify-center px-4 py-8 md:p-8">
                <div className="grid items-center gapx-x-10 gap-y-16 max-w-6xl w-full lg:grid-cols-2">
                    <div className="max-w-lg max-lg:mx-auto">
                    
                        <h2 className="text-4xl font-semibold !leading-tight text-slate-50">
                            Seamless Login for Exclusive Access
                        </h2>
                        <p className="text-base mt-6 text-slate-100 leading-relaxed">Immerse yourself in a hassle-free login journey with
                            our intuitively designed login form. Effortlessly access your account.</p>
                    </div>

                    <div
                        className="bg-white border border-slate-200 rounded-lg px-6 py-8 max-w-lg mx-auto w-full md:px-8 lg:max-w-md dark:bg-neutral-800 dark:border-neutral-600">
                        <h1 className="text-3xl mb-10 font-semibold text-slate-900 dark:text-slate-50">Reset Password</h1>
                        <p>{message ? message : ''}</p>
                        <div className="relative">
                            <InputField
                                label={{
                                    name: "Password",
                                    className: "mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50",
                                }}
                                type="password" 
                                id="password" 
                                name="password" 
                                className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600"
                                value={password}
                                placeholder="••••••••"
                                validation={{
                                    required: true,
                                    allowSpace: false
                                }}
                                handleInput={(target)=>setPassword(target.value)}
                            />
                            <button type="button" id="togglePassword" aria-label="Show password" aria-pressed="false"
                                className="absolute top-1 right-2 p-0.5 flex cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-[18px] fill-slate-400 text-slate-400 overflow-visible"
                                    viewBox="0 0 128 128">
                                    <path
                                        d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z">
                                    </path>
                                    <path id="eyeStrike" className="block" d="M10.586 10.586l106.828 106.828" stroke="currentColor"
                                        strokeWidth="10" strokeLinecap="round"></path>
                                </svg>
                            </button>
                        </div>

                        <div className="relative">
                            <InputField
                                label={{
                                    name: "Confirm Password",
                                    className: "mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50",
                                }}
                                type="password" 
                                id="confirmPassword" 
                                name="confirmPassword"
                                className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600"
                                value={confirmPassword}
                                placeholder="••••••••"
                                validation={{
                                    required: true,
                                    allowSpace: false
                                }}
                                handleInput={comparePassword}
                            />
                        </div>

                        <button type="button" onClick={submitRequest}
                            className="w-full my-4 py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Change Password</button>
                    </div>
                </div>
            </div>
        </main>
    )
}