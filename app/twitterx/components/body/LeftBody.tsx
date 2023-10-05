import { ReactNode, FC } from "react"


const LeftBody:FC<{children:ReactNode}> = ({children}:any) => {
    
    return (
        <div className='sm:flex xl:w-[240px] xl:justify-center w-[60px] justify-end hidden min-w-[60px] h-screen'>
            <div id="1stColumn" className='fixed flex sm:flex-col sm:justify-between xl:w-[200px] w-[60px] h-full overflow-y-scroll tall:overflow-y-hidden overflow-x-hidden'>
                {children}
            </div>
        </div>
    )
}

export default LeftBody;