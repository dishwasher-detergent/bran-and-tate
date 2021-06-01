const stripe = require('stripe')(process.env.NUXT_STRIPE_SECRET_KEY)

export default async (req, res) => {
	let order = []
  	const sessions = await stripe.checkout.sessions.list({})
//   return res.status(200).json(sessions)
	for(let i = 0; i < sessions.length; i++){
		stripe.checkout.sessions.listLineItems(
			sessions[i].data.id,
		function(err, lineItems) {
			// order.push({
			// 	information: {
			// 		id: sessions[i].data.id,
			// 		shipping: sessions[i].data.shipping,
			// 		total: sessions[i].data.amount_total
			// 	},
			// 	items: lineItems.data
			// })
			return res.status(200).json(lineItems)
		});
	}
	
}
