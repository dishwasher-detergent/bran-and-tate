const stripe = require("stripe")(process.env.NUXT_STRIPE_SECRET_KEY);

export default async (req, res) => {
	const event = req.body
	const line;
	await stripe.checkout.sessions.listLineItems(
		event.data.object.id,
		function(err, lineItems) {
			console.log(lineItems)
		}
	);
	return res.status(200).json({received: true})
	// try{
	// 	const { data, error } = await this.$supabase
	// 	.from('orders')
	// 	.insert([
	// 		{ 
	// 			order_id: event.data.object.id,
	// 			shipping: event.data.object.shipping,
	// 			payment_status: event.data.object.payment_status,
	// 			line_items: line
	// 		},
	// 	])
	// 	if(!error) return res.status(200).json({received: true})
	// 	throw error
	// } catch(error){
	// 	return res.status(200).json({received: false})
	// }
}
