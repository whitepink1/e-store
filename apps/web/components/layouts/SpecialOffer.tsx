import Image from 'next/image'
import Button from '../shared/Button'

const SpecialOffer = () => {
    return (
        <div className='relative w-full h-110 flex items-center justify-center'>
            <div className='hidden absolute inset-0 z-1 md:block'>
                <Image
                    src='/images/banner_low.png'
                    fill
                    className='object-center'
                    alt="Summer sale banner"/>
            </div>
            <div className='block absolute inset-0 z-1 md:hidden'>
                <Image
                    src='/images/banner_low_md.png'
                    fill
                    className='object-center'
                    alt="Summer sale banner"/>
            </div>
            <div className='w-full flex flex-col items-center justify-center mx-auto z-10'>
                <h1 className='text-5xl font-extralight text-white md:text-7xl'>Big Summer <span className='font-medium'>Sale</span></h1>
                <p className='text-sm font-normal leading-10 text-gray-90 md:text-base'>Commodo fames vitae vitae leo mauris in. Eu consequat.</p>
                <Button variant='white' href='/' className='mt-5 md:mt-10'>Shop Now</Button>
            </div>
        </div>
    )
}

export default SpecialOffer