'use client'
import React from 'react'
import { useForm } from 'react-hook-form';
import { RegisterFormSchema, RegisterFormValues } from '../../lib/validations/user';
import { zodResolver } from '@hookform/resolvers/zod';

const RegisterForm = () => {
    const {register, handleSubmit, formState: { errors, isSubmitting }} = useForm<RegisterFormValues>({
        resolver: zodResolver(RegisterFormSchema), // Подключаем твою схему с refine
            defaultValues: {
                email: '',
                password: '',
                confirmPassword: '',
        },
    });

    const onInvalid = (errors: any) => {
        console.error("Errors:", errors);
    };

    const onSubmit = async (data: any) => {
        // const finalData = {
        //     ...data,
        //     slug: slugify(data.title, { lower: true, strict: true, locale: 'en' })
        // };
        // const result = await createProductAction(finalData);

        // if (!result.success) {
        //     if (result.error === "slug_exists") {
        //         setError("slug", { 
        //             type: "manual", 
        //             message: "Product with this slug already exist, change your title." 
        //         });

        //     } else {
        //         alert("Error: " + result.message);
        //     }
        //     return;
        // }
        // alert("Product successfully created!");
        // reset();
    };

    return (
        <div className='w-fit flex flex-col items-center gap-4 mx-auto mb-15 mt-5 md:my-20 md:w-100'>
            <h3 className='text-xl font-medium text-shadow-lg'>Sign Up</h3>
            <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="w-full flex flex-col gap-2">
                <div id='email'>
                    <label className='font-semibold text-lg text-gray-20'>Title</label>
                    <input {...register('email')} 
                        className={`w-full border p-2 mt-1 ${errors.email && 'error-input'}`}
                        placeholder="Email" />
                    {/* {errors.slug && (
                        <p className="text-red-500/75 text-xs mt-1">
                        {errors.email.message}
                        </p>
                    )} */}
                </div>
                <div id='password'>
                    <label className='font-semibold text-lg text-gray-20'>Password</label>
                    <input {...register('password')} 
                        className={`w-full border p-2 mt-1 ${errors.password && 'error-input'}`}
                        placeholder="Password" />
                </div>
                <div id='confirmPassword'>
                    <label className='font-semibold text-lg text-gray-20'>Confirm Password</label>
                    <input {...register('confirmPassword')} 
                        className={`w-full border p-2 mt-1 ${errors.confirmPassword && 'error-input'}`}
                        placeholder="Password" />
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4  text-white font-bold rounded-lg shadow-lg cursor-pointer mt-4 transition-all ${isSubmitting ? "bg-gray-400 shadow-gray-400" : "bg-blue-400/85 hover:bg-blue-400/85 shadow-blue-200"}`}
                >
                    Sign Up
                </button>
            </form>
        </div>
    )
}

export default RegisterForm