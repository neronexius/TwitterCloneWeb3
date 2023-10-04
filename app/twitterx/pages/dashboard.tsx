import Image from 'next/image'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import SolanaWallet from '../components/SolanaWallet'
import Navbar from '../components/Navbar'
import LeftBody from '../components/body/LeftBody'
import ProfileCard from '../components/ProfileCard'
import CenterBody from '../components/body/CenterBody'
import RightBody from '../components/body/RightBody'
import InitialiseProfileModal from '../components/modal/InitialiseProfileModal'
import { useState } from "react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <>
      <Head>
        <title>TwitterX</title>
        <meta name="description" content="Join the uncensored media" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" h-screen pt-2 flex md:justify-center w-screen overflow-x-hidden">
        <div className="sm:flex xl:w-[1280px] lg:w-[1080px] md:w-[840px]">

          <LeftBody>
            <Navbar/>
            <ProfileCard/>
          </LeftBody>

          <CenterBody>
            <h1 className='p-10 bg-red-200'> Middle Content dfgdfgdfgfdgdfgdfgdfgdfgdfgdfgsdfsdfsdfsdfsdfsdfsdfsdfsdfsdsdfsdfsd  sdfsdfsdfsdfsdfsdfsdfsdfsd</h1>
            <h1 className='p-10'> Middle Content</h1>
            <h1 className='p-10'> Middle Content</h1>
            <h1 className='p-10'> Middle Content</h1>
            <h1 className='p-10'> Middle Content</h1>
            <h1 className='p-10'> Middle Content</h1>
            <h1 className='p-10'> Middle Content</h1>
            <h1 className='p-10'> Middle Content</h1>
            <h1 className='p-10'> Middle Content</h1>
            <h1 className='p-10'> Middle Content</h1>
            <h1 className='p-10'> Middle Content</h1>
            <h1 className='p-10'> Middle Content</h1>
            <h1 className='p-10'> Middle Content</h1>
            <h1 className='p-10'> Middle Content</h1>
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

          
        </div>
      </main>
    </>
  )
}
