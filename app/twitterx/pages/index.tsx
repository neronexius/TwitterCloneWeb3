import Image from 'next/image'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import SolanaWallet from '../components/SolanaWallet'
import { useState, useEffect } from "react";
import { Workspace, useWorkspace } from '@/components/providers/WorkspaceContextProvider'
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import * as web3 from "@solana/web3.js"
import * as util from "../utils"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const workspace:Workspace = useWorkspace();
  const router = useRouter();

  if (!workspace || !workspace.program || !workspace.connection || !workspace.provider) {

    return (
      <>
      </>
    )
  }

  const program = workspace.program; 
  const provider = workspace.provider;
  const connection = workspace.connection;
  const wallet = useWallet().publicKey;

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    router.beforePopState(({ as }) => {
        if (as !== router.asPath) {
           history.back()
        }
        return true;
    });

    return () => {
        router.beforePopState(() => true);
    };
}, [router]);

  console.log("i render again")

  useEffect(()=>{
    if (wallet) {
      fetchProfile(wallet);
    }
  },[wallet])


  const fetchProfile = async(profile_wallet:web3.PublicKey) => {
    setLoading(true);
    const [userProfilePda] = web3.PublicKey.findProgramAddressSync([Buffer.from("user_profile"), profile_wallet.toBuffer()],program.programId)
    try{
      const account_valid = await connection.getAccountInfo(userProfilePda)
      if(account_valid != null){
        router.push("/dashboard")
      }
    }catch(error){
      console.log("Error while fetching profile: ", error)
    }
    finally{
      setTimeout(()=> {
        setLoading(false)
      },1000)
    }

  }

  const initialiseProfile = async(profile_wallet: web3.PublicKey) => {
    setLoading(true);
    const [userProfilePda] = web3.PublicKey.findProgramAddressSync([Buffer.from("user_profile"), profile_wallet.toBuffer()],program.programId)

    try {
      const transaction = await program.methods.initialiseUserProfile().accounts({
        userProfile: userProfilePda
      }).transaction();

      const tx = await provider.sendAndConfirm(transaction);
      console.log(tx);
      router.push("/dashboard")
    }
    catch(error:any){
      if (typeof error == "object"){
        if(error.message.includes("Attempt to debit an account but found no record of a prior credit")){
          alert("You need a small amount of sol to register")
        }
      } 
      console.log(typeof error);
      console.log(error)
    }
    finally{
      setTimeout(()=> {
        setLoading(false)
      },1000)
    }
}

  const renderRegisterButton = (profile_wallet: web3.PublicKey) => {
    return(

        <button 
          onClick={() => initialiseProfile(profile_wallet)}
          className="w-[180px] bg-white rounded-md text-slate-900 hover:text-slate-200 hover:bg-slate-800 ml-3"
          >
            <h1 className="  font-bold">Register </h1>
        </button>

    )
  }


  const renderLoading = () => {
    return (
      <div className="flex px-[24px] py-3 rounded-md w-[180px] justify-center">
        <Image
        className='animate-spin mr-3'
        src={"/purple-loading.svg"}
        height={60}
        width={60}
        alt={""}
        />
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>TwitterX</title>
        <meta name="description" content="Join the uncensored media" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" h-screen pt-2 flex w-screen overflow-x-hidden">

        <div className="h-full flex  flex-col justify-center items-center w-full">
          <h1 className="p-9 text-3xl" >Welcome to TwitterXClone</h1>
          {loading ? renderLoading() :
          wallet ?
          <div className="flex"><SolanaWallet/>{renderRegisterButton(wallet)}</div> :
          <div className="flex"><SolanaWallet/></div> 
          }
          {!loading && wallet && <h1 className="mt-2">It appears that you do not have any account</h1>}
        </div>
      </main>
      
      
    </>
  )
}
