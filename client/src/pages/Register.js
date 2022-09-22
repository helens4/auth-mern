import { Link } from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'

const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const registerUser = async () => {
        if (password === confirmPassword) {
            const userObj = { name, email, password, confirmPassword }

            try {
                toast.loading('loading...')
                const response = await axios.post('http://localhost:5001/api/auth/register', userObj)
                toast.dismiss()
                if (response.data.success) {
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            } catch (error) {
                toast.dismiss()
                console.log(error)
            }
        } else {
            toast.error('Passwords not match')
        }

    }


    return (
        <div className='flex flex-col justify-center items-center h-screen space-y-7'>
            <div className='w-[400px] flex flex-col space-y-5 shadow-lg border p-7'>
                <h1 className='font-demibold text-3xl text-primary'>Welcome</h1>

                <input
                    type='text'
                    className='py-2 px-3 border-2 border-grey-800 rounded focus:outline-none w-full'
                    placeholder='name'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />

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

                <input
                    type='password'
                    className='py-2 px-3 border-2 border-grey-800 rounded focus:outline-none w-full'
                    placeholder='confirm password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                />
            </div>
            <div className='flex justify-between items-center w-[400px]'>
                <Link className='underline text-secondary' to='/login'>click here to login</Link>
                <button className='py-1 px-5 text-white bg-primary' onClick={registerUser}>Register</button>
            </div>
        </div>
    )
}

export default Register