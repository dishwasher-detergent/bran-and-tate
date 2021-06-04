 const ImageKit = require("imagekit");

export default async (req, res) => {
    const imagekit = new ImageKit({
        urlEndpoint: "https://ik.imagekit.io/branandtate/",
        publicKey: "public_3C3ZlEJz6tKgVa6Glcpb7YSQXe8=",
        privateKey: "private_qOOi2KOsyb01YAN68A8HjZ8vJxI="
    })
    var result = imagekit.getAuthenticationParameters();
    return res.status(200).json(result);
}