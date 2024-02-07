import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const AllFriends = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: allFriends } = useQuery({
    queryKey: ["all-friends"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/users/friends?email=${user?.email}`
      );
      //   console.log(data.friends);
      return data?.friends;
    },
  });
  return (
    <div>
      <h1 className="text-2xl font-semibold text-center mb-5">All Friends</h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {allFriends?.map((friend) => (
          <div
            key={friend._id}
            className="px-2 py-5 shadow-lg w-60 font-sans rounded-xl space-y-5 mx-auto"
          >
            <div className="flex justify-center w-full">
              <img
                className="rounded-lg w-full h-40 object-cover"
                src={friend?.photo}
                alt="img"
              />
            </div>
            <div className="text-center w-[85%] mx-auto">
              <h2 className="text-xl font-semibold">{friend?.name}</h2>
              <p className="text-gray-600">{friend?.email}</p>
            </div>
            <div className="flex items-center justify-center flex-wrap gap-6 text-sm md:text-base">
              <Link className="w-full" to={`/chats/${friend._id}`}>
                <button className="px-4 py-2 bg-gray-200 w-full rounded-lg btn">
                  Message
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFriends;
