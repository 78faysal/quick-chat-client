import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UserItemBox from "../UserItemBox/UserItemBox";
import UserSearch from "../UserSearch/UserSearch";

const UsersBox = ({ handleFriendSelect }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: allFriends, isPending } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
      return data;
    },
  });
  const friends = allFriends?.filter((friend) => friend?.email !== user?.email);

  return (
    <div className="h-full">
      <UserSearch />
      <ul className="menu p-4 w-80 bg-base-100 text-base-content">
        {isPending || (
          <li>
            {friends?.map((friend) => (
              <UserItemBox
                key={friend._id}
                handleFriendSelect={handleFriendSelect}
                friendInfo={friend}
              />
            ))}
          </li>
        )}
      </ul>
    </div>
  );
};

export default UsersBox;
