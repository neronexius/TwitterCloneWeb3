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
import { Post, UserProfile } from '@/interface'
import * as anchor from "@project-serum/anchor"
import PostCard from '@/components/Postcard'
import { BorshAccountsCoder } from '@coral-xyz/anchor'
import ScrollablePostcards from '@/components/ScrollablePostcards'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { clear_profile, update_profile } from '@/redux/profile'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const dispatch = useAppDispatch();


  const workspace:Workspace = useWorkspace();
  const program = workspace.program; 
  const provider = workspace.provider;
  const connection = workspace.connection;
  const wallet = useWallet();

  const router = useRouter();

  const user_profile_data:UserProfile = useAppSelector(state => state.user_profile);

  const [user_posts_data, setUserPostData] = useState<Array<{
    pda: anchor.web3.PublicKey,
    date: Date
  }>>(); 

  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showCreateUsernameModal, setShowCreateUsernameModal] = useState<boolean>(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState<boolean>(false);

  useEffect(()=>{
    if (wallet && wallet.publicKey) {
      dispatch(clear_profile())
      fetchProfile(wallet.publicKey);
    }
    else{
      router.push("/")
    }
  },[wallet])

  useEffect(()=> {
    fetchPost()
  },[user_profile_data])

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
 

  const fetchProfile = async(profile_wallet:web3.PublicKey) => {
    
    
    let user_profile_pda = web3.PublicKey.findProgramAddressSync([Buffer.from("user_profile"), profile_wallet.toBuffer()], program.programId)[0]
    try{
      const account_valid = await connection.getAccountInfo(user_profile_pda)
  
      if(!account_valid) router.push("/");

      const account_info = await program.account.userProfileState.fetch(user_profile_pda);

      let account_info_w_key = {
        ...account_info,
        key: profile_wallet.toBase58(),
        profile_pda: user_profile_pda.toBase58()
      }

      dispatch(update_profile(account_info_w_key));
      console.log("fetchProfile fetched: ", account_info_w_key);
    }catch(error){
      console.log("Error while fetching profile: ", error);
    }

  }

  const fetchPost = async() => {
    try{
      if(!user_profile_data) return
      const discriminator = BorshAccountsCoder.accountDiscriminator("postDataState");

      let posts = await connection.getProgramAccounts(program.programId, {
        dataSlice:{
          offset: 44,
          length: 8
        },
        filters:[
          {
            memcmp:{
              offset: 0,
              bytes: anchor.utils.bytes.bs58.encode(discriminator)
              //figure out how to get the discriminator from anchor account. 
            },
          },
          {
            memcmp:{
              offset: 12,
              bytes: anchor.utils.bytes.bs58.encode(new web3.PublicKey(user_profile_data.profile_pda).toBuffer())
            }
          }
          
        ]
      })

      console.log("fetchPost fetched: ", posts)

      if(posts.length > 0) {
        let post_deserialize = posts.map((post) => {
          return {
            date: new Date(post.account.data.reduce((acc, byte, index) => acc + byte * Math.pow(256, index), 0) * 1000),
            pda: post.pubkey
          }
        })
        post_deserialize.sort((a,b) => b.date.getTime() - a.date.getTime())
        setUserPostData(post_deserialize)
      }

  }
  catch(error){
    console.log(error)
  }
  }

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
      <main className='overflow-hidden' >
      <div className=" pt-2 flex md:justify-center w-screen ">
        <div className="sm:flex xl:w-[1280px] lg:w-[1080px] md:w-[840px] w-screen relative ">

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
            <ScrollablePostcards
            posts_data={user_posts_data}
            />
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
      fetchProfile={()=> {
        user_profile_data && user_profile_data.key
        && fetchProfile(new web3.PublicKey(user_profile_data.key))
      }}
      />}

      </main>
    </>
  )
}
