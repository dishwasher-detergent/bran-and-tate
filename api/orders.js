const stripe = require("stripe")(process.env.NUXT_STRIPE_SECRET_KEY);
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NUXT_ENV_API_URL
const supabaseKey = process.env.NUXT_ENV_API_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


export default async (req, res) => {
	const event = req.body
	await stripe.checkout.sessions.listLineItems(
		event.data.object.id,
		async function(err, lineItems) {
			const { data, error } =  await supabase
			.from('orders')
			.insert([
				{ 
					order_id: event.data.object.id,
					shipping: event.data.object.shipping,
					payment_status: event.data.object.payment_status,
					line_items: lineItems
				},
			])

			if(error) return res.status(200).json({received: error})
			else return res.status(200).json({received: true})
		}
	)
}