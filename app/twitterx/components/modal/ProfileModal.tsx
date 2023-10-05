import { WalletContextState, useWallet } from "@solana/wallet-adapter-react";
import { FC, useEffect, useRef } from "react";

const ProfileModal:FC<ProfileModal> = (props) => {

    let ref:any = useRef(null);

    const logout = async () => {
        if(props.wallet){
            await props.wallet.disconnect()
        }

    }

    useEffect(() => {
        const handleOutSideClick = (event:any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                props.setShowProfileModal(false)
              }
        };
    
        window.addEventListener("mousedown", handleOutSideClick);
    
        return () => {
          window.removeEventListener("mousedown", handleOutSideClick);
        };
      }, [ref]);

    return (
        <div className="absolute w-screen h-screen">
            <div 
            className = "absolute xl:left-[20px] left-3 bottom-20 z-10 mt-2 w-[250px] rounded-md bg-black border-slate-800 border shadow-slate-700 shadow-lg "
            ref={ref}
            >
                <div className="flex flex-col items-start py-4 gap-3">
                    <button className="text-lg hover:bg-slate-900 p-2 text-left w-full">
                        Add an existing account
                    </button>
                    <button 
                    className="text-lg hover:bg-slate-900 p-2 text-left w-full"
                    onClick={() => logout()}
                    >
                        Log out 
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfileModal;


interface ProfileModal {
    wallet: WalletContextState
    setShowProfileModal: (e: boolean) => void
}