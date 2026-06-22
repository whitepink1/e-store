import { getOffer, getProductByIdsAction } from '../../app/actions/product';
import { getFavouriteAction } from '../../app/actions/user';
import ProductCatalogCard from '../Products/ProductCatalogCard';

type ProductDataFromCard = React.ComponentProps<typeof ProductCatalogCard>['product'];

const Discounts = async () => {
    const productIds = await getOffer('discount');
    const favResults = await getFavouriteAction() || {};

    const favourites: string[] = favResults.success && favResults.favourites ? favResults.favourites : [];

    const itemsIds = productIds?.data?.[0]?.items || [];
    const products = itemsIds.length > 0 ? await getProductByIdsAction(itemsIds) : { data: [] };

    return (
        <div className='my-20 px-basic'>
            <p className='text-2xl font-medium leading-8 mb-8'>Discounts up to -50%</p>
            <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
                {products.data && products.data?.length > 0 ? 
                    products.data.map((product: ProductDataFromCard) => {
                    const isFavourite = product._id ? favourites.includes(product._id) : false;
                    return(
                        <ProductCatalogCard sale={true} key={product.slug} product={product} initialIsFavourite={isFavourite}/>
                    )})
                :
                    <p className="col-span-full text-xl text-center py-12 text-gray-300">
                    No products found with discounts
                    </p>}
            </div>
        </div>
    )
}

export default Discounts