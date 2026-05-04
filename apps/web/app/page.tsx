import Image from "next/image";
import Link from "next/link";
import Button, { ButtonVariant } from "../components/shared/Button";
import { browseCategory, homepageSlideOptions } from "../lib/data";
import HotOffers from "../components/layouts/HotOffers";


export default function Home() {
  return (
    <div>
      <section className="flex flex-col justify-between px-basic bg-main-dark lg:flex-row lg:pt-15">
        <div className="flex flex-col items-center gap-6 my-auto lg:items-start max-lg:pt-22">
          <p className="text-2xl font-semibold text-gray-300 max-lg:text-center">Pro.Beyond.</p>
          <p className="text-7xl font-extralight text-white lg:text-8xl max-lg:text-center">IPhone 16 <span className="font-semibold">Pro</span></p>
          <p className="text-lg font-medium text-gray-300 max-lg:text-center">Created to change everything for the better. For everyone</p>
          <Button href='/'>Shop Now</Button>
        </div>
          <Image 
            src='/images/iphone16_1.png'
            height={615}
            width={400}
            className="hidden lg:block"
            alt='Iphone 16 Pro'
            />
            <Image 
            src='/images/iphone16_2.png'
            height={615}
            width={400}
            className="block pt-12 mx-auto lg:hidden"
            alt='Iphone 16 Pro miniature'
            />
      </section>
      <section className="min-h-150 grid grid-cols-1 lg:grid-cols-4 grid-rows-2">
        <div className="w-full flex flex-col items-center justify-center lg:justify-end lg:col-span-2 bg-white overflow-hidden relative lg:pr-12 z-10 max-lg:order-3 lg:flex-row max-lg:py-10">
          <div className="w-full h-full absolute hidden left-21 -translate-x-1/2 bottom-0 lg:block"> 
            <Image 
              src='/images/PlayStation.png'
              alt='PlayStation 5 Pro'
              fill
              className="object-contain"
            />
          </div>
          <Image 
              src='/images/PlayStation.png'
              alt='PlayStation 5 Pro'
              height={300}
              width={300}
              className="object-cover lg:hidden"
            />
          <div className="w-[80%] flex flex-col items-center gap-4 max-lg:mt-5 lg:items-start md:w-[50%]">
            <h3 className="text-4xl font-medium max-lg:text-center lg:text-5xl">Playstation 5</h3>
            <p className="p-grid max-lg:text-center">Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.</p>
          </div>
        </div>
        <div className="w-full flex flex-col-reverse items-center justify-center lg:justify-start lg:col-span-2 lg:row-span-2 bg-gray-50 overflow-hidden relative lg:pl-12 z-10 max-lg:order-4 lg:flex-row max-lg:py-10">
          <div className="w-[80%] flex flex-col items-center gap-4 lg:items-start md:w-[50%] max-lg:mt-5">
            <h3 className="text-4xl font-light lg:text-6xl">Macbook <span className="font-medium">Air</span></h3>
            <p className="p-grid">The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.</p>
            <Button href="/" variant="black">Shop Now</Button>
          </div>
          <div className="w-[90%] h-[90%] hidden absolute right-0 translate-x-1/2 lg:block"> 
            <Image 
              src='/images/MacBookAir.png'
              alt='MacBook Air'
              fill
              className="object-contain"
            />
          </div>
          <Image 
              src='/images/MacBookAir.png'
              alt='MacBook Air'
              height={300}
              width={300}
              className="object-cover lg:hidden"
            />
        </div>
        <div className="w-full flex flex-col items-center justify-center lg:justify-end lg:col-span-1 bg-gray-50 overflow-hidden relative lg:pr-12 z-10 max-lg:order-1 lg:flex-row max-lg:py-10">
          <div className="w-[90%] h-[90%] hidden absolute left-3 -translate-x-1/2 lg:block"> 
            <Image 
              src='/images/AirPods.png'
              alt='AirPods Max'
              fill
              className="object-contain"
            />
          </div>
          <Image 
              src='/images/AirPods.png'
              alt='PlayStation 5 Pro'
              height={300}
              width={300}
              className="lg:hidden"
            />
          <div className="w-[60%] flex flex-col items-center gap-4 lg:items-start max-lg:mt-5">
            <h3 className="text-4xl font-light max-lg:text-center lg:text-3xl">Apple AirPods <span className="font-medium">Max</span></h3>
            <p className="p-grid max-lg:text-center">Computational audio. Listen, it's powerful</p>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center lg:justify-end lg:col-span-1 bg-gray-600 overflow-hidden relative lg:pr-12 z-10 max-lg:order-2 lg:flex-row max-lg:py-10">
          <div className="w-[90%] h-[90%] hidden absolute -left-11 -translate-x-1/2 lg:block"> 
            <Image 
              src='/images/AppleVision.png'
              alt='Apple Vision Pro'
              fill
              className="object-contain"
            />
          </div>
          <Image 
              src='/images/AppleVision.png'
              alt='PlayStation 5 Pro'
              height={300}
              width={300}
              className="lg:hidden"
            />
          <div className="w-[60%] flex flex-col items-center gap-4 lg:items-start z-10 max-lg:mt-5">
            <h3 className="text-4xl font-light text-white max-lg:text-center lg:text-3xl">Apple Vision <span className="font-medium">Pro</span></h3>
            <p className="p-grid max-lg:text-center">An immersive way to experience entertainment</p>
          </div>
        </div>
      </section>
      <section className="px-basic bg-white-50 py-16 lg:py-20">
        <div className="w-full flex justify-between items-center">
          <p className="text-2xl font-medium">Browse By Category</p>
          <div className="flex justify-center gap-4">
            <Image src='/icon/arrow-left.png' height={32} width={32} alt="Arrow left" className="cursor-pointer"/>
            <Image src='/icon/arrow-right.png' height={32} width={32} alt="Arrow left" className="cursor-pointer"/>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 mt-12 lg:mt-8 lg:justify-between lg:flex lg:items-center">
          {browseCategory.map(item => (
            <Link 
              key={item.name} 
              href={item.url} 
              className="flex flex-col items-center p-4 bg-gray-50 rounded-2xl lg:min-w-36 max-lg:gap-2">
                <Image
                  src={item.img}
                  height={48}
                  width={48}
                  alt={item.name}/>
                <p>{item.name}</p>
            </Link>
          ))}
        </div>
      </section>
      <HotOffers />
      <section className="">
        <div className="hidden grid-cols-4 lg:grid">
          {homepageSlideOptions.map(item => (
            <div key={item.name} className="flex flex-col pb-14">
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <Button href={item.url} variant={item.variant as ButtonVariant}>Shop Now</Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
