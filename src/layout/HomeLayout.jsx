import { useState } from "react";
import UsersBox from "../Components/UsersBox/UsersBox";
import Profile from "../Components/Profile/Profile";
import { Outlet, useLocation } from "react-router-dom";
import { CgMenuLeft } from "react-icons/cg";


const HomeLayout = () => {
  const [friendInfo, setFriendInfo] = useState({});

  const location = useLocation();
  // console.log(location);

  const handleFriendSelect = (friend) => {
    setFriendInfo(friend);
  };
  return (
    <div className="bg-base-200">
      <div className="drawer gap-1 lg:drawer-open max-w-6xl  mx-auto">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side z-20">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu h-full bg-base-100 text-base-content">
            <UsersBox handleFriendSelect={handleFriendSelect} />
          </ul>
        </div>
        <div className="drawer-content bg-base-100 flex flex-col items-center h-full p-5">
          <label
            htmlFor="my-drawer-2"
            className="drawer-button lg:hidden mt-4"
          >
            <CgMenuLeft className="text-2xl fixed left-5 z-10 bg-white " />
          </label>
          {
            location?.pathname === '/' && <Profile />
          }
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
