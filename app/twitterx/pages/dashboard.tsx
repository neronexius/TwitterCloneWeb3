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


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const router = useRouter();
  const wallet = useWallet();

  const [showProfileModal, setShowProfileModal] = useState(false);

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
            <Navbar/>
            <ProfileCard
            setShowProfileModal={setShowProfileModal}
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

          />}
        </div>
      </div>
      </main>
    </>
  )
}
