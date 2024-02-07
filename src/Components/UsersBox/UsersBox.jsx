import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UserItemBox from "../UserItemBox/UserItemBox";
import UserSearch from "../UserSearch/UserSearch";

const UsersBox = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: allFriends, isPending } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/users/friends?email=${user?.email}&&message=${true}`
      );
      // console.log(data.lastChats);
      return data;
    },
  });

  return (
    <div className="h-full">
      <UserSearch />
      <ul className="menu p-4 w-80 bg-base-100 text-base-content">
        {isPending && (
          <div className="h-full w-full flex justify-center items-center">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        )}
        {isPending || (
          <li>
            {allFriends?.friends.map((friend, idx) => (
              <UserItemBox
                key={friend._id}
                friendInfo={friend}
                message={allFriends.lastChats}
                idx={idx}
              />
            ))}
          </li>
        )}
      </ul>
    </div>
  );
};

export default UsersBox;
