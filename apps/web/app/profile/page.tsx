'use client'
import AddProduct from '../../components/ProfileTabs/AddProduct';
import Cart from '../../components/ProfileTabs/Cart';
import MyProducts from '../../components/ProfileTabs/MyProducts';
import { useRouter, useSearchParams } from 'next/navigation';
import Profile from '../../components/ProfileTabs/Profile';

const page = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const activeTab = searchParams.get('tab') || 'profile';

    const changeTab = (tabName: string) => {
        router.push(`/profile?tab=${tabName}`);
    };

    const renderTab = () => {
        switch (activeTab) {
        case 'profile':
            return <Profile />;
        case 'add-product':
            return <AddProduct />;
        case 'products':
            return <MyProducts />;
        case 'edit-product':
            return <Cart />;
        case 'favourite':
            return <p>Favourite</p>;
        default:
            return <h2>Default</h2>;
        }
    };
    return (
        <div className="flex min-h-screen">
            <aside className="w-64 border-r border-gray-500/90 p-4 space-y-2">
                <button 
                    onClick={() => changeTab('profile')}
                    className={`w-full text-left p-2 rounded cursor-pointer ${activeTab === 'profile' ? 'bg-black/85 text-white' : 'hover:bg-gray-100'}`}
                    >
                    Profile
                </button>
                <button 
                    onClick={() => changeTab('add-product')}
                    className={`w-full text-left p-2 rounded cursor-pointer ${activeTab === 'add-product' ? 'bg-black/85 text-white' : 'hover:bg-gray-100'}`}
                    >
                    Add Product
                </button>
                <button 
                    onClick={() => changeTab('products')}
                    className={`w-full text-left p-2 rounded cursor-pointer ${activeTab === 'products' ? 'bg-black/85 text-white' : 'hover:bg-gray-100'}`}
                    >
                    My products
                </button>
                <button 
                    onClick={() => changeTab('cart')}
                    className={`w-full text-left p-2 rounded cursor-pointer ${activeTab === 'cart' ? 'bg-black/85 text-white' : 'hover:bg-gray-100'}`}
                    >
                    Cart
                </button>
                <button 
                    onClick={() => changeTab('favourite')}
                    className={`w-full text-left p-2 rounded cursor-pointer ${activeTab === 'favourite' ? 'bg-black/85 text-white' : 'hover:bg-gray-100'}`}
                    >
                    Favourites
                </button>
            </aside>
            <main className="flex-1 p-8">
                {renderTab()}
            </main>
    </div>
  );
}

export default page;