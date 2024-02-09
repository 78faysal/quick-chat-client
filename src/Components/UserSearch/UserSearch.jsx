import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { RxCross2 } from "react-icons/rx";

const UserSearch = () => {
  const { user, logOut, loading } = useAuth();
  const [searchUser, setSearchUser] = useState("");
  const [requested, setRequested] = useState(false);
  const axiosSecure = useAxiosSecure();

  const { data: users, isPending } = useQuery({
    queryKey: ["getUser", searchUser],
    enabled: !loading,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/users-by-name?name=${searchUser}`
      );
      // console.log(data);
      return data;
    },
  });

  //   console.log(users);

  const handleLogOut = () => {
    logOut().then(() => {
      toast.success("User logged Out");
    });
  };

  const handleUserSearch = (e) => {
    e.preventDefault();

    setSearchUser(e.target.searchValue.value);
  };

  const currentEmail = user?.email;
  const handleFriendRequest = async (userInfo) => {
    userInfo.requestStatus = "pending";
    const { data } = await axiosSecure.patch(`/user/add-friend`, {
      userInfo,
      currentEmail,
    });
    if (data?.requestSend === "successfull") {
      toast.success("Request sended");
      setRequested(true);
    }
  };

  return (
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
              <Link to={"/profile"} className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <Link to={"/all-requests"} className="justify-between">
                Friend Requests
              </Link>
            </li>
            <li>
              <Link to={"/all-friends"} className="justify-between">
                All Friends
              </Link>
            </li>
            <li onClick={handleLogOut}>
              <p>Logout</p>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <form onSubmit={handleUserSearch} className="join w-full rounded-xl">
          <input
            //   onSubmit={(e) => setSearchUser(e.target.value)}
            name="searchValue"
            type="text"
            placeholder="Search User"
            className="input input-bordered join-item w-full pr-8"
          />
          <button
            type="submit"
            className="join-item p-3 absolute right-0 bg-transparent border-0 mr-6"
          >
            <IoIosSearch className="text-2xl text-gray-500" />
          </button>
        </form>
        {users && (
          <div
            id="all-users"
            className="bg-white absolute z-10 left-0 py-3 w-full shadow-xl"
          >
            <span>
              <RxCross2
                onClick={() =>
                  (document.getElementById("all-users").className = "hidden")
                }
                className="text-xl"
              />
            </span>
            {isPending && (
              <div className="h-full w-full flex justify-center items-center">
                <span className="loading loading-spinner loading-md"></span>
              </div>
            )}
            {users?.map((user) => (
              <div
                className="px-5 py-2 font-semibold flex items-center justify-between hover:bg-gray-200"
                key={user._id}
              >
                <div className="flex items-center">
                  <img
                    className="w-6 h-6 rounded-full mr-2"
                    src={user?.photo}
                    alt=""
                  />
                  <p>{user.name}</p>
                </div>
                <button
                  onClick={() => handleFriendRequest(user)}
                  className="border px-3 py-1 hover:border-white rounded-lg"
                >
                  {requested ? "Requested" : "Friend Request"}
                </button>
              </div>
            ))}
            {users?.length < 1 && (
              <div>
                <p className="text-center">No users found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSearch;
