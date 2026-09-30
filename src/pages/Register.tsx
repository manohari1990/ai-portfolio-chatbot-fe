import { useState } from "react";
import { REGISTRATION_PAYLOAD } from '../utils/Constants'
import { registerUser } from '../services/authService'
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import InputField from "../components/ui/InputField";
import SocialAuths from '../components/features/SocialAuths';

function Register() {
    const [formData, setformData] = useState(REGISTRATION_PAYLOAD)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState('')
    const navigate = useNavigate()
    const handleFormData = (inputTarget) =>{
        setformData((prev)=>{
            return {
                ...prev,
                [inputTarget.name]: inputTarget.value
            }
        })
    }

    const submitRequest = async() => {
        setIsLoading(true)
        try{
            const response = await registerUser(formData)
            if(response.success)
                navigate('/login')
        }catch(err){
            setErrors(err)
            throw err
        }finally{
            setIsLoading(false)
        }
    }

    return (
        isLoading ? <Spinner /> :
        <main
            className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 dark:from-neutral-900 dark:via-neutral-700 dark:to-neutral-600">
            <div className="min-h-screen flex fle-col items-center justify-center px-4 py-8 md:p-8">
                <div className="grid items-center gapx-x-10 gap-y-16 max-w-6xl w-full lg:grid-cols-2">
                    <div className="max-w-lg max-lg:mx-auto">


                        <h2 className="text-4xl font-semibold !leading-tight text-slate-50">
                            Seamless User Registration for Exclusive Access
                        </h2>
                        <p className="text-base mt-6 text-slate-100 leading-relaxed">Immerse yourself in a hassle-free login journey with
                            our intuitively designed login form. Effortlessly access your account.</p>

                        <div className="text-sm mt-12 text-slate-50">Don't have an account <a href="/login"
                            className="text-white font-semibold underline ml-1">Login here</a></div>
                    </div>

                    <div
                        className="bg-white border border-slate-200 rounded-lg px-6 py-8 max-w-lg mx-auto w-full md:px-8 lg:max-w-md dark:bg-neutral-800 dark:border-neutral-600">
                        <h1 className="text-3xl mb-10 font-semibold text-slate-900 dark:text-slate-50">Sign Up</h1>
                        <div>
                            
                            <InputField
                                label={{
                                    name: "Username",
                                    className: "mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50",
                                }}
                                type="text" 
                                id="username" 
                                name="username" 
                                className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600"
                                value={formData.username}
                                placeholder="johndeo"
                                validation={{
                                    required: true,
                                    maxLength: 100,
                                    allowSpace: false
                                }}
                                handleInput={(e)=>handleFormData(e)}
                            />
                        </div>
                        <div>
                            
                            <InputField
                                label={{
                                    name: "First Name",
                                    className: "mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50",
                                }}
                                type="text" 
                                id="first_name" 
                                name="first_name" 
                                className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600"
                                value={formData.first_name}
                                placeholder="John"
                                validation={{
                                    required: true,
                                    maxLength: 100,
                                    allowSpace: true
                                }}
                                handleInput={(e)=>handleFormData(e)}
                            />
                        </div>
                        <div>

                            <InputField
                                label={{
                                    name: "Last Name",
                                    className: "mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50",
                                }}
                                type="text" 
                                id="last_name" 
                                name="last_name" 
                                className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600"
                                value={formData.last_name}
                                placeholder="Doe"
                                validation={{
                                    required: false,
                                    maxLength: 100,
                                    allowSpace: true
                                }}
                                handleInput={(e)=>handleFormData(e)}
                            />
                        </div>
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
                                value={formData.password}
                                placeholder="••••••••"
                                validation={{
                                    required: true,
                                    allowSpace: false
                                }}
                                handleInput={(e)=>handleFormData(e)}
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

                        <div>
                            <InputField
                                label={{
                                    name: "Email",
                                    className: "mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50",
                                }}
                                type="email" 
                                id="email" 
                                name="email" 
                                className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600"
                                value={formData.email}
                                placeholder="john_deo@outlook.com"
                                validation={{
                                    required: true,
                                    allowSpace: false
                                }}
                                handleInput={(e)=>handleFormData(e)}
                            />
                            
                        </div>

                        <div>
                            <InputField
                                label={{
                                    name: "Phone",
                                    className: "mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50",
                                }}
                                type="phone" 
                                id="phone" 
                                name="phone" 
                                className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600"
                                value={formData.phone}
                                placeholder="+91-XXXXXXXXXX"
                                validation={{
                                    required: true,
                                    allowSpace: false
                                }}
                                handleInput={(e)=>handleFormData(e)}
                            />
                            
                        </div>

                        <div className="flex items-start flex-wrap gap-2">
                            <a href="#"
                                className="ml-auto text-sm font-medium text-blue-700 dark:text-blue-500 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                                Forgot password?
                            </a>
                        </div>

                        <button type="button" onClick={submitRequest}
                            className="w-full py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                            Sign up</button>

                        <div className="flex items-center gap-4 my-8">
                            <hr className="w-full border-slate-300 dark:border-neutral-700" />
                            <p className="text-sm text-slate-700 text-center dark:text-slate-300">or</p>
                            <hr className="w-full border-slate-300 dark:border-neutral-700" />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <SocialAuths setIsLoading={setIsLoading} setErrors={setErrors} pageFrom='register' />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Register