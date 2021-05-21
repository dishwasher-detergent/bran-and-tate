const stripe = require("stripe")(process.env.NUXT_STRIPE_SECRET_KEY);

export default async (req, res) => {
	const orders = await stripe.orders.list({});

	return res.status(200).json(orders)
};