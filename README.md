## Docs Home Node Sample

This small sample app parallels the interactive demo on the [Cloudinary Doc site home page](https://cloudinary.com/documentation). It demonstrates using the Node SDK to upload a remote image to Cloudinary and then generates URLs that apply various image transformations to achieve a realistic e-commerce use-case.

### Prerequisites

1. Make sure you have a Cloudinary account or [register for free](https://cloudinary.com/users/register_free).
2. Rename `.env.example` to `.env` and replace the dummy `CLOUDINARY_URL` environment variable value with yours.  You can copy the full environment variable or the individual credentials from your Cloudinary Console Dashboard. <p>Note that `.env` is included in the .gitignore of this repo. Make sure you never store your Cloudinary environment variable or API secret in any publicly accessible location. </p>

2. Make sure you're registered for the [Google Auto-Tagging add-on](https://cloudinary.com/documentation/google_auto_tagging_addon) (free tier available).
3. Make sure you're registered for the [Cloudinary AI Background Removal add-on](https://cloudinary.com/documentation/cloudinary_ai_background_removal_addon) (free tier available).

### Running the app

1. In the `doc-home-node-app` directory, run `npm install` to get the required modules.
2. Run the demo app using `npm start`.
3. Take a look at the generated transformation URL and the upload API responses.
