import { ReactNode, FC } from "react"


const CenterBody:FC<{children:ReactNode}> = ({children}:any) => {
    
    return (
        <div id="2ndColumn" className='sm:w-[720px] w-screen overflow-x-hidden sm:pr-0 sm:border-x border-x-slate-600 min-h-screen'>
            <div className="">
                {children}
            </div>
        </div>
    )
}

export default CenterBody;