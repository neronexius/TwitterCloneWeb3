
import Image from "next/image"
import { FC } from "react"

const CrossButton:FC<{
    click_function: (something?: any) => void
}> = (props) => {
    return (
        <button 
        onClick={props.click_function}>
            <Image
                src={'/cross.svg'}
                alt=""
                height={15}
                width={15}
            />
        </button>
    )
}

export default CrossButton