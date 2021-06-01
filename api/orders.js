const stripe = require("stripe")(process.env.NUXT_STRIPE_SECRET_KEY);

export default async (req, res) => {
	const event = req.body
	stripe.checkout.sessions.listLineItems(
		event.data.object.id,
		function(err, lineItems) {
			console.log(lineItems)
		}
	)
	return res.status(200).json({received: true})
}
