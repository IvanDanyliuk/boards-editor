import Link from 'next/link';
import { LoginForm } from '../_components/login-form';


const LoginPage = () => {
  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center gap-5 bg-white'>
      <h2 className='text-xl font-semibold'>Sign In</h2>
      <LoginForm />
      <p className='text-center'>or</p>
      <div>
        Auth Providers
      </div>
      <div className='flex gap-1'>
        <p>Do not have an account?</p> 
        <Link href='/register' className='font-semibold'>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;