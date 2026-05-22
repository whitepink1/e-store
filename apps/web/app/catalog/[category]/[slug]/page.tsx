import React from 'react'
import { getProductBySlugAction } from '../../../actions/product';
import Image from 'next/image';
import { Product } from '../../../../lib/validations/product';
import { notFound } from 'next/navigation';
import ProductConfiguration from '../../../../components/Products/ProductConfiguration';
import { catalogFilter, deliveryDetailed } from '../../../../lib/data';
import Button from '../../../../components/shared/Button';
import ProductSpecification from '../../../../components/Products/ProductSpecification';
import RatingComponent from '../../../../components/Products/RatingComponent';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const page = async ({ params, searchParams }: PageProps) => {
  const { slug } = await params;
  const currentSearchParams = await searchParams;
  const variantIndex = Number(currentSearchParams.v);
  console.log('variant' + variantIndex);
  const response = await getProductBySlugAction(slug);
  if (!response?.success || !response.data) {
    notFound();
  }
  
  const product: Product = response.data;
  const configuration = {
    ram: product.variants.some(variant => 'ram' in variant),
    storage: product.variants.some(variant => 'storage' in variant),
  };
  const selectedVariant = (variantIndex >= 0 && variantIndex < product.variants.length) 
  ? product.variants[variantIndex] 
  : product.variants[0];
  return (
    <div>
      <section className='w-full flex justify-center gap-20 lg:gap-40 max-lg:mt-10 max-md:flex-col max-md:items-center'>
        <div className='relative w-100 h-125 max-sm:w-[90%]'>
          <Image
            src={selectedVariant?.images[0] || ''}
            fill
            alt={product.title +  ' ' + selectedVariant?.color}
            className='object-contain max-lg:my-auto'/>
        </div>
        <div className='flex flex-col items-start gap-4 max-md:p-3 max-md:w-full'>
          <h1 className='text-[40px] font-bold'>{product.title}</h1>
          <div className='w-102 flex justify-between items-center max-md:w-full'>
            <p className='flex items-center font-medium text-[32px]'>${selectedVariant?.finalPrice} 
              <span className='font-normal text-2xl text-gray-30 line-through pl-3'>{selectedVariant?.discount ? `$${selectedVariant?.price}` : ''}</span>
            </p>
            <p className='text-lg leading-4 text-gray-55 font-medium'>Stock: 
              <span className='font-semibold text-black pl-2'>{selectedVariant?.stock}</span>
            </p>
          </div>
          <ProductConfiguration variants={product.variants} configuration={configuration}/>
          <div className='w-100 flex justify-between lg:w-120 max-md:w-full max-sm:gap-1'>
            {Object.entries(product.filterAttributes).map(([key, value]) => {
              const currentCategoryFilters = catalogFilter[product.category as keyof typeof catalogFilter];
              const filterInfo = currentCategoryFilters?.find(item => item.type === key);
              const displayName = filterInfo ? filterInfo.name : key.replace('_', ' ');
              return (
                <div key={key} className='flex flex-col items-center bg-gray-25 rounded-lg py-2 px-4 gap-1'>
                  <p className='text-sm leading-4 text-gray-35 max-sm:text-center'>{displayName}</p>
                  <p className='text-sm leading-4 text-gray-55 font-medium'>{value}</p>
                </div>
            )})}
          </div>
          <p className='w-100 text-sm text-gray-20 lg:w-120 max-md:w-full'>{product.shortDescription.length < 200 ? product.shortDescription : product.shortDescription.slice(0, 200) + '...'}</p>
          <div className='w-100 flex justify-between my-2 lg:w-120 max-md:w-full max-sm:flex-col max-sm:gap-3'>
            <Button href='' variant='black' className='lg:w-56 max-md:w-[45%] max-sm:w-full'>Add to Wishlist</Button>
            <Button href='' variant='blackFill' className={`lg:w-56 max-md:w-[45%] max-sm:w-full ${selectedVariant && selectedVariant.stock < 1 ? 'disabled bg-gray-20/75 hover:bg-gray-20/70' : ''}`}>Add to Cart</Button>
          </div>
          <div className='w-full grid grid-cols-2 flex-wrap gap-7 max-md:flex max-md:justify-between lg:flex'>
            {deliveryDetailed.map(item => (
              <div key={item.name} className='flex gap-4'>
                <div className='w-14 h-14 flex items-center justify-center bg-white-100 rounded-xl'>
                  <Image
                    src={item.img}
                    height={24}
                    width={24}
                    alt={item.name}/>
                </div>
                <div className='flex flex-col items-start'>
                  <p className='text-sm font-medium text-gray-60 leading-6'>{item.name}</p>
                  <p className='text-sm font-medium text-black leading-6'>{`${selectedVariant && item.name === 'In Stock' && selectedVariant.stock < 1 ? 'Lacking' : item.text}`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </section>
      <section className='my-10 lg:my-20'>
        <h3 className='text-2xl font-medium leading-8'>Details</h3>
        <p className='text-sm text-gray-65 font-medium my-8'>{product.mainDescription}</p>
        <ProductSpecification specifications={product.specifications}/>
      </section>
      <RatingComponent />
    </div>
  )
}

export default page