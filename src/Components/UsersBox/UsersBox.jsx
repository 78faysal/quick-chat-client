import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import UserItemBox from "../UserItemBox/UserItemBox";
import { IoIosSearch } from "react-icons/io";

const UsersBox = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
    .then(() => {
      toast.success('User logged Out')
    })
  }
  return (
    <div className="h-full">
      <div className="flex items-center gap-2 px-3 py-2">
        <div>
          <div className="dropdown dropdown-start">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-12 rounded-full">
                <img
                  className="h-16 w-16 rounded-full object-cover"
                  src={user?.photoURL}
                  alt=""
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <p className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </p>
              </li>
              <li>
                <p>Settings</p>
              </li>
              <li onClick={handleLogOut}>
                <p>Logout</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="join w-full rounded-xl">
          <input
            type="text"
            placeholder="Search User"
            className="input input-bordered join-item w-full pr-8"
          />
          <button className="join-item p-3 absolute right-0 bg-transparent border-0 mr-6">
            <IoIosSearch className="text-2xl text-gray-500" />
          </button>
        </div>
      </div>
      <ul className="menu p-4 w-80 bg-base-100 text-base-content">
        <li>
          <UserItemBox />
        </li>
      </ul>
    </div>
  );
};

export default UsersBox;
