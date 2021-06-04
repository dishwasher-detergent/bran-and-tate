 const ImageKit = require("imagekit");

export default async (req, res) => {
    const imagekit = new ImageKit({
        urlEndpoint: "your_url_endpoint",
        publicKey: "your_public_key",
        privateKey: "your_privage_key"
    })
    console.log(imagekit)
    // return res.status(200).json(result);
}