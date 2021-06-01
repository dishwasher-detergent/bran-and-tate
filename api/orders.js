const stripe = require('stripe')(process.env.NUXT_STRIPE_SECRET_KEY)

export default async (req, res) => {
	let order = []
  	const sessions = await stripe.checkout.sessions.list({})
//   return res.status(200).json(sessions)
	for(let i = 0; i < sessions.length; i++){
		stripe.checkout.sessions.listLineItems(
			sessions.data[i].id,
		function(err, lineItems) {
			if(err) return res.status(200).json(err)
			else return res.status(200).json(lineItems)
			// order.push({
			// 	information: {
			// 		id: sessions.data[i].id,
			// 		shipping: sessions.data[i].shipping,
			// 		total: sessions.data[i].amount_total
			// 	},
			// 	items: lineItems.data
			// })
		});
	}
	return res.status(200).json(sessions)
}
