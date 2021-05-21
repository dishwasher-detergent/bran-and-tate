const stripe = require("stripe")(process.env.NUXT_STRIPE_SECRET_KEY);

export default async (req, res) => {
	console.log(req.body.id)
	const session = await stripe.checkout.sessions.retrieve(
		req.body.id
	);

  return res.status(200).json(session);
};