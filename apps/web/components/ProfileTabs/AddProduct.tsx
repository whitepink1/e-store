'use client'
import { useFieldArray, useForm, get } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProductSchema, CATEGORIES, CATEGORY_BRANDS } from '../../lib/validations/product';
import Image from 'next/image';
import slugify from 'slugify';
import { getPublicIdFromUrl } from '../../utils/getPublicId';

const AddProduct = () => {
    const { register, handleSubmit, watch, control, formState: { errors } } = useForm({
        resolver: zodResolver(ProductSchema),
        mode: "onTouched",
        defaultValues: { 
            category: 'smartphones',
            specifications: [],
            variants: []
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "specifications"
    });
    const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({
        control,
        name: "variants"
    });
    const selectedCategory = watch('category');

    const SpecItems = ({ groupIndex, control, register }: any) => {
        const { fields, append, remove } = useFieldArray({
            control,
            name: `specifications.${groupIndex}.specs`
        });

        return (
            <div className="ml-8 space-y-2">
                {fields.map((field, specIndex) => (
                    <div key={field.id} className="flex gap-2 items-center">
                    <input
                        {...register(`specifications.${groupIndex}.specs.${specIndex}.name`)}
                        placeholder="Spec name"
                        className={`border p-1 text-sm flex-1 ${get(errors, `specifications.${groupIndex}.specs.${specIndex}.name`) && 'error-input'}`}
                    />
                    <input
                        {...register(`specifications.${groupIndex}.specs.${specIndex}.value`)}
                        placeholder="Spec value"
                        className={`border p-1 text-sm flex-1 ${get(errors, `specifications.${groupIndex}.specs.${specIndex}.value`) && 'error-input'}`}
                    />
                    <button 
                        type="button" 
                        onClick={() => remove(specIndex)}
                        className="text-red-400/75 hover:text-red-600/75 px-2 cursor-pointer"
                    >
                        ✕
                    </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => append({ name: '', value: '' })}
                    className="text-base bg-black/85 text-white hover:bg-black/75 px-4 py-1 rounded cursor-pointer"
                >
                    Add Spec
                </button>
            </div>
        );
    };

    const VariantImages = ({ variantIndex, control, register, setValue }: any) => {
        const { fields, append, remove } = useFieldArray({
            control,
            name: `variants.${variantIndex}.images`
        });

        const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (!files || files.length === 0) return;

            const file = files[0];
            const formData = new FormData();

            if (!file) return;
            formData.append('file', file);
            formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');

            formData.append('folder', 'e-store');

            try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            
            if (data.secure_url) {
                append(data.secure_url); 
            }
            } catch (error) {
            console.error("Ошибка загрузки в Cloudinary:", error);
            }
        };

        const handleDeleteImage = async (imgIndex: number, imageUrl: string) => {
            const publicId = getPublicIdFromUrl(imageUrl);

            try {
                const response = await fetch('/api/cloudinary/delete', {
                    method: 'POST',
                    body: JSON.stringify({ publicId }),
                });

                if (response.ok) {
                    remove(imgIndex);
                } else {
                    console.error("Cloudinary delete failed");
                }
            } catch (error) {
                console.error("Error during deletion:", error);
            }
        };

        return (
            <div className='mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100'>
                <p className="text-xs font-bold mb-3 uppercase text-gray-400">Images:</p>
                
                <div className="flex flex-wrap gap-3">
                    {fields.map((field, imgIndex) => {
                    const imageUrl = watch(`variants.${variantIndex}.images.${imgIndex}`);
                    
                    return (
                        <div key={field.id} className="relative w-34 h-34 group">
                        <Image 
                            src={imageUrl} 
                            fill
                            className="object-cover rounded-lg border-2 border-white shadow-sm"
                            alt="Preview"
                        />
                        <button
                            type="button"
                            onClick={() => handleDeleteImage(imgIndex, imageUrl)}
                            className="absolute -top-2 -right-2 bg-red-500/75 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md cursor-pointer"
                        >
                            ✕
                        </button>
                        <input type="hidden" {...register(`variants.${variantIndex}.images.${imgIndex}`)} />
                        </div>
                    );
                    })}

                    <label className={`w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all ${get(errors, `variants.${variantIndex}.images`) && 'error-input'}`}>
                        <span className="text-2xl text-gray-400">+</span>
                        <span className="text-[10px] font-bold text-gray-400">UPLOAD</span>
                        <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*" 
                            onChange={handleFileUpload} 
                        />
                    </label>
                </div>
            </div>
        );
    };

    const onInvalid = (errors: any) => {
        console.error("Errors:", errors);
    };

    const onSubmit = async (data: any) => {
        const finalData = {
            ...data,
            slug: slugify(data.title, { lower: true, strict: true, locale: 'en' })
        };
        console.log("Data:", finalData);
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="w-full flex flex-col gap-3 p-6 rounded-lg shadow">
            <label id='categories' className="w-auto block">
                <span className='font-semibold'>Choose category of product</span>
                <select {...register('category')} className="block w-full mt-1 border p-2">
                {CATEGORIES.map(item => (
                    <option key={item} value={item}>
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                    </option>
                ))}
                </select>
            </label>
            <div id='filters' className="">
                <h3 className="font-semibold mb-2">Filter details</h3>
                {selectedCategory === 'smartphones' && (
                <div className="grid grid-cols-3 gap-4">
                    <input {...register('filterAttributes.battery_capacity', { valueAsNumber: true })} 
                        placeholder="Battery Capacity" 
                        type='number' 
                        className={`border p-2 ${(errors.filterAttributes as any)?.battery_capacity && 'border-red-500/75'}`} />
                    <input {...register('filterAttributes.screen_type')} 
                        placeholder="Screen Type" 
                        className={`border p-2 ${(errors.filterAttributes as any)?.screen_type && 'border-red-500/75'}`}/>
                    <input {...register('filterAttributes.protection_class')} 
                        placeholder="Screen Protection Class" 
                        className={`border p-2 ${(errors.filterAttributes as any)?.protection_class && 'border-red-500/75'}`}/>
                </div>
                )}
                {selectedCategory === 'smartwatches' && (
                <div className="grid grid-cols-3 gap-4">
                    <input {...register('filterAttributes.case_size')} 
                        placeholder="Case size" 
                        className={`border p-2 ${(errors.filterAttributes as any)?.case_size && 'border-red-500/75'}`}/>
                    <input {...register('filterAttributes.display_type')} 
                        placeholder="Display type" 
                        className={`border p-2 ${(errors.filterAttributes as any)?.display_type && 'border-red-500/75'}`}/>
                    <input {...register('filterAttributes.strap_material')} 
                        placeholder="Strap Material" 
                        className={`border p-2 ${(errors.filterAttributes as any)?.strap_material && 'border-red-500/75'}`}/>
                </div>
                )}
                {selectedCategory === 'cameras' && (
                <div className="grid grid-cols-3 gap-4">
                    <input {...register('filterAttributes.sensor_type')} 
                        placeholder="Sensor Type" 
                        className={`border p-2 ${(errors.filterAttributes as any)?.sensor_type && 'border-red-500/75'}`}/>
                    <input {...register('filterAttributes.effective_pixels')} 
                        placeholder="Effective Pixels" 
                        className={`border p-2 ${(errors.filterAttributes as any)?.effective_pixels && 'border-red-500/75'}`}/>
                    <input {...register('filterAttributes.video_resolution')} 
                        placeholder="Video Resolution" 
                        className={`border p-2 ${(errors.filterAttributes as any)?.video_resolution && 'border-red-500/75'}`}/>
                </div>
                )}
                {selectedCategory === 'headphones' && (
                <div className="grid grid-cols-3 gap-4">
                    <input {...register('filterAttributes.headphone_type')} 
                        placeholder="Headphone Type" 
                        className={`border p-2 ${(errors.filterAttributes as any)?.headphone_type && 'border-red-500/75'}`}/>
                    <input {...register('filterAttributes.connection_type')} 
                        placeholder="Connection Type" 
                        className={`border p-2 ${(errors.filterAttributes as any)?.connection_type && 'border-red-500/75'}`}/>
                    <input {...register('filterAttributes.microphone')} 
                        placeholder="Microphone" 
                        className={`border p-2 ${(errors.filterAttributes as any)?.microphone && 'border-red-500/75'}`}/>
                </div>
                )}
                {selectedCategory === 'computers' && (
                <div className="grid grid-cols-3 gap-4">
                    <input {...register('filterAttributes.processor')} 
                        placeholder="Processor" 
                        className={`border p-2 ${(errors.filterAttributes as any)?.processor && 'border-red-500/75'}`}/>
                    <input {...register('filterAttributes.screen_diagonal', { valueAsNumber: true })} 
                        placeholder="Screen Diagonal" 
                        type='number' 
                        className={`border p-2 ${(errors.filterAttributes as any)?.screen_diagonal && 'border-red-500/75'}`}/>
                    <input {...register('filterAttributes.ram_size', { valueAsNumber: true })} 
                        placeholder="Ram Size"
                        type='number' 
                        className={`border p-2 ${(errors.filterAttributes as any)?.ram_size && 'border-red-500/75'}`}/>
                </div>
                )}
                {selectedCategory === 'gaming' && (
                <div className="grid grid-cols-3 gap-4">
                    <input {...register('filterAttributes.max_resolution')} 
                        placeholder="Max Resolution" 
                        className={`border p-2 ${(errors.filterAttributes as any)?.max_resolution && 'border-red-500/75'}`}/>
                    <input {...register('filterAttributes.drive_type')} 
                        placeholder="Drive Type" 
                        className={`border p-2 ${(errors.filterAttributes as any)?.drive_type && 'border-red-500/75'}`}/>
                    <input {...register('filterAttributes.controller')} 
                        placeholder="Controller" 
                        className={`border p-2 ${(errors.filterAttributes as any)?.controller && 'border-red-500/75'}`}/>
                </div>
                )}
            </div>
            <div id='title'>
                <label className='font-semibold'>Title</label>
                <input {...register('title')} 
                    className={`w-full border p-2 mt-1 ${errors.title && 'error-input'}`}
                    placeholder="Product name" />
            </div>
            <div id='brand'>
                <label className='font-semibold'>Brand</label>
                <select {...register('brand')} className="w-full border p-2 mt-1">
                    {CATEGORY_BRANDS[selectedCategory].map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                    ))}
                </select>
            </div>
            <div id='specifications' className="space-y-6 pt-4">
                <h3 className="font-semibold text-lg">Description Specifications</h3>
                {fields.map((item, index) => (
                    <div key={item.id} className="p-4 border rounded-lg bg-white shadow-sm space-y-4">
                        <div className="flex gap-4 items-center">
                            <input
                                {...register(`specifications.${index}.groupName`)}
                                placeholder="Group name"
                                className="font-bold border-b p-1 flex-1 focus:border-black outline-none"
                            />
                            <button 
                                type="button" 
                                onClick={() => remove(index)}
                                className="text-red-500/75 text-sm border border-red-500/75 px-2 py-1 rounded hover:bg-red-50 cursor-pointer"
                            >
                                Delete group
                            </button>
                        </div>
                        <SpecItems 
                            groupIndex={index} 
                            control={control} 
                            register={register} 
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => append({ groupName: '', specs: [] })}
                    className={`w-full py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-black transition-colors cursor-pointerw-full p-2 mt-1 ${errors.title && 'border-red-500/75 text-red-500/75'}`}
                >
                    + Add new group
                </button>
            </div>
            <div id='variants' className="space-y-6">
                <div className="flex justify-between items-center pt-6">
                    <h3 className="text-xl font-semibold">Variants (Color & Configuration)</h3>
                    <button
                        type="button"
                        onClick={() => appendVariant({
                            id: crypto.randomUUID(),
                            price: 0,
                            discount: 0,
                            finalPrice: 0,
                            stock: 0,
                            color: '',
                            images: [],
                        })}
                        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        + Add variant
                    </button>
                </div>

                {variantFields.map((variant, index) => {
                    const price = watch(`variants.${index}.price`) || 0;
                    const discount = watch(`variants.${index}.discount`) || 0;
                    const calculatedFinalPrice = Math.round(price - (price * (discount / 100)));
                    return (
                    <div key={variant.id} className="p-6 border-2 border-gray-100 rounded-2xl relative bg-white hover:border-gray-200 transition-all">
                        <button
                            type="button"
                            onClick={() => removeVariant(index)}
                            className="absolute top-2 right-2 text-red-500/75 text-sm border border-red-500/75 px-2 py-1 rounded-lg hover:bg-red-50 cursor-pointer"
                        >
                        Delete
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-gray-500">ID</label>
                                <input {...register(`variants.${index}.id`)} 
                                    readOnly 
                                    className="w-full border p-2 rounded" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-gray-500">Color</label>
                                <input {...register(`variants.${index}.color`)} 
                                    className={`w-full border p-2 rounded ${get(errors, `variants.${index}.color`) && 'error-input'} `} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-gray-500">Stock</label>
                                <input type="number" {...register(`variants.${index}.stock`, { valueAsNumber: true })} 
                                    className={`w-full border p-2 rounded ${get(errors, `variants.${index}.stock`) && 'error-input'} `} />
                            </div>


                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-gray-500">Basic Price (USD)</label>
                                <input type="number" {...register(`variants.${index}.price`, { valueAsNumber: true })} 
                                    className={`w-full border p-2 rounded ${get(errors, `variants.${index}.price`) && 'error-input'} `} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-gray-500">Discount (%)</label>
                                <input type="number" {...register(`variants.${index}.discount`, { valueAsNumber: true })} 
                                    className={`w-full border p-2 rounded ${get(errors, `variants.${index}.discount`) && 'error-input'} `} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-gray-500">Final Price (USD)</label>
                                <input type="number" {...register(`variants.${index}.finalPrice`, { valueAsNumber: true })} 
                                    value={calculatedFinalPrice} 
                                    readOnly 
                                    className="w-full border p-2 rounded bg-green-50 font-bold text-green-700 outline-none"/>
                            </div>
                            {(selectedCategory === 'smartphones' || selectedCategory === 'smartwatches' || selectedCategory === 'gaming') && (
                                <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-gray-500">Storage (GB)</label>
                                <input 
                                    type="number" 
                                    {...register(`variants.${index}.storage`, { valueAsNumber: true })} 
                                    className={`w-full border p-2 rounded ${get(errors, `variants.${index}.storage`) && 'error-input'} `} 
                                    placeholder="256"
                                />
                                </div>
                            )}
                            {(selectedCategory === 'computers') && (
                                <>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase text-gray-500">Storage (GB)</label>
                                        <input 
                                            type="number" 
                                            {...register(`variants.${index}.storage`, { valueAsNumber: true })} 
                                            className={`w-full border p-2 rounded ${get(errors, `variants.${index}.storage`) && 'error-input'} `} 
                                            placeholder="256"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase text-gray-500">RAM (GB)</label>
                                        <input 
                                            type="number" 
                                            {...register(`variants.${index}.ram`, { valueAsNumber: true })} 
                                            className={`w-full border p-2 rounded ${get(errors, `variants.${index}.ram`) && 'error-input'} `} 
                                            placeholder="16"
                                        />
                                    </div>
                                </>
                            )}
                            <div className='col-span-3'>
                                <VariantImages 
                                    variantIndex={index} 
                                    control={control} 
                                    register={register} 
                                    />
                            </div>    
                        </div>
                    </div>)}
                )}
            </div>
            <div id='short-description'>
                <label className='font-semibold'>Short Description</label>
                <textarea {...register('shortDescription')} 
                    className={`w-full border p-2 mt-1 ${errors.shortDescription && 'error-input'}`} 
                    placeholder="Short Description" />
            </div>
            <div id='full-description'>
                <label className='font-semibold'>Main Description</label>
                <textarea {...register('mainDescription')} 
                    className={`w-full border p-2 mt-1 ${errors.mainDescription && 'error-input'}`} 
                    placeholder="Main Description" />
            </div>
            <button
                type="submit"
                className="w-full py-4 bg-green-600/85 text-white font-bold rounded-xl shadow-green-200 shadow-lg hover:bg-green-700/85 transition-all"
            >
                Create product
            </button>
    </form>
    )
}

export default AddProduct;