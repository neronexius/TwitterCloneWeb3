import { FC, ReactNode } from "react"

const LayoutModal:FC<{children: ReactNode}> = ({children}: any) => {
    return (
        <div className="fixed top-0 w-full h-screen bg-slate-100 bg-opacity-10">
            <div className="flex justify-center w-full h-full pt-0 items-center ">
                <div className="md:w-[720px] w-full max-h-[350px] h-full bg-black flex flex-col items-start justify-between p-4 rounded-2xl gap-5 relative">
                {children}
                </div>
            </div>
        </div>
                    
    )
}

export default LayoutModal