import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { ReactNode, FC } from "react";


const WalletContextProvider:FC<{children: ReactNode}> = ({children}:any) => {
    const endpoint = "http://127.0.0.1:8899";
    const phantom = new PhantomWalletAdapter();

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets ={[phantom]}>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}

export default WalletContextProvider;