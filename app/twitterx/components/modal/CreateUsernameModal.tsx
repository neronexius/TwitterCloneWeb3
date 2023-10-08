import Image from "next/image";
import CrossButton from "../buttons/CrossButton";
import { Workspace, useWorkspace } from "../providers/WorkspaceContextProvider";
import { useWallet } from "@solana/wallet-adapter-react";
import { ChangeEvent, FormEvent, useState, FC } from "react";
import { onlyLettersAndNumbers } from "@/utils";
import * as web3 from "@solana/web3.js";
import LayoutModal from "./LayoutModal";


const CreateUsernameModal:FC<CreateUsernameModalInterface> = (props) => {

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


    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [formData, setFormData] = useState<ProfileUsernameSubmission>({
        username: "",
        profile_pic: ""
    })

    async function on_submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        if(formData.username == "" && formData.profile_pic == ""){
            setErrorMessage("Please have some inputs")
            return
        } 

        try {
            if(wallet.publicKey && formData.username) {
                const [username_pda] = web3.PublicKey.findProgramAddressSync([Buffer.from("username"), Buffer.from(formData.username.toLowerCase())], program.programId);
                let account_data = await connection.getAccountInfo(username_pda);
                if(account_data != null) {
                    setErrorMessage("Username has already been taken")
                    return
                }
                const transaction = await program.methods.initialiseUserUsername(formData.username).accounts({
                    userProfile: props.user_profile_data.profile_pda,
                    username: username_pda
                }).transaction();

                const tx = await provider.sendAndConfirm(transaction);
                console.log(tx);

                props.fetchProfile(wallet.publicKey)
            }
            props.setShowCreateUsernameModal(false);
        }
        catch(error){
            console.log(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>){
        if(!onlyLettersAndNumbers(e.target.value)){
            setErrorMessage("Please do not use any special characters or spacing")
        }
        else{
            setErrorMessage("")
        }

        setFormData((prev) => ({...prev, username: e.target.value}))
    }

    const renderLoading = () => {
        return (
            <Image
            className='animate-spin mr-3 py-1 mt-2'
            src={"/purple-loading.svg"}
            height={25}
            width={25}
            alt={""}
            />
        )
      }

    return (
        <LayoutModal>
            <div className="flex w-full justify-between">
                <CrossButton
                        click_function={() => {props.setShowCreateUsernameModal(false)}}
                />
                <h1 className="flex-grow text-center">Add Username</h1>
                
            </div>
            <form onSubmit={on_submit} className=" flex flex-col w-full h-full justify-between items-center">
                <div className="relative flex-grow flex flex-col items-center w-full justify-center">
                    <div className="flex">
                        <button className="" onClick={(e)=>{e.preventDefault()}}>Username :</button>
                        <input 
                        name="username"
                        className="bg-black border border-slate-600 outline-none ml-1 text-start "
                        maxLength={30}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        />
                    </div>

                    <h1 className="h-4 font-extralight text-red-300 text-sm animate-pulse">{errorMessage}</h1>
                </div>
                <div className="pt-2 border-t border-slate-600 w-full flex justify-end ">
                    {isLoading ? 
                    renderLoading() : 
                    <button className="bg-solana hover:bg-purple-500 py-1 px-4 mt-2 rounded-full " type={"submit"} disabled={errorMessage != ""}> Submit </button>
                    }
                </div>
            </form>
                
            </LayoutModal>
    )
}

export default CreateUsernameModal;

interface CreateUsernameModalInterface {
    user_profile_data: any
    setShowCreateUsernameModal: (state: boolean) => void
    fetchProfile: (wallet: web3.PublicKey) => void 
}

interface ProfileUsernameSubmission {
    username: string,
    profile_pic: string
}
