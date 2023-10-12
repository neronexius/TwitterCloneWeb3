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
import { bundlrStorage, walletAdapterIdentity, Metaplex, toMetaplexFile, Signer } from "@metaplex-foundation/js";
import { UserProfile } from "@/interface";


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

      const handleSubmitPost = async () => {
        try{
            console.log("HAHA: ", props.user_profile_data)
            setIsLoading(true)
            //Need separate the uploadedMedia into gif and images array
 
            let uploadedMedia: Array<string> = [];

            const metaplex = Metaplex.make(new web3.Connection(web3.clusterApiUrl('devnet')), {cluster:"devnet"})
                .use(walletAdapterIdentity(wallet))
                .use(bundlrStorage({
                    address: "https://devnet.bundlr.network",
                    providerUrl: web3.clusterApiUrl('devnet'),
                    timeout: 60000
                }))
            if (formData.media.length > 0 && formData.gif == ""){
                let formImageMap = formData.media.map((image) => {
                    return toMetaplexFile(Buffer.from(image.split(',')[1], 'base64'), "image.jpg")
                })
                uploadedMedia = await metaplex.storage().uploadAll(formImageMap);
            }

            else if (formData.gif != "" && formData.media.length == 0) {
                let formGif = toMetaplexFile(Buffer.from(formData.gif.split(',')[1], 'base64'), "image.gif")
                uploadedMedia = [await metaplex.storage().upload(formGif)];
            }
            let content = formData.content;

            const transaction = await program.methods
            .createPost(content, uploadedMedia)
            .accounts({
                userProfile: props.user_profile_data?.profile_pda,
                user: wallet.publicKey || undefined
            })
            .transaction()

            const tx = await provider.sendAndConfirm(transaction);

            console.log("transaction: ", tx)

        }
        catch(error){
            console.log(error)
        }
        finally{
            setIsLoading(false);
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
                                src="https://i.imgur.com/wuKUkXv.gif"
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
                <button className="bg-solana hover:bg-purple-500  px-4 py-1  rounded-full " onClick={handleSubmitPost}> Submit </button>
                }
            </div>
            </div>
        </LayoutModal>
    )
}

export default CreatePostModal;

interface CreatePostModalInterface {
    user_profile_data: UserProfile | undefined
    setShowCreatePostModal: (state: boolean) => void
}

interface CreatePostSubmission{
    content: string,
    media: Array<string>
    gif: string
}

