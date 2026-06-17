'use server'
import React, { Suspense } from 'react'
import { catalogFilter } from '../../../lib/data'
import { CATEGORY_BRANDS } from '../../../lib/validations/product';
import { getProductsAction } from '../../actions/product';
import CatalogHeader from '../../../components/Products/CatalogHeader';
import ProductCatalogCard from '../../../components/Products/ProductCatalogCard';
import ProductCatalogCardSkeleton from '../../../components/Products/ProductCatalogCardSkeleton';
import { getFavouriteAction } from '../../actions/user';
import Pagination from '../../../components/Products/Pagination';
import FilterComponent from '../../../components/shared/FilterComponent';

interface CatalogPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

type ProductDataFromCard = React.ComponentProps<typeof ProductCatalogCard>['product'];

const AsyncProductsGrid = async ({ category, filters }: { category: string, filters: any }) => {
  const response = await getProductsAction({ category, filters });
  const { favourites = [] } = await getFavouriteAction() || {};
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
    <>
      <CatalogHeader order={filters.order}>
        <p className='hidden font-medium text-base text-gray-20/85 md:block'>Selected Products: 
          <span className='text-[20px] text-black'> {response.data?.totalItems || 0}</span>
        </p>
        <FilterComponent
          mobile={true}
          currentBrands={currentBrands}
          openBrands={true}
          openFilters={false}
          currentFilter={currentFilter}/>
      </CatalogHeader>
      <div className='w-full grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-6 mt-6'>
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
      <Pagination 
        totalItems={response.data?.totalItems} 
        currentPage={response.data?.currentPage}
        hasNextPage={response.data?.hasNextPage}
        totalPages={response.data?.totalPages}
        perPage={response.data?.perPage}
        />
    </>
  );
};

const GridSkeleton = () => (
  <div className="w-full flex flex-col gap-4">
    <div className="w-full flex justify-between animate-pulse max-md:gap-4">
      <div className="h-10 bg-gray-200/75 w-64 rounded md:h-6 md:w-32"></div>
      <div className="h-10 bg-gray-200/75 w-64 rounded"></div>
    </div>
    <div className='w-full grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-6 mt-6'>
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
      <FilterComponent
        currentBrands={currentBrands}
        openBrands={true}
        openFilters={false}
        currentFilter={currentFilter}/>
      <main className='w-full grow min-w-0'>
        <Suspense key={JSON.stringify(currentSearchParams)} fallback={<GridSkeleton />}>
          <AsyncProductsGrid category={category} filters={currentSearchParams} />
        </Suspense>
      </main>
    </div>
  )
}

export default CatalogPage;