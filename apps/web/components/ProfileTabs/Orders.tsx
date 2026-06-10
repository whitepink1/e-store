'use client'

import { useEffect, useState } from "react";
import { OrderInputProps } from "../../lib/validations/order";
import { getOrdersAction } from "../../app/actions/user";

const Orders = () => {
    const [orders, setOrders] = useState<OrderInputProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
            const fetchFavourites = async () => {
                try {
                    setIsLoading(true);
                    const response = await getOrdersAction();
        
                    if (response.success && response.orders) {
                        setOrders(response.orders);
                        console.log('Orders: ', response.orders);
                    } else {
                        throw new Error(response.message || "Didn't found any order.");
                    }
                } catch (err) {
                    console.log(err)
                } finally {
                    setIsLoading(false);
                }
            };
        
            fetchFavourites();
    }, []);
    return (
        <div>{isLoading 
        ?
            <p>Loading...</p>
        :
            <div>
                {orders.length > 0 ? 
                    <div className="flex flex-col">
                        {orders.map((order, index) => (
                            <div key={index} className="w-full flex justify-between items-center bg-white-100 rounded-xl p-4">
                                <p className="text-base font-medium leading-4 text-gray-70"><span className="text-xl font-bold">#</span>{order._id?.slice(0,7)}...</p>
                                <p className="text-sm font-medium leading-4 text-gray-70 max-lg:hidden">Total products: {order.products.length}</p>
                                <p className="text-sm font-medium leading-4 text-gray-70">{order.status}</p>
                                <p className="text-sm font-medium leading-4 text-gray-70">{(order.createdAt)?.slice(0, 10)}</p>
                                <p className="text-sm font-medium leading-4 text-gray-70">${order.totalPrice}</p>
                            </div>
                        ))}
                    </div>
                :
                <p>Still Empty...</p>}
            </div>
        }</div>
    )
}

export default Orders