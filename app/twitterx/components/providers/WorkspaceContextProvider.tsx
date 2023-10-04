import {useContext, createContext, FC, ReactNode} from "react";
import {Program, AnchorProvider, setProvider, Idl} from "@project-serum/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { Connection, Keypair } from "@solana/web3.js";
import { TwitterxClone, IDL } from "@/idls/twitterx_clone";
import idl from "../../idls/twitterx_clone.json";


const WorkspaceContext = createContext({});
const Program_ID = idl.metadata.address;

export interface Workspace {
    connection?: Connection,
    provider?: AnchorProvider,
    program?: Program<TwitterxClone>
}

const MockWallet = {
    publicKey: Keypair.generate().publicKey,
    signTransaction: () => Promise.reject(),
    signAllTransactions: () => Promise.reject()
}

const WorkspaceContextProvider:FC<{children: ReactNode}> = ({children}:any) => {
    const { connection } = useConnection();
    const wallet = useAnchorWallet() || MockWallet;
    const provider = new AnchorProvider(connection, wallet, {})
    setProvider(provider)

    const program = new Program(IDL as Idl, Program_ID);

    const workspace = {
        connection,
        provider,
        program
    }

    return (
        <WorkspaceContext.Provider value = {workspace}>
            {children}
        </WorkspaceContext.Provider>
    )
}

const useWorkspace = ():Workspace => {
    return useContext(WorkspaceContext)
}

export {useWorkspace, WorkspaceContextProvider, MockWallet}