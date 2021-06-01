const stripe = require('stripe')(process.env.NUXT_STRIPE_SECRET_KEY)

export default async (req, res) => {
  	const sessions = await stripe.checkout.sessions.list({})
//   return res.status(200).json(sessions)
	for(let i = 0; i < sessions.data.length; i++){
		let thing = await line_items(session.data[i])
		return res.status(200).json(thing)
	}
	// return res.status(200).json(sessions.data.length)
}

async function line_items(session){
	stripe.checkout.sessions.listLineItems(
		session.id,
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
