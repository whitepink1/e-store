'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { productColors } from '../../lib/data';

interface PropsVariants {
    variants: {
        id: string;
        price: number;
        discount: number;
        finalPrice: number;
        stock: number;
        images: string[];
        color: string;
        storage?: number;
        ram?: number;
    }[],
    configuration: {
        storage: boolean;
        ram: boolean;
  };
}

const ProductConfiguration = ({variants, configuration}: PropsVariants) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const urlIndex = parseInt(searchParams.get('v') || '0', 10);
    const currentVariant = variants[urlIndex] || variants[0];
    const [selectedColor, setSelectedColor] = useState(currentVariant?.color);
    const [selectedStorage, setSelectedStorage] = useState(currentVariant?.storage || 0);
    const [selectedRam, setSelectedRam] = useState(currentVariant?.ram || 0);


    useEffect(() => {
        if (currentVariant) {
            setSelectedColor(currentVariant.color);
            setSelectedStorage(currentVariant.storage || 0);
            setSelectedRam(currentVariant.ram || 0);
        }
    }, [urlIndex, currentVariant]);
    
    const HandleColorVariant = (item: string) => {
        if (item === selectedColor) return;
        setSelectedColor(item);

        const selectedVariantIndex = variants.findIndex(v => v.color === item);

        const params = new URLSearchParams(searchParams.toString());
        params.set('v', selectedVariantIndex.toString());

        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const HandleStorageVariant = (item: number) => {
        if (item === selectedStorage) return;
        setSelectedStorage(item);

        const selectedVariantIndex = variants.findIndex(v => v.storage === item && v.color === selectedColor);

        const params = new URLSearchParams(searchParams.toString());
        params.set('v', selectedVariantIndex.toString());

        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const HandleRamVariant = (item: number) => {
        if (item === selectedRam) return;
        setSelectedRam(item);

        const selectedVariantIndex = variants.findIndex(v => v.ram === item && v.color === selectedColor && v.storage === selectedStorage);

        const params = new URLSearchParams(searchParams.toString());
        params.set('v', selectedVariantIndex.toString());

        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const uniqueColors = [...new Set(variants.map(i => i.color))];
    const uniqueStorage = [...new Set(variants.filter(v => v.color.toLowerCase() === selectedColor?.toLowerCase() && v.storage).map(v => v.storage as number))].sort((a, b) => a - b);
    
    return (
        <div className='flex flex-col gap-6'>
            <div className='flex justify-start items-center gap-3'>
                <p className='text-base leading-6 pr-2'>Selected color: </p>
                {uniqueColors.map((item, index) => {
                    const colorObj = productColors.find(c => c.name.toLowerCase() === item.toLowerCase());
                    const hexColor = colorObj ? colorObj.color : '#FFF';
                    return (<button
                        key={index}
                        onClick={() => HandleColorVariant(item)}
                        title={item}
                        style={{ backgroundColor: hexColor }}
                        className={`w-7 h-7 rounded-full transition-all hover:scale-115
                        ${selectedColor === item 
                            ? `scale-115 border-2 border-dashed ${selectedColor === 'black' ? 'border-gray-20' : 'border-black'}` 
                            : 'shadow-sm'
                        }`}
                    />)
                })}
            </div>
            {configuration.storage && 
            <div className='flex justify-start gap-4'>
                {uniqueStorage.map((storageValue, index) => {
                    return (
                        <button 
                            key={index}
                            onClick={() => HandleStorageVariant(storageValue ? storageValue : 0)}
                            className={`w-23 h-12 font-medium text-sm rounded-lg border transition-all hover:scale-105
                            ${selectedStorage === storageValue 
                                ? 'scale-105' 
                                : 'shadow-sm text-gray-15'
                            }`}>
                            {storageValue} GB
                        </button>
                    )
                })}
            </div>}
            {configuration.ram && 
                <div className='flex justify-start gap-4'>
                    {variants.filter(v => v.color.toLocaleLowerCase() === selectedColor?.toLocaleLowerCase() && v.storage === selectedStorage).map((item, index) => {
                        return (
                            <button 
                                key={index}
                                onClick={() => HandleRamVariant(item.ram ? item.ram : 0)}
                                className={`w-23 h-12 font-medium text-sm rounded-lg border transition-all hover:scale-105
                                ${selectedRam === item.ram 
                                    ? 'scale-105' 
                                    : 'shadow-sm text-gray-15'
                                }`}>
                                {item.ram} GB
                            </button>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default ProductConfiguration