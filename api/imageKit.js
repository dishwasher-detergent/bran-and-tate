const ImageKit = require("imagekit");

export default async (req, res) => {
    const imagekit = new ImageKit({
        urlEndpoint: process.env.imageKit_endpoint,
        publicKey: process.env.public_api,
        privateKey: process.env.private_api
    })
    var result = imagekit.getAuthenticationParameters();
    return res.status(200).json(result);
}
