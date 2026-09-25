import React from 'react';
import { Metadata } from 'next';
import LayoutWrapper from '@/components/sites/paypal-05303377/signin-a924339f/LayoutWrapper';
import SignInCard from '@/components/sites/paypal-05303377/signin-a924339f/SignInCard';

export const metadata: Metadata = {
  title: 'Log in to your PayPal account',
  description: 'Log in to your PayPal account to securely send and receive money, pay online, and more.',
};

export default function SignInPage() {
  return (
    <LayoutWrapper>
      <SignInCard />
    </LayoutWrapper>
  );
}
