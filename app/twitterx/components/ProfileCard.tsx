import Image from "next/image"
import { useWorkspace, Workspace } from "./providers/WorkspaceContextProvider"
import SolanaWallet from "./SolanaWallet";
import * as web3 from "@solana/web3.js";
import { useState, useEffect, FC} from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";


const ProfileCard:FC = () => {
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

  const [user_profile_data, setUserProfileData] = useState<any>();

  useEffect(()=>{
    if (wallet) {
      fetchProfile(wallet);
    }
    else{
      router.push("/")
    }
  },[wallet])

  const fetchProfile = async(profile_wallet:web3.PublicKey) => {
    const [userProfilePda] = web3.PublicKey.findProgramAddressSync([Buffer.from("user_profile"), profile_wallet.toBuffer()],program.programId)
    try{
      const account_valid = await connection.getAccountInfo(userProfilePda)
      console.log(account_valid)

      if(account_valid != null){
        const account_info = await program.account.userProfileState.fetch(userProfilePda);
        let account_info_w_key = {
          ...account_info,
          key: profile_wallet
        }
        setUserProfileData(account_info_w_key);
        console.log("UserProfileData: ",account_info_w_key )
      }
      else{
        setUserProfileData(null);
        console.log("Account has not been created", account_valid);
      }
    }catch(error){
      console.log("Error while fetching profile: ", error);
    }

  }

    return (
        <div className=" bg-blue-400 my-4 flex justify-between h-20 w-full">
            <div className="flex items-center px-2">
              <Image
                src={"/next.svg"}
                height={50}
                width={50}
                alt={"Profile Picture"}
              />
              <span>{user_profile_data ? user_profile_data.username ? user_profile_data.username : user_profile_data.key.toString() : ""}</span>
            </div>
            <svg className=""></svg>
            <Image
                src={"/dots.svg"}
                height={20}
                width={20}
                alt={"Profile Picture"}
            />

          </div>
    )
}

export default ProfileCard
