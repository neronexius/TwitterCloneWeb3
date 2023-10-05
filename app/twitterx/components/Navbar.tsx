import Image from 'next/image'
import NavButton from './NavButton';
import ProfileCard from "./ProfileCard"


const Navbar = () => {
    const redirect_home = () => {

    }
    return (
            <div className ="flex flex-col gap-2 self-start xl:items-start items-center min-w-[60px] tall:pr-0  ">
              <button 
              className="items-center hover:bg-slate-900 rounded-full h-12 xl:px-6 px-2">
                <Image
                    color="white"
                    className=""
                    src={"/twitter.svg"}
                    alt={""}
                    height={25}
                    width={25}
                />

              </button>

              <NavButton
              src={"/home.svg"}
              button_text="Home"
              onClick={redirect_home}
              />

              <NavButton
              src={"/explore.svg"}
              button_text="Explore"
              onClick={redirect_home}
              />

              <NavButton
              src={"/notification.svg"}
              button_text="Notifications"
              onClick={redirect_home}
              />

              <NavButton
              src={"/messages.svg"}
              button_text="Messages"
              onClick={redirect_home}
              />

              <NavButton
              src={"/list.svg"}
              button_text="Lists"
              onClick={redirect_home}
              />

              <NavButton
              src={"/communities.svg"}
              button_text="Communities"
              onClick={redirect_home}
              />

              <NavButton
              src={"/profile.svg"}
              button_text="Profile"
              onClick={redirect_home}
              />
              </div>

    )
}

export default Navbar;