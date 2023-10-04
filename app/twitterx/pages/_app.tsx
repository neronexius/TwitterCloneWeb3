import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import WalletContextProvider from '../components/providers/WalletContextProvider'
import { WorkspaceContextProvider } from '../components/providers/WorkspaceContextProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WalletContextProvider>
      <WorkspaceContextProvider>
        <Component {...pageProps} />
      </WorkspaceContextProvider>
    </WalletContextProvider>
  )
}
