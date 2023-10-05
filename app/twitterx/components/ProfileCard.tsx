import Image from "next/image"
import { useWorkspace, Workspace } from "./providers/WorkspaceContextProvider"
import SolanaWallet from "./SolanaWallet";
import * as web3 from "@solana/web3.js";
import { useState, useEffect, FC} from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import ProfileModal from "./modal/ProfileModal";


const ProfileCard:FC<{
  setShowProfileModal: (bool: boolean) => void
}> = (props) => {
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
        <button className="my-4 justify-between h-[60px] w-full inline-flex items-center hover:bg-slate-900 rounded-full xl:px-6"
        onClick={() => props.setShowProfileModal(true)}
        >
            <div className="flex items-center gap-2 xl:justify-start justify-center  h-full w-full">
              <Image
              className="block"
                src={"/profile.svg"}
                height={25}
                width={25}
                alt={"Profile Picture"}
              />
              <h1 className="xl:block hidden text-lg">{user_profile_data ? user_profile_data.username ? user_profile_data.username : user_profile_data.key.toString() : ""}</h1>
            </div>
            <svg className="hidden"></svg>
            <Image
            className="xl:block hidden"
                src={"/dots.svg"}
                height={20}
                width={20}
                alt={"Profile Picture"}
            />
          </button>
    )
}

export default ProfileCard
