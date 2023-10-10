import Image from "next/image";
import CrossButton from "../buttons/CrossButton";
import { Workspace, useWorkspace } from "../providers/WorkspaceContextProvider";
import { useWallet } from "@solana/wallet-adapter-react";
import { ChangeEvent, FormEvent, useState, FC } from "react";
import { onlyLettersAndNumbers } from "@/utils";
import * as web3 from "@solana/web3.js";
import LayoutModal from "./LayoutModal";
import PostButton from "../buttons/PostButton";
import { convert_to_base64 } from "@/utils";


const CreatePostModal:FC<CreatePostModalInterface> = (props) => {

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

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [formData, setFormData] = useState<CreatePostSubmission>({
        content: "",
        media: [],
        gif: "",
    })


    function handleInputChange(e: ChangeEvent<HTMLTextAreaElement>){

        setFormData((prev:CreatePostSubmission) => ({...prev, content: e.target.value}))
        e.target.style.height = 'auto'
        e.target.style.height = `${e.target.scrollHeight}px`
        
    }

    const renderLoading = () => {
        return (
            <Image
            className='animate-spin mr-3 '
            src={"/purple-loading.svg"}
            height={25}
            width={25}
            alt={""}
            />
        )
      }

      const renderRespondingTextarea = () => (
            <textarea 
            className="w-full h-full min-h-[100px] outline-none text-2xl font-light text-slate-200   max-h-full bg-black "
            placeholder="What's happening?!"
            onChange={handleInputChange}
            style={{
                resize:'none'
            }}
            autoFocus={true}   
            >
            </textarea>
      )

      const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]){
            let base64_image = await convert_to_base64(e.target.files[0])
            if(base64_image != null){
                let form_media = formData.media;
                form_media.push(base64_image)
                setFormData((prev) => ({...prev, media: form_media}))
                console.log("Added image")
            }
        }
      }

      const handleGif = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]){
            let base64_image = await convert_to_base64(e.target.files[0])
            if(base64_image != null){
                setFormData((prev) => ({...prev, gif: base64_image || ""}))
            }
        }
      }


    return (
        <LayoutModal
        closeModal={props.setShowCreatePostModal}>
            <div>
                <div className="flex top-10 justify-between  bg-black md:w-[680px] w-full ">
                <CrossButton
                    click_function={()=>props.setShowCreatePostModal(false)}
                />
                <h1 className="text-center text-solana">Drafts</h1>
            </div>
            </div>
            <div className="flex-grow overflow-y-auto">
                <div className="flex flex-col h-full min-h-[120px] w-full0">
                    <div className="flex gap-4 h-full w-full flex-grow">
                        <div className="w-[45px] h-[45px] relative rounded-full">
                                <Image
                                className=" bg-slate-800 rounded-full"
                                // src={props.user_profile_data ? props.user_profile_data.profile_pic ?  props.user_profile_data.profile_pic : "/profile.svg" : "/profile.svg"}
                                src="https://images.unsplash.com/photo-1596436950209-65ef85e9679c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80"
                                alt="pfp"
                    
                                fill
                            />
                        </div>
                        <div className="w-full h-full">{renderRespondingTextarea()}</div>
                    </div>
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                        {formData.media.length > 0 && formData.media.map((media) => (
                            <Image
                            style={{aspectRatio: '3/2'}}
                            className="w-full rounded-md"
                            src={media}
                            alt="Uploaded image"
                            height={0}
                            width={0}
                            />
                        ))}
                        {
                            formData.gif != "" && (
                                <Image
                                    style={{aspectRatio: '3/2'}}
                                    className="w-full rounded-md"
                                    src={formData.gif}
                                    alt="Uploaded image"
                                    height={0}
                                    width={0}
                            />
                            )
                        }
                    </div>
                </div>
            </div>
            <div>
            <div className=" border-t border-slate-600 w-full flex justify-between pt-4">
                <ul className="flex items-center gap-3">
                    <li>
                        <PostButton
                            src={"/image.svg"}
                            button_text="Media"
                            onEvent={handleImage}
                            disable={formData.media.length > 3 || formData.gif != ""}
                            accept="image/jpeg, image/png"
                        />
                    </li>
                    <li>
                        <PostButton
                            src={"/gif.svg"}
                            button_text="Gif"
                            onEvent={handleGif}
                            disable={formData.media.length > 0 || formData.gif != ""}
                            accept="image/gif"

                        />
                    </li>
                    
                </ul>
                {isLoading ? 
                renderLoading() : 
                <button className="bg-solana hover:bg-purple-500  px-4 py-1  rounded-full " onClick={() => {
                    console.log(formData)
                }}> Submit </button>
                }
            </div>
            </div>
        </LayoutModal>
    )
}

export default CreatePostModal;

interface CreatePostModalInterface {
    user_profile_data: any
    setShowCreatePostModal: (state: boolean) => void
}

interface CreatePostSubmission{
    content: string,
    media: Array<string>
    gif: string
}

