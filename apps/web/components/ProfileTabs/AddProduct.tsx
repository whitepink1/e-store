'use client'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProductSchema, CATEGORIES, CATEGORY_BRANDS } from '../../lib/validations/product';

const AddProduct = () => {
    const { register, handleSubmit, watch, control, formState: { errors } } = useForm({
        resolver: zodResolver(ProductSchema),
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
                        className="border p-1 text-sm flex-1"
                    />
                    <input
                        {...register(`specifications.${groupIndex}.specs.${specIndex}.value`)}
                        placeholder="Spec value"
                        className="border p-1 text-sm flex-1"
                    />
                    <button 
                        type="button" 
                        onClick={() => remove(specIndex)}
                        className="text-red-400 hover:text-red-600 px-2 cursor-pointer"
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
                    Add spec
                </button>
            </div>
        );
    };
    
    return (
        <form className="w-full flex flex-col gap-3 p-6 rounded-lg shadow">
            <label id='categories' className="w-auto block mb-4">
                <span>Choose category of product</span>
                <select {...register('category')} className="block w-full mt-1 border p-2">
                {CATEGORIES.map(item => (
                    <option key={item} value={item}>
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                    </option>
                ))}
                </select>
            </label>
            <div id='filters' className="border-t pt-4">
                <h3 className="font-bold mb-2">Filter details</h3>
                
                {selectedCategory === 'smartphones' && (
                <div className="grid grid-cols-3 gap-4">
                    <input {...register('filterAttributes.battery_capacity')} placeholder="Battery Capacity" type='number' className="border p-2"/>
                    <input {...register('filterAttributes.screen_type')} placeholder="Screen Type" className="border p-2"/>
                    <input {...register('filterAttributes.protection_class')} placeholder="Screen Protection Class" className="border p-2"/>
                </div>
                )}
                {selectedCategory === 'smartwatches' && (
                <div className="grid grid-cols-3 gap-4">
                    <input {...register('filterAttributes.case_size')} placeholder="Case size" className="border p-2"/>
                    <input {...register('filterAttributes.display_type')} placeholder="Display type" className="border p-2"/>
                    <input {...register('filterAttributes.strap_material')} placeholder="Strap Material" className="border p-2"/>
                </div>
                )}
                {selectedCategory === 'cameras' && (
                <div className="grid grid-cols-3 gap-4">
                    <input {...register('filterAttributes.sensor_type')} placeholder="Sensorr Type" className="border p-2"/>
                    <input {...register('filterAttributes.effective_pixels')} placeholder="Effective Pixels" className="border p-2"/>
                    <input {...register('filterAttributes.video_resolution')} placeholder="Video Resolution" className="border p-2"/>
                </div>
                )}
                {selectedCategory === 'headphones' && (
                <div className="grid grid-cols-3 gap-4">
                    <input {...register('filterAttributes.headphone_type')} placeholder="Headphone Type" className="border p-2"/>
                    <input {...register('filterAttributes.connection_type')} placeholder="Connection Type" className="border p-2"/>
                    <input {...register('filterAttributes.microphone')} placeholder="Microphone" className="border p-2"/>
                </div>
                )}
                {selectedCategory === 'computers' && (
                <div className="grid grid-cols-3 gap-4">
                    <input {...register('filterAttributes.processor')} placeholder="Processor" className="border p-2"/>
                    <input {...register('filterAttributes.screen_diagonal')} placeholder="Screen Diagonal" type='number' className="border p-2"/>
                    <input {...register('filterAttributes.ram_size')} placeholder="Ram Size" type='number' className="border p-2"/>
                </div>
                )}
                {selectedCategory === 'gaming' && (
                <div className="grid grid-cols-3 gap-4">
                    <input {...register('filterAttributes.max_resolution')} placeholder="Max Resolution" className="border p-2"/>
                    <input {...register('filterAttributes.drive_type')} placeholder="Drive Type" className="border p-2"/>
                    <input {...register('filterAttributes.controller')} placeholder="Controller" className="border p-2"/>
                </div>
                )}
            </div>
            <div id='title'>
                <label>Title</label>
                <input {...register('title')} className=" w-full border p-2 mt-1" placeholder="Product name" />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>
            <div id='brand'>
                <label>Brand</label>
                <select {...register('brand')} className="w-full border p-2 mt-1">
                    {/* Достаем бренды из твоего объекта CATEGORY_BRANDS на основе выбранной категории */}
                    {CATEGORY_BRANDS[selectedCategory].map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                    ))}
                </select>
            </div>
            <div id='specifications' className="space-y-6 border-t pt-4">
                <h3 className="font-bold text-lg">Description Specifications</h3>
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
                    className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-black transition-colors cursor-pointer"
                >
                    + Add new group
                </button>
            </div>
    </form>
    )
}

export default AddProduct;