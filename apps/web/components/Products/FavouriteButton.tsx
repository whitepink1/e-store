'use client'

import { useState } from "react";
import { handleFavouriteAction } from "../../app/actions/user";
import Button from "../shared/Button";
import { useRouter } from "next/navigation";

interface FavButtonProps {
    initialIsFavourite: boolean;
    id: string;
}

const FavouriteButton = ({initialIsFavourite, id}: FavButtonProps) => {
    const [isFavourite, setIsFavourite] = useState(initialIsFavourite);
    const router = useRouter();

    const handleFavourite = async () => {
        setIsFavourite((prev) => !prev);
        try {
            const result = await handleFavouriteAction(id || '');
            if (!result.success) {
                setIsFavourite((prev) => !prev);
                alert(result.message || "Updating favourite product failed");
            } else {
                window.dispatchEvent(new Event('wishlist-updated'));
                router.refresh();
            }
            } catch(err) {
                console.log(err);
            }
    };
    return (
        <Button variant={isFavourite ? 'red' : 'black'} className={`lg:w-56 max-md:w-[45%] max-sm:w-full`} onClick={handleFavourite}>{isFavourite ? 'In Wishlist' : 'Add to Wishlist'}</Button>
    )
}

export default FavouriteButton