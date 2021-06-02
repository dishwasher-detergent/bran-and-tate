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

			let order = await set_order(event)
			if(order != true) return res.status(200).json({received: order})

			let line_items = await set_lineitems(event,lineItems)
			if(line_items != true) return res.status(200).json({received: line_items})

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
	if(error) return error
	else return true
}

async function set_lineitems(event,lineItems){
	let line = []
	for(let i = 0; i < lineItems.data.length; i++){
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
	if(error) return error
	else return true
}