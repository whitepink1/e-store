'use client'
import React, { useEffect, useState } from 'react'
import { User } from '../../lib/validations/user';
import { getUserAction, handleDeleteAddressAction } from '../../app/actions/user';
import PersonalData from '../User/PersonalData';
import AddressData from '../User/AddressData';
import Image from 'next/image';

const Profile = () => {
    const [user, setUser] = useState<User>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const result = await getUserAction();
    
                if (result.success && result.data) {
                    setUser(result.data.user);
                } else {
                    throw new Error(result.message || "Didn't found any user.");
                }
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleDeleteAddress = async (id: string) => {
        if (!id) return;
        try {
            const result = await handleDeleteAddressAction(id || '');
            if (!result.success) {
                alert(result.message || "Deleting address failed.");
            } else {
                setUser((prevUser) => {
                    if (!prevUser) return prevUser;
                    return {
                        ...prevUser,
                        address: prevUser.address.filter(item => item._id !== id)
                    };
                });
            }
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <div>
            {isLoading ?
                <div className="text-gray-500">Products loading...</div>
            :
                <>
                    <div className='flex items-center gap-3'>
                        <label className='text-lg font-medium'>Email: </label>
                        <p className='text-lg text-gray-20'>{user?.email}</p>
                    </div>
                    <PersonalData name={user?.name || ''} surname={user?.surname || ''}/>
                    {user?.address.map(item => (
                        <div key={item._id} className=' flex flex-col items-start gap-3 bg-white-100 p-6 rounded-lg mb-6 md:w-160'>
                            <p className='text-white text-xs font-medium bg-black rounded-sm px-2 py-1'>{item.name}</p>
                            <div className='w-full flex justify-between'>
                                <p className='text-black-50 text-base leading-6 max-md:w-[80%]'>{item.country}, {item.city}, {item.street} {item.apartment && '#' + item.apartment} / {item.postalCode}</p>
                                <button className='cursor-pointer hover:scale-105' onClick={() => handleDeleteAddress(item._id || '')}>
                                    <Image
                                        src='/icon/delete-x.png'
                                        height={24}
                                        width={24}
                                        alt='Remove address'/>
                                </button>
                            </div>
                            <p className='text-black-50 text-base leading-6'>{item.phone}</p>

                        </div>
                    ))}
                    <AddressData />
                </>
            }
        </div>
    )
}

export default Profile