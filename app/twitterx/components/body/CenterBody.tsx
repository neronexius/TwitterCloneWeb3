import { ReactNode, FC } from "react"


const CenterBody:FC<{children:ReactNode}> = ({children}:any) => {
    
    return (
        <div id="2ndColumn" className='w-[720px]  overflow-x-hidden sm:pr-0 pr-[60px] sm:border-x border-x-slate-600'>
                {children}
        </div>
    )
}

export default CenterBody;