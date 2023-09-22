
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { get } from 'lodash';
import ProductList from '@/components/Products/ProductList';

import { Stripe } from 'stripe';
import React, { useEffect } from 'react'
import { Container } from '@mantine/core';


const getStripData = async (): Promise<Stripe.Price[]> => {
  if (typeof process.env.STRIPE_SECRET_KEY === 'undefined') {
    throw new Error('Stripe secret key is not defined');
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-08-16',
  });
  const { data: prices } = await stripe.prices.list({
    active: true,
    limit: 10,
    expand: ['data.product'],
  })
  return prices
}

export default async function HomePage() {
  let products = await getStripData();

  return (
    <>
      <ColorSchemeToggle />
      <Container fluid h={500} w={'90%'} >
        <ProductList products={products} />
      </Container>
    </>
  );
}
