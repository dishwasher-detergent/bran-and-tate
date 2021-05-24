const stripe = require("stripe")(process.env.NUXT_STRIPE_SECRET_KEY);

export default async (req, res) => {
	const invoiceItems = await stripe.checkout.sessions.listLineItems(
	req.body.id,
	function(err, lineItems) {
		return res.status(200).json(lineItems)
	})
};