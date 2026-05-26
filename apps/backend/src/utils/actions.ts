import { v2 as cloudinary } from 'cloudinary';

export const deleteImagesFromCloud = async (images: string[]) => {
    const promises = images.map(imgUrl => {
        const parts = imgUrl.split('/');
        const fileNameWithExtension = parts[parts.length - 1];
        const publicId = fileNameWithExtension.split('.')[0];
        
        return cloudinary.uploader.destroy(`your_folder/${publicId}`);
    });
    
    await Promise.all(promises);
};