'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateNameSchema, UpdateNameValues, User } from "../../lib/validations/user";
import { useForm } from "react-hook-form";
import { updateNameAction } from "../../app/actions/user";

const PersonalData = ({ name, surname }: UpdateNameValues) => {
    const {register, handleSubmit, formState: { errors, isSubmitting, isDirty, dirtyFields },} = useForm<UpdateNameValues>({
        resolver: zodResolver(UpdateNameSchema),
            defaultValues: {
                name: name ? name : '',
                surname: surname ? surname : '',
            },
    });

    const onSubmit = async (data: UpdateNameValues) => {
        if (!isDirty) {
            console.log('No changes was found.');
            return;
        };

        const payload: Partial<UpdateNameValues> = {};
        (Object.keys(dirtyFields) as Array<keyof UpdateNameValues>).forEach((key) => {
            if (dirtyFields[key]) {
                payload[key] = data[key];
            }
        });
        console.log(payload);
        try {
            const result = await updateNameAction(payload);
            if (result.success) {
                console.log('User data updated.');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-80 flex flex-col gap-2 my-5">
            <div className="">
                <input {...register('name')} placeholder="First Name" className="w-full border p-2 rounded" />
                {errors.name && <p className="text-red-500/75 text-sm">{errors.name.message}</p>}
            </div>
            <div>
                <input {...register('surname')} placeholder="Last Name" className="w-full border p-2 rounded" />
                {errors.surname && <p className="text-red-500/75 text-sm">{errors.surname.message}</p>}
            </div>
            <button type="submit" disabled={!isDirty || isSubmitting} className="bg-green-500/85 text-white p-2 rounded disabled:bg-gray-15">
                {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
        </form>
    )
}

export default PersonalData