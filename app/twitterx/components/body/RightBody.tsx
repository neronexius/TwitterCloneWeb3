import { ReactNode, FC } from "react"


const RightBody:FC<{children:ReactNode}> = ({children}:any) => {
    
    return (
        <div id="3rdColumn" className='xl:w-1/5 w-1/4 hidden lg:flex lg:flex-col gap-3  justify-start px-4 '>
            {children}
        </div>
    )
}

export default RightBody;