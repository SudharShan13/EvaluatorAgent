'use client'
import { useState } from 'react';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '@/app/firebase/config'
import { useRouter } from 'next/navigation';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const PasswordRequirements = ({ password }) => {
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[^\da-zA-Z]/.test(password);
  const isLengthValid = password.length >= 6 && password.length <= 30;

  return (
    <div className="text-sm mt-2">
      <div style={{ color: hasLowercase ? 'green' : 'red' }}>
        {hasLowercase ? '✔' : '✘'} At least one lowercase letter
      </div>
      <div style={{ color: hasUppercase ? 'green' : 'red' }}>
        {hasUppercase ? '✔' : '✘'} At least one uppercase letter
      </div>
      <div style={{ color: hasNumber ? 'green' : 'red' }}>
        {hasNumber ? '✔' : '✘'} At least one numeric character
      </div>
      <div style={{ color: hasSpecialChar ? 'green' : 'red' }}>
        {hasSpecialChar ? '✔' : '✘'} At least one non-alphanumeric character
      </div>
      <div style={{ color: isLengthValid ? 'green' : 'red' }}>
        {isLengthValid ? '✔' : '✘'} Between 6 and 30 characters long
      </div>
    </div>
  );
};


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter()

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSignUp = async () => {
    try {
        const res = await createUserWithEmailAndPassword(email, password)
        console.log({res})
        if (res) {
          sessionStorage.setItem('user', true);
          setEmail('');
          setPassword('');
          router.push('/');
        }else{
          window.alert('Sign-up failed! Please Enter Valid E-mail and Password.');
        }
    } catch(e){
      console.error(e);
      setError('Sign-up failed! Please enter a valid email and password.');
    }
  };

  const redirectToSignIn = () => {
    router.push('/sign-in');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-orange-500">
      <div className="bg-white p-8 rounded shadow-md w-96">
      <h2 className="text-2xl font-semibold mb-4 text-center text-orange-500">Sign Up</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 w-full border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter valid email"
            style={{ color: 'black' }}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <div className="flex items-center">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="mt-1 p-2 w-full border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{ color: 'black' }}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,30}$"
              title="Password must contain at least one lowercase letter, one uppercase letter, one numeric character, one non-alphanumeric character, and be between 6 and 30 characters long."
            />
            <IconButton
              onClick={handleTogglePasswordVisibility}
              edge="end"
              tabIndex={-1}
              size="small"
            >
              {showPassword ?  <Visibility /> : <VisibilityOff /> }
            </IconButton>
          </div>
          <PasswordRequirements password={password} />
        </div>
        <button
          className="bg-orange-500 text-white py-2 px-4 rounded-md w-full hover:bg-orange-600"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
        <p className="text-sm mt-4 text-center">
          <span className="text-gray-600">Need to SignIn ?{' '}</span>
          <span
            className="text-orange-500 hover:underline cursor-pointer"
            onClick={() => router.push('/sign-in')}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;