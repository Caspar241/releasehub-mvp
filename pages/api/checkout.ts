import type { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '@/lib/stripe';

// Price IDs (diese müssen in Stripe Dashboard erstellt und hier eingetragen werden)
const PRICE_IDS = {
  basic: process.env.STRIPE_PRICE_ID_BASIC || 'price_basic_placeholder',
  premium: process.env.STRIPE_PRICE_ID_PREMIUM || 'price_premium_placeholder',
  label: process.env.STRIPE_PRICE_ID_LABEL || 'price_label_placeholder',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { priceId, plan } = req.body;

    // Validate plan
    if (!plan || !['basic', 'premium', 'label'].includes(plan)) {
      return res.status(400).json({ error: 'Invalid plan' });
    }

    const selectedPriceId = priceId || PRICE_IDS[plan as keyof typeof PRICE_IDS];

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card', 'sepa_debit'], // SEPA for European customers
      line_items: [
        {
          price: selectedPriceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      metadata: {
        plan,
      },
      subscription_data: {
        metadata: {
          plan,
        },
      },
      locale: 'de', // German locale for DACH market
    });

    return res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return res.status(500).json({ error: error.message });
  }
}
