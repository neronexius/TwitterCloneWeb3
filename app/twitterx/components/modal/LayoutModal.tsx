import { FC, ReactNode, useEffect, useRef } from "react"
import CrossButton from "../buttons/CrossButton"

const LayoutModal:FC<{
    children: ReactNode,
    closeModal: (state:boolean) => void
}> = ({children, closeModal}) => {

    let ref:any = useRef(null);
    
    useEffect(() => {
        const handleOutSideClick = (event:any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                closeModal(false)
              }
        };
    
        window.addEventListener("mousedown", handleOutSideClick);
    
        return () => {
          window.removeEventListener("mousedown", handleOutSideClick);
        };
      }, [ref]);

    return (
        <div className="fixed top-0 w-full h-screen bg-slate-100 bg-opacity-10">
            <div className="flex justify-center w-full h-full pt-4 items-center ">
                <div ref={ref} className="w-[720px] max-h-[90%] bg-black flex flex-col justify-center gap-4 p-4 rounded-3xl">
                        {children}
                </div>
            </div>
        </div>
                            
                    
    )
}

export default LayoutModal