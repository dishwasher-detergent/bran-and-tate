export default async (req, res) => {
	console.log(req)
	return res.status(200).json({received: true})
	
	try{
		const { data, error } = await this.$supabase
		.from('orders')
		.insert([
			{ 
				
			},
		])
		if(!error) return res.status(200).json({received: true})
		throw error
	} catch(error){
		return res.status(200).json({received: false})
	}
}
