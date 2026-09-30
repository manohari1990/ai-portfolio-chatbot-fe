import { useState } from "react"
// import {forgetPassword, userLogin} from "../services/authService"
// import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom";
import InputField from "../components/ui/InputField";
// import Spinner from "../components/Spinner";
// import InputField from "../components/ui/InputField";
// import ModalUI from "../components/ui/ModalUI";
// import SocialAuths from "../components/features/SocialAuths";


function Login() {
    // const {login} = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [apiMessage, setApiMessage] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [forgotUsername, setForgotUsername] = useState('')
    const [apiResponse, setApiResponse] = useState('')
    

    const changePassword = async() => {
        setIsLoading(true)
        try{
            // const response = await forgetPassword({user: forgotUsername})
            // setApiResponse(response.message)
        }catch(err){
            throw err;
        }finally{
            setIsLoading(false)
            setTimeout(()=> setIsModalOpen(false), 3000)
            setForgotUsername('')
        }
    }

    const submitRequest = async() => {
        if(errors.length > 0) {
            setErrors(prev=> []);
            return;
        }
        setIsLoading(true)
        // try{
        //     const response = await userLogin(username, password)
        //     if(response.success){
        //         login(response.records[0])
        //         navigate('/todos')
        //     }
        // }catch(err){
        //     console.log(err)
        //     setApiMessage(err)
        // }finally{
        //     setIsLoading(false)
        // }
    }


    return (
        
        <main
            className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 dark:from-neutral-900 dark:via-neutral-700 dark:to-neutral-600">
            {/* {isLoading && 
                // <Spinner />
            } */}
            <div className="min-h-screen flex fle-col items-center justify-center px-4 py-8 md:p-8">
                <div className="grid items-center gapx-x-10 gap-y-16 max-w-6xl w-full lg:grid-cols-2">
                    <div className="max-w-lg max-lg:mx-auto">
                    
                        <h2 className="text-4xl font-semibold !leading-tight text-slate-50">
                            Seamless Login for Exclusive Access
                        </h2>
                        <p className="text-base mt-6 text-slate-100 leading-relaxed">Immerse yourself in a hassle-free login journey with
                            our intuitively designed login form. Effortlessly access your account.</p>

                        <div className="text-sm mt-12 text-slate-50">Don't have an account <a href="/register"
                            className="text-white font-semibold underline ml-1">Register here</a></div>
                    </div>

                    <div
                        className="bg-white border border-slate-200 rounded-lg px-6 py-8 max-w-lg mx-auto w-full md:px-8 lg:max-w-md dark:bg-neutral-800 dark:border-neutral-600">
                        <h1 className="text-3xl mb-10 font-semibold text-slate-900 dark:text-slate-50">Sign in</h1>
                            <div>
                                <InputField
                                    label={{
                                        name: "Username or Email",
                                        className: "mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50",
                                    }}
                                    type="text" 
                                    id="username" 
                                    name="username" 
                                    className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600"
                                    value={username}
                                    placeholder="johndeo"
                                    validation={{
                                        required: true,
                                        maxLength: 100,
                                        allowSpace: false
                                    }}
                                    handleInput={()=>{}}
                                    // handleInput={(target, error)=>{
                                    //     setUsername(target.value)
                                    //     if(error !== ''){
                                    //         setErrors((prev)=> {
                                    //             return [
                                    //                 error
                                    //             ]
                                    //         })
                                    //     }
                                    // }}
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
                                    value={password}
                                    placeholder="••••••••"
                                    validation={{
                                        required: true,
                                        allowSpace: false
                                    }}
                                    handleInput={()=>{}}
                                    // handleInput={(target, error)=>{
                                    //     setPassword(target.value)
                                    //     if(error !== ''){
                                    //         setErrors((prev)=> {
                                    //             return [
                                    //                 error
                                    //             ]
                                    //         })
                                    //     }
                                    // }}
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

                            <div className="flex items-start flex-wrap gap-2">
                                
                                <a href="#" onClick={()=>setIsModalOpen(true)}
                                    className="ml-auto text-sm font-medium text-blue-700 dark:text-blue-500 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                                    Forgot password?
                                </a>
                            </div>
                            {apiMessage ? <p className="text-sm my-4">{apiMessage}</p> : ''}

                            <button type="button" onClick={submitRequest}
                                className="w-full my-4 py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                                Sign in</button>

                        <div className="flex items-center gap-4 my-8">
                            <hr className="w-full border-slate-300 dark:border-neutral-700" />
                            <p className="text-sm text-slate-700 text-center dark:text-slate-300">or</p>
                            <hr className="w-full border-slate-300 dark:border-neutral-700" />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            {/* <SocialAuths setIsLoading={setIsLoading} setErrors={setErrors} pageFrom='login' /> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <ModalUI 
                isOpen={isModalOpen} 
                setIsOpen={setIsModalOpen} 
                modalTitle="Forgot Password"
                submitText="Submit"
                onSubmit={changePassword}
            >
                <InputField
                    label={{
                        name: "Username or Email",
                        className: "mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50",
                    }}
                    type="text" 
                    id="username" 
                    name="username" 
                    className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600"
                    value={forgotUsername}
                    placeholder="johndeo"
                    validation={{
                        required: true,
                        maxLength: 100,
                        allowSpace: false
                    }}
                    handleInput={(target, error)=>{
                        setForgotUsername(target.value)
                        if(error !== ''){
                            setErrors(prev=>{
                                return [
                                    error
                                ]
                            })
                        }
                    }}
                />
                {apiResponse ? <p>{apiResponse}</p> : ''}
            </ModalUI> */}
        </main>
    )
}

export default Login