import * as anchor from "@project-serum/anchor"
import { useState, FC, useEffect, ReactNode, useCallback, useMemo, memo} from "react"
import PostCard from "./Postcard"
import {useInView} from "react-intersection-observer";


const ScrollablePostcards:FC<ScrollablePostcards> = ({posts_data}) => {

    if(!posts_data){
        return <></>
    }

    const [pagination, setPagination] = useState(2)
    const [ref, inView] = useInView();
    

    const [postcard_datas, setPostcardDatas] = useState<Array<{
        pda: anchor.web3.PublicKey,
        date: Date
    }>>();

    useEffect(() => {
        setPostcardDatas(posts_data.slice(0,pagination))
        
    },[pagination,posts_data])

    useEffect(() => {
        if(inView){
            setPagination((prev) => prev < posts_data.length ? prev += 2 : prev = posts_data.length)
        }
    },[inView])


    return (
        <div>
            {postcard_datas && postcard_datas.map((post, index) => { 
                console.log("index post,", index)
                return (
                <PostCard
                    key={index}
                    post={post}
                />
            )})
            }
            {pagination < posts_data.length && <div ref={ref} className="h-[200px] w-full bg-red-200"></div>}
        </div>
    )
}

export default memo(ScrollablePostcards)


interface ScrollablePostcards {
    posts_data: Array<{
        pda: anchor.web3.PublicKey,
        date: Date
    }> | undefined
}