import ImageKit from "imagekitio-vue"

export default async (req, res) => {
    const imagekit = await new ImageKit({
        urlEndpoint: "https://ik.imagekit.io/branandtate/",
        publicKey: "public_3C3ZlEJz6tKgVa6Glcpb7YSQXe8=",
        privateKey: "private_qOOi2KOsyb01YAN68A8HjZ8vJxI="
    })

    console.log(imagekit)

    var result = imagekit.getAuthenticationParameters();
    console.log(result)

    return res.status(200).json(result);
}