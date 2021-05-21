const stripe = require("stripe")(process.env.NUXT_STRIPE_SECRET_KEY);

export default async (req, res) => {
	const session = await stripe.checkout.sessions.retrieve({
		status_transitions: paid
	});

	return res.status(200).json(session)
};