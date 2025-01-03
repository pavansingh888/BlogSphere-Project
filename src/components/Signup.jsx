import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("Please enter your details :")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async (data) => {    
        setError("")
        try {
            const session = await authService.createAccount(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin({userData}));
                navigate("/")
            }
        } catch (error) {
            console.log(error);
            setError(error.message)
        }
    }

  return (
    
    <div className="mx-auto w-full max-w-lg bg-white rounded-xl py-10 px-8 border border-gray-200 shadow-lg">
      <div className="mb-4 flex justify-center">
        <span className="inline-block w-full max-w-[100px]">
          <Logo width="100%" />
        </span>
      </div>
      <h2 className="text-center text-2xl font-bold text-blue-600 mb-4">Sign up to create account</h2>
      <p className="mt-2 text-center text-base text-gray-700">
        Already have an account?&nbsp;
        <Link
          to="/login"
          className="font-medium text-emerald-500 hover:text-emerald-600 transition-all duration-200"
        >
          Sign In
        </Link>
      </p>
      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit(create)} className="mt-6 text-left text-base">
        <div className="space-y-5">
          <Input
            label="Full Name: "
            placeholder="Enter your full name"
            {...register("name", { required: true })}
          />
          <Input
            label="Email: "
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ? setError("") :
                  setError("Email address must be a valid address"),
              },
            })}
          />
          <Input
            label="Password: "
            type="password"
            placeholder="Enter your password"
            {...register("password", { 
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) ? setError("") :
                  setError("Password must be a valid password"),
              },
             })}
          />
          <Button type="submit" className="w-full bg-emerald-500 text-white py-2 rounded-full hover:bg-emerald-600 duration-200">
            Create Account
          </Button>
        </div>
      </form>
    </div>
  
  )
}

export default Signup