'use client'
import React from 'react'
import { Card, Image, Text, Badge, Button, Group, TextInput } from '@mantine/core';
import { omit } from 'lodash';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
function ProductCard({ product }: { product: any }) {
    console.log(product.product)
    const checkout = async () => {
        try {
            const response = await fetch('/api/checkout_sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    price: product.id,
                }),
            }).then((res) => res.json());

            const stripe = await stripePromise;
            const result = await stripe?.redirectToCheckout({
                sessionId: response.session.id,
            });
            if (result?.error) {
                console.log(result.error);
            } else {
                console.log('Success!');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    fit="contain"
                    src={product.product.images[0]}
                    height={400}
                    width={400}
                    alt="Norway"
                />
            </Card.Section>
            <Card.Section>
                <TextInput px={30}
                    label="Whats your SoundCloud Username"
                    placeholder="UserName"
                />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{product.product.name}</Text>
                <Badge color="orange" variant="light">
                    On Sale
                </Badge>
            </Group>

            <Text size="sm" c="dimmed">
                {product.product.description}
            </Text>

            <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={checkout}>
                Buy Now
            </Button>
        </Card>
    )

}

export default ProductCard