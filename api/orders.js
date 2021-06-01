const stripe = require("stripe")(process.env.NUXT_STRIPE_SECRET_KEY);

export default async (req, res) => {
	const event = req.body
	return res.status(200).json({received: true})
}
