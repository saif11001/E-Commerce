import fs from 'fs';
import path from 'path';

export const deleteImage = (imagePath) => {
    const fullPath = path.join(process.cwd(), imagePath);
    fs.unlink(fullPath, (err) => {
        if(err) {
            console.log("Error deleting image:", err.message);
        }
    });
};