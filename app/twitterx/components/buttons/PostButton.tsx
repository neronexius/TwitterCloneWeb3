import { ChangeEvent, FC } from "react"
import Image from "next/image"

const PostButton:FC<PostButtonInterface> = (props) => {
    return (
        <div className="relative flex group flex-col justify-center items-center ">
            <label className={props.disable ? "" : "hover:cursor-pointer hover:bg-solana hover:bg-opacity-40"}>
                <input 
                    disabled={props.disable}
                    style={{display:'none'}}
                    type="file"
                    accept={props.accept}
                    onChange={(e) => {
                        e.preventDefault();
                        props.onEvent(e)
                }}/>
                <Image
                    className={props.disable ? "opacity-40" : "opacity-100"}
                    src={props.src}
                    alt={props.alt || ""}
                    height={25}
                    width={25}
                />
            </label>
            
            <h1 className="absolute top-10 transform bg-gray-800 text-white text-xs p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity group-hover:delay-1000 delay-0">
                {props.button_text}
            </h1>
        </div>
    )
}

export default PostButton

interface PostButtonInterface {
    src: string,
    alt?: string,
    button_text: string,
    onEvent: (e: ChangeEvent<HTMLInputElement>) => void
    disable?: boolean
    accept: string
}