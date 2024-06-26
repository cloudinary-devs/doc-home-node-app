import 'dotenv/config'
import { v2 as cloudinary } from 'cloudinary';

// Review the repo README for details on prerequisites and instructions on running this app.

// Make sure to add your Cloudinary API environment variable to the .env file before running. See the README for details.

cloudinary.config();

(async function run() {
    try {
        // Upload an image from GoogleDrive and apply auto-tagging for all detected categories with >=75% confidence.
        // Set `overwrite` to true to support running the script multiple times and replacing the same asset.
        // Use `eager` to warm up the cache with the background-removed variation so delivery can be immediate.

        const uploadResult = await cloudinary.uploader.upload(
            'https://drive.google.com/uc?export=view&id=1gnXAJZh-Of70TzpU1Meja4TAgqc6CVe7',
            {
                public_id: 'bag_model',
                categorization: 'google_tagging',
                auto_tagging: 0.75,
                overwrite: true,
                // Warming up the cache for transformation effect. For details, see: https://cloudinary.com/documentation/cloudinary_ai_background_removal_addon#removing_the_background_on_the_fly.
                eager: [{ effect: 'background_removal' }]
            }
        );

        console.log('Upload Results:', uploadResult);

        // Upload a background image from GoogleDrive for your underlay.

        const backgroundUpload = await cloudinary.uploader.upload(
            'https://drive.google.com/uc?export=view&id=15kVDnO77dv5-0hE4-P4g3jKfwPN9ku2U',
            {
                public_id: 'buildings_bg',
                overwrite:true
            }
        );

        console.log('Background Upload Results:', backgroundUpload);

        // Transform the image:
        // Remove background, use a different background image as an underlay, auto-crop to portrait aspect_ratio.
        // Add conditional text layer if the image has the tag 'overcoat'.
        // Optimize delivery by resizing and applying auto-format and auto-quality.

        const url = cloudinary.url('bag_model', {
            transformation: [
                { effect: 'background_removal' },
                { underlay: 'buildings_bg', flags: 'relative', width: '1.0', height:'1.0', crop: 'fill' },
                { gravity: 'auto', crop: 'auto', aspect_ratio: 0.5 },
                // If the image has the tag `overcoat` (i.e. if it was added during the autotagging performed during upload), apply a SALE image overlay
                // upload process, show a tag of SALE on top of the image
                { if: '!overcoat!_in_tags' },
                {
                    overlay: { font_family: 'Arial', font_size: 160, font_weight:'bold', text: 'SALE' },
                    color: 'rgb:fc6136',
                    gravity: 'north',
                    y: 60
                },
                { if: 'end' },
                { crop: 'scale', height: 450 },
                { format: 'auto'},
                { quality: 'auto'}
            ]
        });

        console.log(`\nThis is the fully transformed generated URL:\n\n${url}\n`);
    } catch(error) {
        console.log('Something went wrong! Error:', error);
    }
})();