import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const VerifyEmail = () => {

    const params = useParams()
    const [emailVerified, setEmailVerified] = useState('')

    const verifyToken = async () => {
        try {
            toast.loading()
            const response = await axios.post('http://localhost:5001/api/auth/verify-email', { token: params.token })

            if (response.data.success) {
                setEmailVerified(true)
            } else {
                setEmailVerified(false)
            }
            toast.dismiss()
        } catch (error) {
            console.log(error)
            setEmailVerified(false)
        }
    }

    useEffect(() => {
        verifyToken()
    }, [])

    return (
        <div className='flex min-h-screen justify-center items-center'>
            {emailVerified == '' && <h1 className='text-primary text-4xl'>Please wait we are verifying your email</h1>}
            {emailVerified == true && <h1 className='text-primary text-4xl'>Your email verified successfully</h1>}
            {emailVerified == false && <h1 className='text-primary text-4xl'>Invalid token</h1>}
        </div>
    )
}

export default VerifyEmail