const stripe = require("stripe")(process.env.NUXT_STRIPE_SECRET_KEY);

export default async (req, res) => {
	const session = await stripe.checkout.sessions.retrieve(
		req.body.id
	);
	return res.status(200).json(session);	
	if(session.payment_status == 'paid'){
		stripe.checkout.sessions.listLineItems(
			req.body.id,
			function(err, lineItems) {
				if(!err)
					return res.status(200).json(lineItems);
			}
		);
	}
};