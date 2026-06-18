'use client'
import React, { useEffect, useState } from 'react'
import { HotOffersLinks } from '../../lib/data';
import { getOffer, getProductByIdsAction } from '../../app/actions/product';
import { getFavouriteAction } from '../../app/actions/user';
import ProductCatalogCard from '../Products/ProductCatalogCard';

type HotOffersType = 'new' | 'best' | 'featured';
type ProductDataFromCard = React.ComponentProps<typeof ProductCatalogCard>['product'];

const HotOffers = () => {
  const [actualSection, setActualSection] = useState<HotOffersType>('new');
  const [favourites, setFavourites] = useState<string[]>([]);
  const [products, setProducts] = useState<ProductDataFromCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleIds = async () => {
      setIsLoading(true);
      try {  
        const productIds = await getOffer(actualSection);
        const preFavourites = await getFavouriteAction() || {};

        if(preFavourites.success && preFavourites.favourites){
          setFavourites(preFavourites.favourites);
        }

        if (!productIds.data[0] || !productIds.data[0].items) {
          setIsLoading(false);
          return;
        }

        const preProducts = await getProductByIdsAction(productIds.data[0].items);

        if (preProducts.success && preProducts.data?.length > 0) {
          setProducts(preProducts.data);
        }
      } catch(err) {
        console.error("Error loading hot offers:", err);
      } finally {
        setIsLoading(false);
      }

    }
    handleIds();
  }, [actualSection]);

  return (
    <section className='px-basic py-16'>
      <div className='flex justify-start gap-8 mb-8'>
        {HotOffersLinks.map((item, index) => (
          <button 
            key={index} 
            onClick={() => setActualSection(item.tag as HotOffersType)}
            className={`text-base font-medium leading-8 cursor-pointer ${item.tag === actualSection ? 'text-black border-b border-black' : 'text-gray-85'} md:text-lg`}>
              {item.name}
          </button>
        ))}
      </div>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {isLoading ? (
          <p className="col-span-full text-xl text-center py-12 text-gray-400 animate-pulse">
            Loading products...
          </p>
        ) :
         products && products.length > 0 ? 
            products.map((product: ProductDataFromCard) => {
              const isFavourite = product._id ? favourites.includes(product._id) : false;
              return(
                <ProductCatalogCard key={product.slug} product={product} initialIsFavourite={isFavourite}/>
            )})
          :
            <p className="col-span-full text-xl text-center py-12 text-gray-300">
              No products found matching your requests
            </p>
          }
      </div>
    </section>
  )
}

export default HotOffers;