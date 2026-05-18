'use server'
import React from 'react'
import { catalogFilter } from '../../../lib/data'
import { CATEGORY_BRANDS } from '../../../lib/validations/product';
import { FilterGroup } from '../../../components/shared/FilterGroup';
import { getProductsAction } from '../../actions/product';
import CatalogHeader from '../../../components/Products/CatalogHeader';

interface CatalogPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const CatalogPage = async ({params, searchParams} : CatalogPageProps) => {
  const { category } = await params;
  const currentSearchParams = await searchParams;
  const response = await getProductsAction();
  console.log(response);
  const currentFilter = catalogFilter[category];
  const brandFields = CATEGORY_BRANDS[category as keyof typeof CATEGORY_BRANDS] 
  ? [...CATEGORY_BRANDS[category as keyof typeof CATEGORY_BRANDS]] 
  : [];
  const currentBrands = {
    name: 'Brand',
    type: 'brand',
    fields: brandFields
  };
  return (
    <div className='flex gap-8'>
      <section className='w-64 flex flex-col items-start gap-6 mb-40'>
        <FilterGroup item={currentBrands} open={true} />
        {currentFilter && currentFilter.map((item, index) => (
          <FilterGroup key={index} item={item} open={false}/>
        ))}
      </section>
      <main>
        <CatalogHeader total={response.data?.totalItems || 0}/>
      </main>
    </div>
  )
}

export default CatalogPage;