require("@solana/wallet-adapter-react-ui/styles.css");
import dynamic from 'next/dynamic';

// add this
const SolanaWallet = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);


export default SolanaWallet;