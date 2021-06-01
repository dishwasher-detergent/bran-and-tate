const stripe = require("stripe")(process.env.NUXT_STRIPE_SECRET_KEY);

export default async (req, res) => {
	const event = req.body
	let line;
	await stripe.checkout.sessions.listLineItems(
		event.data.object.id,
		function(err, lineItems) {
			try{
                const { data, error } = await this.$supabase
                .from('orders')
                .insert([
                    { 
                        order_id: event.data.object.id, 
                        description: this.description, 
                        size: this.size,
                        colors: this.colors,
                        price: this.price,
                        type: this.types
                    },
                ])
                if(!error) return data
                throw error
            } catch(error){
                return
            }
		}
	)
	return res.status(200).json({received: true})
}
