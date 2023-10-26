import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import WalletContextProvider from '../components/providers/WalletContextProvider'
import { WorkspaceContextProvider } from '../components/providers/WorkspaceContextProvider'
import { Provider as ReduxProvider} from "react-redux";
import {store} from "../redux/store"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WalletContextProvider>
      <WorkspaceContextProvider>
        <ReduxProvider store={store}>
          <Component {...pageProps} />
        </ReduxProvider>
      </WorkspaceContextProvider>
    </WalletContextProvider>
  )
}
