import Image from "next/image";
import { useState, FC } from "react";

const ImageLoad:FC<ImageLoadInterface> = (props) => {

    const [showLoading, setShowLoading] = useState(true);


    const renderLoading = () => (
            <Image
                className='animate-spin mr-3 absolute'
                src={"/purple-loading.svg"}
                height={25}
                width={25}
                alt={""}
            /> 
    )
    return (
        <>
        <div className="w-full h-full flex justify-center items-center min-h-[300px] relative">

                <Image
                    className='w-full h-full'
                    src={props.source}
                    height={300}
                    width={300}
                    alt=""
                    onLoad={() => {setShowLoading(false)}}
                />
                {showLoading && renderLoading()}
        </div>

        </>

    )
}

export default ImageLoad

interface ImageLoadInterface{
    source: string
}