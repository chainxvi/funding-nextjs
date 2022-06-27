import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { MetaMaskProvider } from 'metamask-react';
import { NextUIProvider } from '@nextui-org/react';

function Web3Funding({ Component, pageProps }: AppProps) {
  return (
    <MetaMaskProvider>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </MetaMaskProvider>
  )
}

export default Web3Funding
