const stripe = require("stripe")(process.env.NUXT_STRIPE_SECRET_KEY);

export default async (req, res) => {
	const session = await stripe.checkout.sessions.retrieve(
		req.body.id
	);
	if(session.payment_status == "paid")
		return res.status(200).json(true);
	else
		return res.status(200).json(false)	
};