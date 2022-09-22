import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'

const ForgotPassword = () => {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const params = useParams()

    const navigate = useNavigate()

    const resetPassword = async () => {

        try {
            toast.loading()
            const response = await axios.post('http://localhost:5001/api/auth/forgot-password',
                { password, token: params.token })
            if (response.data.success) {
                toast.success('Password reset successfully')
                navigate('/login')
            } else {
                toast.error('expired or invalid link')
            }
            toast.dismiss()
        } catch (error) {
            toast.dismiss()
            toast.error('sth went wrong')
            console.log(error)
        }
    }

    return (
        <div className='flex flex-col justify-center items-center h-screen space-y-7'>
            <div className='w-[400px] flex flex-col space-y-5 shadow-lg border p-7'>
                <h1 className='font-demibold text-3xl text-primary'>Change Your Password</h1>

                <input
                    type='password'
                    className='py-2 px-3 border-2 border-grey-800 rounded focus:outline-none w-full'
                    placeholder='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                <input
                    type='password'
                    className='py-2 px-3 border-2 border-grey-800 rounded focus:outline-none w-full'
                    placeholder='confirm password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                />

            </div>
            <div className='flex justify-between items-center w-[400px]'>
                <button className='py-1 px-5 text-white bg-primary' onClick={resetPassword}>Reset Password</button>
            </div>
        </div>
    )
}

export default ForgotPassword