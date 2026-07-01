import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from "../services/axios.js"
import toast from 'react-hot-toast'

const SignupPage = () => {

  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const submitHandler = async(e) => {
    e.preventDefault();
    
    const formData = {
      fullName,
      email,
      password,
      confirmPassword
    }
    try {
      const response = await api.post("/auth/register", formData);
      toast.success("Account created successfully")
      navigate("/login")
      
    } catch (error) {
      console.error(error.response?.data?.message)
      
      toast.error(error.response?.data?.message|| "Something is wrong!")
    } 
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className=' min-w-lg px-4 py-6 rounded-2xl 
      backdrop-blur-xs bg-white/5 border border-white/20
           shadow-md shadow-black/50
           max-w-md w-full
          transition-all duration-300'>

        <h1 className='text-center text-[25px] font-semibold text-white mb-10'>Sign Up</h1>
        <form className='flex flex-col gap-3'
        onSubmit={(e) => submitHandler(e)}
        >

          {/* --- full name --- */}
          <div className='flex flex-col'>
            <label className='text-[#efefef] font-semibold text-[14px] mx-2 mb-1'>Full Name</label>
            <input
            value={fullName}
            onChange={(e)=>setFullName(e.target.value)}
              className='bg-gray-300 text-black placeholder:text-gray-900 px-4 py-1.5 rounded-md text-[18px] focus:outline-none ' type="text" placeholder='Full Name' />
          </div>


          {/* --- email --- */}
          <div className='flex flex-col'>
            <label className='text-[#efefef] font-semibold text-[14px] mx-2 mb-1'>Email</label>
            <input
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
              className='bg-gray-300 text-black placeholder:text-gray-900 px-4 py-1.5 rounded-md text-[18px] focus:outline-none ' type="email" placeholder='Email' />
          </div>


          {/* --- password --- */}
          <div className='flex flex-col'>
            <label className='text-[#efefef] font-semibold text-[14px] mx-2 mb-1'>Password</label>
            <input
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
              className='bg-gray-300 text-black placeholder:text-gray-900 px-4 py-1.5 rounded-md text-[18px] focus:outline-none ' type="password" placeholder='Password' />
          </div>


          {/* --- confirm password --- */}
          <div className='flex flex-col'>
            <label className='text-[#efefef] font-semibold text-[14px] mx-2 mb-1'>Confirm password</label>
            <input
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
              className='bg-gray-300 text-black placeholder:text-gray-900 px-4 py-1.5 rounded-md text-[18px] focus:outline-none ' type="password" placeholder='Confirm password' />
          </div>


          <h3 className='text-center text-gray-300 text-sm'>Already have an account? <Link to="/login" className='text-white cursor-pointer'>Login</Link></h3>


          <button
            type='submit'
            className='bg-white text-lg py-1 rounded-md font-semibold cursor-pointer mt-6 hover:bg-orange-200'>Signup</button>
        </form>

      </div>
    </div>
  )
}

export default SignupPage