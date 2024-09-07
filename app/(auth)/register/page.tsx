import Link from 'next/link';
import { RegisterForm } from '../_components/register-form';


const RegisterPage = () => {
  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center gap-5 bg-white'>
      <h2 className='text-xl font-semibold'>Create an account</h2>
      <RegisterForm />
      <p className='text-center'>or</p>
      <div>
        Auth Providers
      </div>
      <div className='flex gap-1'>
        <p>Already have an account?</p> 
        <Link href='/login' className='font-semibold'>
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;