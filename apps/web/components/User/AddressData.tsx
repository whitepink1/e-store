'use client'
import { useForm } from "react-hook-form";
import { AddressFormValues, SavedAddressSchema } from "../../lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAddressAction } from "../../app/actions/user";
import { useState } from "react";
import Image from "next/image";

const AddressData = () => {
    const [isVisible, setIsVisible] = useState(false);
    const {register, handleSubmit, formState: { errors, isSubmitting },} = useForm<AddressFormValues>({
        resolver: zodResolver(SavedAddressSchema),
            defaultValues: {
                name: "",
                country: "",
                city: "",
                street: "",
                apartment: "",
                postalCode: "",
                phone: "",
            },
    });

    const onSubmit = async (data: AddressFormValues) => {
        try {
            const result = await createAddressAction(data);
            if (result.success) {
                console.log('Address successfully created.');
                setIsVisible(false);
            }
        } catch (err) {
            console.error(err);
        }
    };
    return (<>
            {isVisible ?
            <form onSubmit={handleSubmit(onSubmit)} className="w-160 grid grid-cols-3 gap-3 my-5">
                <div className="">
                    <input {...register('name')} placeholder="Address Name" className={`w-full border p-2 rounded ${errors.name && 'error-input'}`} />
                </div>
                <div>
                    <input {...register('country')} placeholder="Country" className={`w-full border p-2 rounded ${errors.country && 'error-input'}`} />
                </div>
                <div>
                    <input {...register('city')} placeholder="City" className={`w-full border p-2 rounded ${errors.city && 'error-input'}`} />
                </div>
                <div>
                    <input {...register('street')} placeholder="Street" className={`w-full border p-2 rounded ${errors.street && 'error-input'}`} />
                </div>
                <div>
                    <input {...register('apartment')} placeholder="Apartment / House #" className={`w-full border p-2 rounded ${errors.apartment && 'error-input'}`} />
                </div>
                <div>
                    <input {...register('postalCode')} placeholder="Postal Code" className={`w-full border p-2 rounded ${errors.postalCode && 'error-input'}`} />
                </div>
                <div className="col-start-2">
                    <input {...register('phone')} placeholder="Phone number" className={`w-full border p-2 rounded ${errors.phone && 'error-input'}`} />
                </div>
                <button type="submit" disabled={isSubmitting} className="bg-green-500/85 text-white p-2 rounded col-span-3 disabled:bg-gray-15">
                    {isSubmitting ? 'Saving...' : 'Save Address'}
                </button>
            </form>
            :
            <button className="w-160 flex flex-col items-center cursor-pointer group" onClick={() => setIsVisible(true)}>
                <p className="relative mx-auto group-hover:scale-105">
                    <Image
                        src='/icon/plus.png'
                        width={24}
                        height={24}
                        alt='Add adress'/>
                </p>
                <div className="w-160 absolute h-3 border-b border-dashed" />
                <p className="text-sm leading-4 mt-2 group-hover:scale-105">Add New Address</p>
            </button>}
        </>
    )
}

export default AddressData