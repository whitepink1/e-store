'use client'
import React from 'react'
import { useForm } from 'react-hook-form';
import { LoginFormSchema, LoginFormValues } from '../../lib/validations/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginAction } from '../../app/actions/auth';
import { useRouter, useSearchParams } from 'next/navigation';

const LoginForm = () => {
    const {register, handleSubmit,setError, formState: { errors, isSubmitting }} = useForm<LoginFormValues>({
        resolver: zodResolver(LoginFormSchema),
            defaultValues: {
                email: '',
                password: '',
        },
    });
    const router = useRouter();
    const searchParams = useSearchParams();
    const isJustRegistered = searchParams.get('registered') === 'success';

    const onInvalid = (errors: any) => {
        console.error("Errors:", errors);
    };

    const onSubmit = async (data: any) => {
        const result = await loginAction(data);

        if (result?.success) {
            const redirectTo = searchParams.get('from') || '/'; 
            
            router.push(redirectTo);
            router.refresh();
        } else {
            console.log("Error: " + result?.message);
            setError("email", { 
                type: "server", 
                message: result?.message || "Invalid email or password" 
            });
            setError("password", { 
                type: "server", 
                message: "Please check your credentials" 
            });
        }
    };

    return (
        <div className='w-fit flex flex-col items-center gap-4 mx-auto mb-15 mt-5 md:my-20 md:w-100'>
            <h3 className='text-xl font-medium text-shadow-lg'>Sign In</h3>
            {isJustRegistered && (
                <div className="w-full bg-green-100 border border-green-400/75 text-green-700/75 px-4 py-2 rounded text-sm mb-4 text-center">
                    Successfull signing up. Now you're free to login!
                </div>
            )}
            <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="w-full flex flex-col gap-2">
                <div id='email'>
                    <label className='font-semibold text-lg text-gray-20'>Title</label>
                    <input {...register('email')} 
                        className={`w-full border p-2 mt-1 ${errors.email ? 'error-input' : ''}`}
                        placeholder="Email" />
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-0.5">{errors.email.message}</p>
                    )}
                </div>
                <div id='password'>
                    <label className='font-semibold text-lg text-gray-20'>Password</label>
                    <input {...register('password')} 
                        className={`w-full border p-2 mt-1 ${errors.password ? 'error-input' : ''}`}
                        placeholder="Password" />
                    {errors.password && (
                        <p className="text-red-500 text-xs mt-0.5">{errors.password.message}</p>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4  text-white font-bold rounded-lg shadow-lg cursor-pointer mt-4 transition-all ${isSubmitting ? "bg-gray-400 shadow-gray-400" : "bg-blue-400/85 hover:bg-blue-400/85 shadow-blue-200"}`}
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginForm;