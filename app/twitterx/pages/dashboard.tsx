import Image from 'next/image'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import SolanaWallet from '../components/SolanaWallet'
import Navbar from '../components/Navbar'
import LeftBody from '../components/body/LeftBody'
import ProfileCard from '../components/ProfileCard'
import CenterBody from '../components/body/CenterBody'
import RightBody from '../components/body/RightBody'
import InitialiseProfileModal from '../components/modal/ProfileModal'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useWallet } from '@solana/wallet-adapter-react'
import ProfileModal from '../components/modal/ProfileModal'
import CreateUsernameModal from '@/components/modal/CreateUsernameModal'
import * as web3 from "@solana/web3.js";
import { Workspace, useWorkspace } from '@/components/providers/WorkspaceContextProvider'
import CreatePostModal from '@/components/modal/CreatePostModal'
import { UserProfile } from '@/interface'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const workspace:Workspace = useWorkspace();
  if (!workspace || !workspace.program || !workspace.connection || !workspace.provider) {

    return (
      <>
      </>
    )
  }
  const program = workspace.program; 
  const provider = workspace.provider;
  const connection = workspace.connection;
  const wallet = useWallet();

  const router = useRouter();

  const [user_profile_data, setUserProfileData] = useState<UserProfile>();
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showCreateUsernameModal, setShowCreateUsernameModal] = useState<boolean>(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState<boolean>(false);

  useEffect(() => {
    
  })
  


  useEffect(()=>{
    if (wallet && wallet.publicKey) {
      fetchProfile(wallet.publicKey);
    }
    else{
      router.push("/")
    }
  },[wallet])

//Disconnect wallet when back button was pressed in the Dashboard
useEffect(() => {
    router.beforePopState(({ as }) => {
        if (as !== router.asPath) {
            disconnectWallet();
        }
        return true;
    });

    return () => {
        router.beforePopState(() => true);
    };
}, [router]);

  const disconnectWallet = async() => {
    await wallet.disconnect();
  }

  const fetchProfile = async(profile_wallet:web3.PublicKey) => {
    let user_profile_pda = web3.PublicKey.findProgramAddressSync([Buffer.from("user_profile"), profile_wallet.toBuffer()], program.programId)[0]
    try{
      const account_valid = await connection.getAccountInfo(user_profile_pda)
      console.log(account_valid)

      if(account_valid != null){
        const account_info = await program.account.userProfileState.fetch(user_profile_pda);
        let account_info_w_key = {
          ...account_info,
          key: profile_wallet,
          profile_pda: user_profile_pda
        }
        setUserProfileData(account_info_w_key);
        console.log("UserProfileData: ",account_info_w_key )
      }
      else{
        setUserProfileData({
          profile_pda: user_profile_pda
        });
        console.log("Account has not been created", account_valid);
      }
    }catch(error){
      console.log("Error while fetching profile: ", error);
    }

  }

  return (
    <>
      <Head>
        <title>TwitterX</title>
        <meta name="description" content="Join the uncensored media" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='overflow-hidden ' >
      <div className=" pt-2 flex md:justify-center w-screen ">
        <div className="sm:flex xl:w-[1280px] lg:w-[1080px] md:w-[840px] w-screen relative">

          <LeftBody>
            <Navbar
              post={setShowCreatePostModal}
            />
            <ProfileCard
            setShowProfileModal={setShowProfileModal}
            user_profile_data={user_profile_data}
            />
          </LeftBody>

          <CenterBody>
            
            <div>
              
            </div>
          </CenterBody>
          <RightBody>
            <div className='flex justify-start'>
              <SolanaWallet/> 
            </div>
            <div>
              <h2>Subsribe to Premium</h2>
              <p className="font-bold wrap">Subscribe to unlock new features and if eligible, receive a share of the revenue</p>
            </div>
          </RightBody>

          {showProfileModal && <ProfileModal
          wallet={wallet}
          setShowProfileModal={setShowProfileModal}
          setShowCreateUsernameModal={setShowCreateUsernameModal}
          user_profile_data={user_profile_data}
          />}

        </div>
      </div>

      {showCreateUsernameModal && 
      <CreateUsernameModal
        user_profile_data={user_profile_data}
        setShowCreateUsernameModal={setShowCreateUsernameModal}
        fetchProfile={fetchProfile}
      />}

      {showCreatePostModal && <CreatePostModal
      setShowCreatePostModal={setShowCreatePostModal}
      user_profile_data={user_profile_data}
      />}

      </main>
    </>
  )
}
