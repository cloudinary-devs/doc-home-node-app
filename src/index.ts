import 'dotenv/config'
import { v2 as cloudinary } from 'cloudinary';

// Update to your credentials in the .env file
cloudinary.config();

// Ensure that you're registered to auto tagging https://cloudinary.com/documentation/google_auto_tagging_addon
// Ensure that you're registered to background removal https://cloudinary.com/documentation/cloudinary_ai_background_removal_addon
//Upload an image with auto tag
//apply eager transformation
cloudinary.uploader.upload(
    "https://res.cloudinary.com/demo/image/upload/v1707306308/cld-docs-hp/walking_woman",
    {
        public_id: "walking_woman",
        categorization: "google_tagging",
        auto_tagging: 0.9,
        //preparing transformation see more details: https://cloudinary.com/documentation/cloudinary_ai_background_removal_addon#removing_the_background_on_the_fly
        eager: [{effect: "background_removal"}]
    })
    .then((result)=>{
        console.log(result.info.categorization.google_tagging)}).catch((error)=> {console.log(error)});

//Upload an image for you underlay
cloudinary.uploader.upload(
    "https://res.cloudinary.com/demo/image/upload/v17073124415555/cld-docs-hp/street.jpg",
    { public_id: "street" })
    .then((result)=>{
        console.log(result)}).catch((error)=> {console.log(error)});


//Transformation image
const url = cloudinary.url("walking_woman", {
    transformation: [
        { effect: "background_removal" },
        { gravity: "auto", crop: "auto", aspect_ratio: 1, width: 450 },
        { underlay: "street", aspect_ratio: 1, width: 450},
        {if: "!Collar!_in_tags"},
        {
            overlay:
                { font_family: "Arial", font_size: 25,  letter_spacing: 3, font_weight:"bold", text: "SALE" },
            color: "red",
            x: 130,
            y: 140
        },
        {if: "end"},
        { format: "auto", quality: "auto"}
    ]
});

console.log("this is the full transformed url", url);
