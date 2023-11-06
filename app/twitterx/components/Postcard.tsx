import { Post } from "@/interface";
import {FC, useState, useEffect, memo} from "react";
import Image from "next/image";
import ImageLoad from "./ImageLoad";
import * as anchor from "@project-serum/anchor"
import { Workspace, useWorkspace } from '@/components/providers/WorkspaceContextProvider'



const PostCard: FC<PostCardInterface> = (props) => {
    const workspace:Workspace = useWorkspace();
    if (!workspace || !workspace.program || !workspace.connection || !workspace.provider) {

        return (
        <>
        </>
        )
    }
    const program = workspace.program; 

    const [post_data, setPostData] = useState<Post>();

    useEffect(() => {
        fetch_post_data()
    },[props.post]);   

    const fetch_post_data = async () => {
        console.log("Calling post")
        try{
            console.log("PDA", props.post.pda.toBase58())
            let data = await program.account.postDataState.fetch(props.post.pda)
            if(data){
                setPostData(data)
            }
        }
        catch(error){
             console.log(error)
        }
    
    }

    return(
    <div className="flex p-4  border-b w-full gap-2">
    <div>
        Profile
    </div>
    <div className="flex flex-col w-full">
        <div className="flex flex-col">
            {post_data && post_data.imageUrl && post_data.imageUrl.length > 0 && post_data.imageUrl.map((image:string) => (
                <ImageLoad
                    source={image}
                />
            )
                
            )}
            <h1>{post_data && post_data.content}</h1>
        </div>
        <div className="flex w-full justify-between">
            <button className="flex gap-1 items-center">
                <Image
                    src="/comment.svg"
                    alt="comment button"
                    height={20}
                    width={20}
                />
                <h1>{post_data?.numberOfComment}</h1>
            </button>
            <button className="flex">
                <Image
                    src="/love.svg"
                    height={20}
                    width={20}
                    alt=""
                />
                <h1>Like</h1>
            </button>
            <button>Activity</button>
            <button>Bookmark</button>
            <button>Share</button>
        </div>
    </div>
    </div>
    )
} 


export default memo(PostCard);

interface PostCardInterface {
    post: {
        pda: anchor.web3.PublicKey,
        date: Date
    }
}