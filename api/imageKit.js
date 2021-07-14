const ImageKit = require("imagekit");

export default async (req, res) => {
    const imagekit = new ImageKit({
        urlEndpoint: process.env.NUXT_IMAGEKIT_PRIVATE,
        publicKey: process.env.NUXT_IMAGEKIT_PUBLIC,
        privateKey:process.env.NUXT_IMAGEKIT_ENDPOINT
    })
    var result = imagekit.getAuthenticationParameters();
    return res.status(200).json(result);
}
