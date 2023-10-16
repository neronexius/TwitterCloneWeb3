import {FC} from "react";
import Image from "next/image";

const NavButton:FC<NavButtonProps> = (props) => {

    return(
        <button 
        className="flex h-[60px] items-center w-full hover:bg-slate-900 rounded-full py-1 xl:px-6 xl:justify-start justify-center active:bg-slate-700" 
        onClick={props.onClick}
        >
            <Image
                color="white"
                className=""
                src={props.src}
                alt={props.alt || ""}
                height={25}
                width={25}
            />
            <span className="font-normal font text-xl hidden xl:inline ml-2" >{props.button_text}</span>
        </button>

    )
}

export default NavButton;

interface  NavButtonProps {
    alt?: string,
    src: string,
    button_text: string
    onClick: () => void
}