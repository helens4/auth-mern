import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const [userInfo, setUserInfo] = useState(null)
    const navigate = useNavigate()

    const getData = async () => {
        toast.loading('getting user data...')
        try {
            const token = localStorage.getItem('user')
            const response = await axios.get('http://localhost:5001/api/user/get-user-info', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            toast.dismiss()

            if (response.data.success) {
                setUserInfo(response.data.data)
            } else {
                toast.error('sth went wrong')
                localStorage.removeItem('user')
                navigate('/login')
            }

        } catch (error) {
            toast.error('sth went wrrrong')
            localStorage.removeItem('user')
            navigate('/login')
        }
    }

    useEffect(() => {
        if (userInfo == null) {
            getData()
        }
    }, [userInfo])

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <h1 className='text-5xl font-semibold text-primary'>{userInfo?.email}</h1>
        </div>
    )
}

export default Home