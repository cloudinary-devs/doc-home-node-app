"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cloudinary_1 = require("cloudinary");
// Before starting:
// - Make sure you have a Cloudinary account or register for free (free tier available): https://cloudinary.com/users/register_free
// - Make sure you're registered for the AWS Auto-Tagging add-on (free tier available): https://cloudinary.com/documentation/google_auto_tagging_addon
// - Make sure you're registered for the Cloudinary Background Removal add-on: https://cloudinary.com/documentation/cloudinary_ai_background_removal_addon
// - Add your API environment variable to the .env file. You can find your API environment variable in your Console Dashboard.
cloudinary_1.v2.config();
// Upload an image from GoogleDrive and apply auto-tagging for all detected categories with >=75% confidence
// Support overwriting existing assets so this script can be run more than once.
// Apply an eager transformation to warm up the cache with a background-removed variation
cloudinary_1.v2.uploader.upload("https://drive.google.com/uc?export=view&id=1gnXAJZh-Of70TzpU1Meja4TAgqc6CVe7", {
    public_id: "bag_model",
    categorization: "google_tagging",
    auto_tagging: 0.75,
    overwrite: true,
    //warming up the cache for transformation effect. For details, see: https://cloudinary.com/documentation/cloudinary_ai_background_removal_addon#removing_the_background_on_the_fly
    eager: [{ effect: "background_removal" }]
})
    .then((result) => {
    console.log(result);
}).catch((error) => { console.log(error); });
//Upload a background image from GoogleDrive for your underlay
cloudinary_1.v2.uploader.upload("https://drive.google.com/uc?export=view&id=15kVDnO77dv5-0hE4-P4g3jKfwPN9ku2U", {
    public_id: "buildings_bg",
    overwrite: true
})
    .then((result) => {
    console.log(result);
}).catch((error) => { console.log(error); });
//Transform the image: 
//remove background, use a different background image as an underlay, auto-crop to portrait aspect_ratio, 
//add conditional text layer if the image has the tag 'overcoat', 
//optimize delivery by resizing and applying auto-format and auto-quality 
const url = cloudinary_1.v2.url("bag_model", {
    transformation: [
        { effect: "background_removal" },
        { underlay: 'buildings_bg', flags: 'relative', width: '1.0', height: '1.0', crop: 'fill' },
        { gravity: 'auto', crop: 'auto', aspect_ratio: 0.5 },
        { if: '!overcoat!_in_tags' },
        {
            overlay: { font_family: 'Arial', font_size: 160, font_weight: 'bold', text: 'SALE' },
            color: 'rgb:fc6136',
            gravity: 'north',
            y: 60
        },
        { if: 'end' },
        { crop: 'scale', height: 450 },
        { format: 'auto' },
        { quality: 'auto' }
    ]
});
console.log("This is the fully transformed generated url: ", url);
