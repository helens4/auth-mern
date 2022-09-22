import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import ForgotPassword from './ForgotPassword'

const Login = () => {

    const [showForgotPassword, setShowForgotPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const loginUser = async () => {
        const userObj = { email, password }

        try {
            toast.loading('loading...')
            const response = await axios.post('http://localhost:5001/api/auth/login', userObj)
            toast.dismiss()
            if (response.data.success) {
                toast.success(response.data.message)
                localStorage.setItem('user', response.data.data)
                navigate('/')
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.dismiss()
            toast.error('sth went wrong')
            console.log(error)
        }
    }

    const sendResetPasswordLink = async () => {
        try {
            toast.loading('')
            const response = await axios.post('http://localhost:5001/api/auth/send-reset-password-link', { email })
            toast.dismiss()
            if (response.data.success) {
                toast.success(response.data.message)
                setShowForgotPassword(false)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.dismiss()
            toast.error('sth went wrong')
            console.log(error)
        }
    }

    return (
        <div className='flex flex-col justify-center items-center h-screen space-y-7'>
            {!showForgotPassword && (
                <div>
                    <div className='w-[400px] flex flex-col space-y-5 shadow-lg border p-7'>
                        <h1 className='font-demibold text-3xl text-primary'>Welcome back</h1>

                        <input
                            type='text'
                            className='py-2 px-3 border-2 border-grey-800 rounded focus:outline-none w-full'
                            placeholder='email'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />

                        <input
                            type='password'
                            className='py-2 px-3 border-2 border-grey-800 rounded focus:outline-none w-full'
                            placeholder='password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />

                    </div>
                    <div className='flex justify-between items-center w-[400px]'>
                        <div className='flex flex-col'>
                            <Link className='underline text-secondary' to='/register'>click here to register</Link>
                            <h1 className='underline text-secondary' onClick={() => setShowForgotPassword(true)}>forgot password</h1>
                        </div>

                        <button className='py-1 px-5 text-white bg-primary' onClick={loginUser}>Login</button>
                    </div>
                </div>
            )}

            {showForgotPassword && (
                <div>
                    <h1 className='font-demibold text-3xl text-primary'>Enter email</h1>

                    <input
                        type='text'
                        className='py-2 px-3 border-2 border-grey-800 rounded focus:outline-none w-full'
                        placeholder='email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />

                    <div className='flex justify-between items-center w-[400px]'>

                        <button className='py-1 px-5 text-white bg-primary' onClick={sendResetPasswordLink}>Send reset password link</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Login