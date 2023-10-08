import Image from "next/image"
import { useWorkspace, Workspace } from "./providers/WorkspaceContextProvider"
import * as web3 from "@solana/web3.js";
import { useState, useEffect, FC} from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";



const ProfileCard:FC<{
  setShowProfileModal: (bool: boolean) => void
  user_profile_data: any
}> = ({user_profile_data, setShowProfileModal}) => {



  
    return (
        <button className="my-4 justify-between h-[60px] w-full inline-flex items-center hover:bg-slate-900 rounded-full xl:px-6"
        onClick={() => setShowProfileModal(true)}
        >
            <div className="flex items-center gap-2 xl:justify-start justify-center  h-full w-full">
              <Image
              className="block"
                src={"/profile.svg"}
                height={25}
                width={25}
                alt={"Profile Picture"}
              />
              <h1 className="xl:block hidden text-lg truncate pr-2">{user_profile_data ? user_profile_data.username ? user_profile_data.username : user_profile_data.key.toString() : ""}</h1>
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
