import React from 'react'
import { getProductBySlugAction } from '../../../actions/product';
import Image from 'next/image';
import { Product } from '../../../../lib/validations/product';
import { notFound } from 'next/navigation';
import ProductConfiguration from '../../../../components/Products/ProductConfiguration';
import { catalogFilter } from '../../../../lib/data';
import Button from '../../../../components/shared/Button';

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
      <section className='flex justify-start gap-40'>
        <div className='relative w-100 h-125'>
          <Image
            src={selectedVariant?.images[0] || ''}
            fill
            alt={product.title +  ' ' + selectedVariant?.color}/>
        </div>
        <div className='flex flex-col items-start grow gap-4'>
          <h1 className='text-[40px] font-bold'>{product.title}</h1>
          <div className='w-102 flex justify-between items-center '>
            <p className='flex items-center font-medium text-[32px]'>${selectedVariant?.finalPrice} 
              <span className='font-normal text-2xl text-gray-30 line-through pl-3'>{selectedVariant?.discount ? `$${selectedVariant?.price}` : ''}</span>
            </p>
            <p className='text-lg leading-4 text-gray-55 font-medium'>Stock: 
              <span className='font-semibold text-black pl-2'>{selectedVariant?.stock}</span>
            </p>
          </div>
          <ProductConfiguration variants={product.variants} configuration={configuration}/>
          <div className='flex justify-start gap-4'>
            {Object.entries(product.filterAttributes).map(([key, value]) => {
              const currentCategoryFilters = catalogFilter[product.category as keyof typeof catalogFilter];
              const filterInfo = currentCategoryFilters?.find(item => item.type === key);
              const displayName = filterInfo ? filterInfo.name : key.replace('_', ' ');
              return (
                <div key={key} className='flex flex-col items-center bg-gray-25 rounded-lg py-2 px-4 gap-1'>
                  <p className='text-sm leading-4 text-gray-35'>{displayName}</p>
                  <p className='text-sm leading-4 text-gray-55 font-medium'>{value}</p>
                </div>
            )})}
          </div>
          <p className='w-102 text-sm text-gray-20'>{product.shortDescription.length < 150 ? product.shortDescription : product.shortDescription.slice(0, 150) + '...'}</p>
          <div className='flex gap-2 my-2'>
            <Button href='' variant='black'>Add to Wishlist</Button>
            <Button href='' variant='blackFill' className={`${selectedVariant && selectedVariant.stock < 1 ? 'disabled bg-gray-20/75 hover:bg-gray-20/70' : ''}`}>Add to Card</Button>
          </div>
        </div>
        
      </section>
      
    </div>
  )
}

export default page