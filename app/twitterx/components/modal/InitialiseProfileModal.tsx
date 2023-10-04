const InitialiseProfileModal = () => {
    return (
        <div className = "absolute w-full h-full bg-black bg-opacity-75 z-10">
            <div className ="flex h-full justify-center items-center w-full ">
                <div className="w-[720px] sm:h-[200px] h-full">
                    <h1>Account has not been initialise, please initialise</h1>
                    <button>Initialise</button>
                </div>
            </div>
        </div>
    )
}

export default InitialiseProfileModal;