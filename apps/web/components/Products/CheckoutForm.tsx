'use client'
import { Product } from '../../lib/validations/product'
import { AddressFormValues, CartItem, User } from '../../lib/validations/user';
import { checkoutSteps, shipmentMethod } from '../../lib/data';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import AddressData from '../User/AddressData';
import MotionDiv from '../Motion/MotionDiv';
import { checkoutSessionAction, getUserAction, handleDeleteAddressAction } from '../../app/actions/user';
import Button from '../shared/Button';
import { useRouter } from 'next/navigation';

interface CheckoutFormProps {
    products: Product[];
    orderItems: CartItem[];
};

export type OrderDataProps = {
    products: {
        price: number;
        productId: string;
        variantId: string;
        quantity: number;
    }[],
    address: AddressFormValues,
    shipment: string;
}

type StepProps = 'Address' | 'Shipping' | 'Payment';

const CheckoutForm = ({products, orderItems}: CheckoutFormProps) => {
    const router = useRouter();
    const [user, setUser] = useState<User>();
    const [step, setStep] = useState<StepProps>('Address');
    const [shipment, setShipment] = useState<string>('Free');
    const [isLoading, setIsLoading] = useState(false);
    const [actualAddress, setActualAddress] = useState<AddressFormValues>({
        _id: '',
        name: '',
        country: "",
        city: "",
        street: "",
        apartment: "",
        postalCode: "",
        phone: ""
    });
    const shipmentPrice = shipmentMethod.find(s => s.name === shipment)?.price;
    const orderProducts = useMemo(() => {
        return orderItems
            .map((item) => {
                const product = products.find((p) => p._id === item.productId);
                if (!product) return null;

                const variant = product.variants[Number(item.variantId)];
                return {
                    ...item,
                    price: variant?.finalPrice ?? 0,
                };
            })
            .filter(Boolean) as Array<{
                price: number;
                productId: string;
                variantId: string;
                quantity: number;
            }>;
    }, [orderItems, products]);
    const totalPrice = useMemo(() => {
        return orderProducts.reduce((sum, item) => {
            return sum + Number(item.quantity) * Number(item.price);
        }, 0);
    }, [orderProducts]);
    
    useEffect(() => {
            const fetchUser = async () => {
                try {
                    const result = await getUserAction();
        
                    if (result.success && result.data) {
                        setUser(result.data.user);
                        if(result.data.user.address) {
                            setActualAddress(result.data.user.address[0])
                        }
                    } else {
                        throw new Error(result.message || "Didn't found any user.");
                    }
                } catch (err) {
                    console.log(err)
                }
            };
            fetchUser();
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

    const handleNext = () => {
        if (step === 'Address' && !actualAddress._id) {
            alert('Please select or add an address');
            return;
        }
        if (step === 'Address') setStep('Shipping');
        else if (step === 'Shipping') setStep('Payment');
    };

    const handleBack = () => {
        if (step === 'Shipping') setStep('Address');
        else if (step === 'Payment') setStep('Shipping');
    };

    const handleSubmitOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!actualAddress._id) {
            alert('Please select an address');
            setStep('Address');
            return;
        };
        setIsLoading(true);
        try {
            const finalData: OrderDataProps = {
                products: orderProducts,
                address: actualAddress,
                shipment: shipment,
            };
            const result = await checkoutSessionAction(finalData);
            if (result.success && result.url) {
                window.location.href = result.url;
            } else {
                alert(result.message || 'Checkout failed');
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className='flex flex-col px-basic'>
            <div className='flex justify-between items-center py-18'>
                {checkoutSteps.map(item => (
                    <div key={item.dataName} className={`flex items-center ${step === item.dataName ? '' : 'opacity-35 cursor-pointer'}`} onClick={() => setStep(item.dataName as StepProps)}>
                        <Image
                            src={item.img}
                            height={24}
                            width={24}
                            alt={item.dataName}
                            className='m-2'/>
                        <div>
                            <p className='text-sm font-medium leading-4'>{item.number}</p>
                            <p className='text-[19px] font-medium leading-6'>{item.dataName}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-center mt-12'>
                {step === 'Address' && 
                    <MotionDiv className='flex flex-col'>
                        <p className='text-lg font-semibold leading-6 mb-8'>Select Address</p>
                        <div>
                            {user?.address.map(item => (
                                <div key={item._id} className='w-160 flex bg-white-100 rounded-lg p-6 mb-6'>
                                    <label className="flex items-center cursor-pointer select-none self-start">
                                        <input 
                                            type="radio" 
                                            name="selectedAddress"
                                            checked={actualAddress._id === item._id}
                                            onChange={() => setActualAddress(item)}
                                            className="sr-only" 
                                        />
                                        <div className={`h-5.5 w-5.5 border-2 rounded-full mr-3 flex items-center justify-center transition-all ${
                                            actualAddress._id === item._id ? 'border-black' : 'border-gray-35'
                                            }`}>
                                            <div className={`h-3 w-3 bg-black rounded-full transition-transform duration-200 ${
                                                actualAddress._id === item._id ? 'scale-100' : 'scale-0'
                                                }`} />
                                        </div>
                                    </label>
                                    <div className='w-full flex flex-col items-start gap-3'>
                                        <p className='text-white text-xs font-medium bg-black rounded-sm px-2 py-1'>{item.name}</p>
                                        <div className='w-full flex justify-between'>
                                            <p className='text-black-50 text-base leading-6'>{item.country}, {item.city}, {item.street} {item.apartment && '#' + item.apartment} / {item.postalCode}</p>
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
                                </div>
                            ))}
                        </div>
                        <AddressData/>
                    </MotionDiv>
                }
                {step === 'Shipping' && 
                    <MotionDiv  className='w-160 flex flex-col pb-12'>
                        <p className='text-lg font-semibold leading-6 mb-8'>Shipment Method</p>
                        <div className='flex flex-col gap-4'>
                            {shipmentMethod.map(item => (
                                <div key={item.name} className='flex justify-between border border-white-300 rounded-xl p-6'>
                                    <div className='flex justify-start gap-3'>
                                        <label className="flex items-center cursor-pointer select-none self-start">
                                            <input 
                                                type="radio" 
                                                name="selectedAddress"
                                                checked={shipment === item.name}
                                                onChange={() => setShipment(item.name)}
                                                className="sr-only" 
                                            />
                                            <div className={`h-5.5 w-5.5 border-2 rounded-full flex items-center justify-center transition-all ${
                                                shipment === item.name ? 'border-black' : 'border-gray-35'
                                                }`}>
                                                <div className={`h-3 w-3 bg-black rounded-full transition-transform duration-200 ${
                                                    shipment === item.name ? 'scale-100' : 'scale-0'
                                                    }`} />
                                            </div>
                                        </label>
                                        <p className={`text-base font-medium leading-6 transition-opacity duration-200 ${shipment !== item.name ? 'opacity-50' : ''}`}>{item.name}</p>
                                        <p className={`text-base font-normal leading-6 transition-opacity duration-200 ${shipment !== item.name ? 'opacity-50' : ''}`}>{item.text}</p>
                                    </div>
                                    <p className={`text-base font-medium leading-6 text-black-50 ml-3 transition-opacity duration-200 ${shipment !== item.name ? 'opacity-50' : ''}`}>31.02.2077</p>
                                </div>
                            ))}
                        </div>
                    </MotionDiv>
                }
                {step === 'Payment' &&
                    <MotionDiv className='w-full grid grid-cols-2 gap-24'>
                        <div className='w-full flex flex-col items-start border border-white-150 rounded-[10px] gap-6 py-8 px-6'>
                            <p className='text-xl font-medium leading-4'>Summary</p>
                            <div className='w-full flex flex-col gap-4'>
                                {orderProducts.map((item, index) => {
                                    const curProduct = products.find(prod => prod._id === item?.productId);
                                    const img = curProduct?.variants[Number(item?.variantId)]?.images[0];
                                    return (
                                        <div key={index} className='w-full flex items-center justify-start bg-white-100 rounded-xl p-4'>
                                            <Image
                                                src={img || ''}
                                                width={40}
                                                height={40}
                                                alt={`Product ${curProduct?.slug} v: ${item?.variantId}`}/>
                                            <p className='text-base font-medium leading-6 px-2'>{curProduct?.title}</p>
                                            <p className='text-base font-bold leading-6 ml-auto'>${Number(item?.price) * Number(item?.quantity)}</p>
                                        </div>)
                                })}
                            </div>
                            <div className='w-full'>
                               <p className='text-sm font-medium leading-4 text-gray-70'>Address</p>
                               <p className='text-base font-normal leading-6 mb-4'>{actualAddress.street} / {actualAddress.apartment}, {actualAddress.city}, {actualAddress.postalCode}</p> 
                               <p className='text-sm font-medium leading-4 text-gray-70'>Shepment method</p>
                               <p className='text-base font-normal leading-6 mb-6'>{shipment}</p>
                               <p className='flex justify-between text-base font-medium leading-6 mb-4'>Subtotal <span className='leading-8'>${totalPrice}</span></p>
                               <p className='flex justify-between text-base font-normal leading-8 text-gray-70'>Estimated Tax <span className='font-medium text-black'>$50</span></p>
                               <p className='flex justify-between text-base font-normal leading-8 text-gray-70 mb-4'>Estimated shipping & Handling <span className='font-medium text-black'>${shipmentPrice}</span></p>
                               <p className='flex justify-between text-base font-medium leading-6'>Total <span>${totalPrice + (shipmentPrice || 0) + 50}</span></p>
                            </div>
                        </div>
                        <div>
                            <h4 className='text-xl font-bold leading-4'>Payment</h4>
                            <form onSubmit={handleSubmitOrder}>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-black text-white py-4 rounded-xl font-medium disabled:opacity-50"
                                >
                                    {isLoading ? 'Processing...' : `Pay $${totalPrice + (shipmentPrice || 0) + 50}`}
                                </button>
                            </form>
                        </div>

                    </MotionDiv>
                }
            </div>
            <div className="flex justify-between max-w-160 gap-6 ml-auto my-10">
                {step !== 'Address' && (
                    <Button
                        variant='white'
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                )}
                {step !== 'Payment' && (
                    <Button
                        variant='blackFill'
                        onClick={handleNext}
                    >
                        Next
                    </Button>
                )}
            </div>
        </div>
    )
}

export default CheckoutForm