'use client'
import React, { useState } from 'react';
import AddProduct from '../../components/ProfileTabs/AddProduct';
import EditProduct from '../../components/ProfileTabs/EditProduct';
import MyProducts from '../../components/ProfileTabs/MyProducts';

const page = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const renderTab = () => {
        switch (activeTab) {
        case 'profile':
            return <h1>Profile</h1>;
        case 'add-product':
            return <AddProduct />;
        case 'edit-product':
            return <EditProduct />;
        case 'products':
            return <MyProducts />;
        default:
            return <h2>Default</h2>;
        }
    };
    return (
        <div className="flex min-h-screen">
            <aside className="w-64 border-r border-gray-500/90 p-4 space-y-2">
                <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left p-2 rounded cursor-pointer ${activeTab === 'profile' ? 'bg-black/85 text-white' : 'hover:bg-gray-100'}`}
                >
                Profile
                </button>
                <button 
                onClick={() => setActiveTab('add-product')}
                className={`w-full text-left p-2 rounded cursor-pointer ${activeTab === 'add-product' ? 'bg-black/85 text-white' : 'hover:bg-gray-100'}`}
                >
                Add Product
                </button>
                <button 
                onClick={() => setActiveTab('edit-product')}
                className={`w-full text-left p-2 rounded cursor-pointer ${activeTab === 'edit-product' ? 'bg-black/85 text-white' : 'hover:bg-gray-100'}`}
                >
                Edit Product
                </button>
                <button 
                onClick={() => setActiveTab('products')}
                className={`w-full text-left p-2 rounded cursor-pointer ${activeTab === 'products' ? 'bg-black/85 text-white' : 'hover:bg-gray-100'}`}
                >
                My products
                </button>
            </aside>
            <main className="flex-1 p-8">
                {renderTab()}
            </main>
    </div>
  );
}

export default page;