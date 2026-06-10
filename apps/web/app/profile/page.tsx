'use client'
import AddProduct from '../../components/ProfileTabs/AddProduct';
import Cart from '../../components/ProfileTabs/Cart';
import MyProducts from '../../components/ProfileTabs/MyProducts';
import { useRouter, useSearchParams } from 'next/navigation';
import Profile from '../../components/ProfileTabs/Profile';
import Favourite from '../../components/ProfileTabs/Favourite';
import { profileTabs } from '../../lib/data';
import Orders from '../../components/ProfileTabs/Orders';

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
        case 'cart':
            return <Cart />;
        case 'favourite':
            return <Favourite />;
        case 'order':
            return <Orders />;
        default:
            return <h2>Wrong Tab</h2>;
        }
    };
    return (
        <div className="flex flex-col min-h-screen lg:flex-row">
            <aside className="border-r border-gray-500/90 p-4 space-y-2 max-lg:grid max-sm:grid-cols-4 max-lg:grid-cols-5 max-lg:gap-3 lg:w-64">
                {profileTabs.map(item => (
                    <button 
                        key={item.tabTag}
                        onClick={() => changeTab(item.tabTag)}
                        className={`w-full text-center p-2 rounded cursor-pointer lg:text-left ${activeTab === item.tabTag ? 'bg-black/85 text-white' : 'hover:bg-gray-100'}`}
                        >
                        {item.name}
                    </button>
                ))}
            </aside>
            <main className="flex-1 p-8">
                {renderTab()}
            </main>
    </div>
  );
}

export default page;