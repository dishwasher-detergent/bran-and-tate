const stripe = require('stripe')(process.env.NUXT_STRIPE_SECRET_KEY)

export default async (req, res) => {
  const sessions = await stripe.checkout.sessions.list({})
  return res.status(200).json(sessions)
}
