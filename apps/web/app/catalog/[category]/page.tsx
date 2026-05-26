'use server'
import React, { Suspense } from 'react'
import { catalogFilter } from '../../../lib/data'
import { CATEGORY_BRANDS } from '../../../lib/validations/product';
import { FilterGroup } from '../../../components/shared/FilterGroup';
import { getProductsAction } from '../../actions/product';
import CatalogHeader from '../../../components/Products/CatalogHeader';
import ProductCatalogCard from '../../../components/Products/ProductCatalogCard';
import ProductCatalogCardSkeleton from '../../../components/Products/ProductCatalogCardSkeleton';
import { getFavouriteAction } from '../../actions/user';

interface CatalogPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

type ProductDataFromCard = React.ComponentProps<typeof ProductCatalogCard>['product'];

const AsyncProductsGrid = async ({ category, filters }: { category: string, filters: any }) => {
  const response = await getProductsAction({ category, filters });
  const { favourites = [] } = await getFavouriteAction() || {};

  return (
    <>
      <CatalogHeader total={response.data?.totalItems || 0} order={filters.order}/>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-6 mt-6'>
        {response.data?.products && response.data.products.length > 0 ? 
          response.data.products.map((product: ProductDataFromCard) => {
            const isFavourite = favourites ? favourites.includes(product._id) : false;
            return(
              <ProductCatalogCard key={product.slug} product={product} initialIsFavourite={isFavourite}/>
          )})
        :
          <p className="col-span-full text-xl text-center py-12 text-gray-300">
            No products found matching your filters
          </p>
        }
      </div>
    </>
  );
};

const GridSkeleton = () => (
  <div className="w-full flex flex-col gap-4">
    <div className="w-full flex justify-between animate-pulse"><div className="h-6 bg-gray-200/75 w-32 rounded"></div><div className="h-10 bg-gray-200/75 w-64 rounded"></div></div>
    <div className='grid grid-cols-3 gap-4'>
      {Array.from({ length: 6 }).map((_, i) => <ProductCatalogCardSkeleton key={i} />)}
    </div>
  </div>
);

const CatalogPage = async ({params, searchParams} : CatalogPageProps) => {
  const { category } = await params;
  const currentSearchParams = await searchParams;
  const response = await getProductsAction({
    category,
    filters: currentSearchParams
  });
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
    <div className='flex gap-8 mb-20 max-lg:mt-10'>
      <section className='w-64 flex flex-col items-start gap-6 mb-40'>
        <FilterGroup item={currentBrands} open={true} />
        {currentFilter && currentFilter.map((item, index) => (
          <FilterGroup key={index} item={item} open={false}/>
        ))}
      </section>
      <main className='w-full grow min-w-0'>
        <Suspense key={JSON.stringify(currentSearchParams)} fallback={<GridSkeleton />}>
          <AsyncProductsGrid category={category} filters={currentSearchParams} />
        </Suspense>
      </main>
    </div>
  )
}

export default CatalogPage;