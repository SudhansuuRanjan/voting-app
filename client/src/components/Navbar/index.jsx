import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import Icon from "./Icon";

const NavBar = () => {
  const [menu, setMenu] = useState(false);

  return (
    <div className="fixed top-0 z-50 w-full">
      <div className={`w-[100%] fixed items-center justify-center bg-white shadow-md`}>
        <div className="flex items-center justify-between py-1 m-auto text-lg px-8">
          <div className="flex items-center">
            <Link style={{ textDecoration: "none" }} to="/">
              <img src="https://images.sftcdn.net/images/t_app-icon-s/p/95522b61-fd16-42ed-b951-557c90e89ac0/1272859067/iobit-software-updater-icon.png" alt="logo" className="h-14" />
            </Link>
          </div>
          <div className="flex items-center flex-1 mx-10">
            <input type="search" placeholder="Search for products" className="px-5 py-2 flex-1 bg-slate-200 border-none outline-none text-gray-800 rounded-lg" />
          </div>
          <div className="flex items-center">
            <ul className="md:flex gap-8 hidden items-center text-[1rem]">
              <li>
                <NavLink style={{ textDecoration: "none" }} to="/cart">
                  {({ isActive }) => (
                    <span className={`font-medium flex items-center gap-3 ${isActive ? "text-gray-900 font-medium" : "text-gray-900"}`}>
                      <Icon name={"ShoppingCart"} className="text-gray-900" color={"gray"} size="23px" />
                      <div>Your Cart</div>
                    </span>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink style={{ textDecoration: "none" }} to="/flipcoin">
                  {({ isActive }) => (
                    <span className={`font-medium decoration-sky-600 flex items-center gap-2 bg-sky-100 px-2.5 py-1 rounded-lg ${isActive ? "text-gray-900 font-medium" : "text-gray-900"}`}>
                      <Icon name={"BadgeDollarSign"} className="text-yellow-500"  size="23px" />
                      <div>Flipcoin Zone</div>
                    </span>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink style={{ textDecoration: "none" }} to="/profile">
                  {({ isActive }) => (
                    <span className={`font-medium decoration-sky-600 flex items-center gap-3 ${isActive ? "text-gray-900 font-medium" : "text-gray-900"}`}>
                      <Icon name={"UserCircle2"} className="text-gray-900" color={"gray"} size="23px" />
                      <div>Profile</div>
                      <Icon name={"ChevronDown"} className="text-gray-900" color={"gray"} size="16px" />
                    </span>
                  )}
                </NavLink>
              </li>
            </ul>

            <button
              type="button"
              onClick={() => {
                if (menu == false) {
                  setMenu(true);
                } else {
                  setMenu(false);
                }
              }}
              className="animate-pulse md:hidden border focus:ring-[2.5px] focus:outline-none font-medium rounded-lg text-lg px-2.5 py-2.5 text-center items-center focus:ring-gray-500 bg-gray-800 border-gray-900 text-gray-900 hover:bg-gray-700 mr-2"
            >
              {!menu ? <Icon name="AlignLeft" color={"skyblue"} size="23px" /> : <Icon name="X" color={"skyblue"} size="23px" />}
            </button>
          </div>
        </div>
        {menu && (
          <div className="md:hidden fixed top-[4rem] right-0 rounded-xl w-[12rem] py-2 mr-5 shadow-md text-gray-900 bg-gray-900 border-gray-700 border">
            <ul>
              <li>
                <Link style={{ textDecoration: "none" }} to="/">
                  <button
                    onClick={() => {
                      setMenu(false);
                      // setFocus(0);
                    }}
                    className="hover:underline hover:border-blue-300 border-4 border-gray-900 py-1.5 w-[100%] pl-4 cursor-pointer  hover:bg-gray-700 text-left"
                  >
                    Home
                  </button>
                </Link>
              </li>
              <li>
                <Link style={{ textDecoration: "none" }} to="/about">
                  <button
                    onClick={() => {
                      setMenu(false);
                      // setFocus(0);
                    }}
                    className="hover:underline hover:border-blue-300  border-4 border-gray-900 py-1.5 w-[100%] pl-4 cursor-pointer  hover:bg-gray-700 text-left"
                  >
                    About
                  </button>
                </Link>
              </li>
              <li>
                <Link style={{ textDecoration: "none" }} to="/blogs">
                  <button
                    onClick={() => {
                      setMenu(false);
                      // setFocus(0);
                    }}
                    className="hover:underline hover:border-blue-300  border-4 border-gray-900 py-1.5 w-[100%] pl-4 cursor-pointer  hover:bg-gray-700 text-left"
                  >
                    Blogs
                  </button>
                </Link>
              </li>
              <li>
                <Link style={{ textDecoration: "none" }} to="/team">
                  <button
                    onClick={() => {
                      setMenu(false);

                    }}
                    className="hover:underline hover:border-blue-300  border-4 border-gray-900 py-1.5 w-[100%] pl-4 cursor-pointer  hover:bg-gray-700 text-left"
                  >
                    Team
                  </button>
                </Link>
              </li>
              <li>
                <Link style={{ textDecoration: "none" }} to="/collection">
                  <button
                    onClick={() => {
                      setMenu(false);

                    }}
                    className="hover:underline hover:border-blue-300  border-4 border-gray-900 py-1.5 w-[100%] pl-4 cursor-pointer  hover:bg-gray-700 text-left"
                  >
                    NFT Gallery
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        )}
        {/* <ScrollStatus /> */}
      </div>
    </div>
  )
}

export default NavBar