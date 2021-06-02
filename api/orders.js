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
			if(!await set_order(event)) return res.status(200).json({received: 'error'})
			if(!await set_lineitems(event,lineItems)) return res.status(200).json({received: 'error'})

			return res.status(200).json({received: true})
		}
	)
}

async function set_order(event){
	let { data, error } =  await supabase
	.from('orders')
	.insert([
		{ 
			order_id: event.data.object.id,
			shipping: event.data.object.shipping,
			payment_status: event.data.object.payment_status,
		},
	])
	if(error) return false
	else return true
}

async function set_lineitems(event,lineItems){
	let line = []
	for(let i = 0; i < lineItems.length; i++){
		line.push({
			order_id: event.data.object.id, 
			item_name: lineItems.data[i].description,
			quantity: lineItems.data[i].quantity,
			completed: false
		})
	}

	let { data, error } =  await supabase
	.from('line_item')
	.insert([
		line.join()
	])
	if(error) return false
	else return true
}