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
    const provider = workspace.provider;
    const connection = workspace.connection;


    const [post_data, setPostData] = useState<Post>();

    useEffect(() => {
        fetch_post_data()
    },[]);   

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
    <div className="flex p-4 border-b flex-col min-h-[250px]">
        {post_data && post_data.imageUrl && post_data.imageUrl.length > 0 && post_data.imageUrl.map((image:string) => (
            <ImageLoad
                source={image}
            />
        )
            
        )}
        <h1>{post_data && post_data.content}</h1>

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