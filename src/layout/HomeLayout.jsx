import ChatBox from "../Components/ChatBox/ChatBox";
import Navbar from "../Components/Navbar/Navbar";
import UsersBox from "../Components/UsersBox/UsersBox";

const HomeLayout = () => {
  return (
    <div className="bg-base-200">
      <div className="drawer gap-1 lg:drawer-open max-w-6xl mx-auto">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-base-100  flex flex-col items-center h-full justify-center">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden mt-16"
          >
            Open drawer
          </label>
          <ChatBox />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu h-full bg-base-100 text-base-content">
            <UsersBox />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
