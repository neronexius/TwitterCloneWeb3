import { ReactNode, FC } from "react"


const LeftBody:FC<{children:ReactNode}> = ({children}:any) => {
    
    return (
        <div className='sm:flex xl:w-[240px] xl:justify-center w-[60px] justify-end hidden min-w-[60px]'>
        <div id="1stColumn" className='xl:w-[200px] w-[60px] flex sm:flex-col sm:justify-between fixed h-full overflow-y-scroll tall:overflow-y-hidden'>
            {children}
        </div>
        </div>
    )
}

export default LeftBody;