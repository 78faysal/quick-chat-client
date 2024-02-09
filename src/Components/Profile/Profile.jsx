import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userInfo = [], isPending } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/single-user/email?email=${user?.email}`
      );
      // console.log(data);
      return data;
    },
  });

  const {friends, photo, email, name, _id} = userInfo;
  const followerCount = friends?.filter(friend => friend?.sender === true);
  // console.log(followerCount);
  return (
    <div>
      {isPending && (
        <div className="h-full w-full flex justify-center items-center">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      )}
      {!isPending && <div className="flex flex-col md:flex-row  my-20">
        <div className="max-w-[350px]">
          <img
            className="rounded-lg w-full h-full object-cover"
            src={photo}
            alt="img"
          />
        </div>
        <div className="space-y-12 max-w-[350px] rounded-tr-lg rounded-br-lg md:w-[350px] text-center p-10 shadow-[0px_7px_30px_2px_rgba(100,100,111,0.2)]">
          <div className="space-y-1">
            <h2 className="text-3xl font-medium text-gray-700 text-center font-sans">
              {name}
            </h2>
            <p className="font-sans  text-gray-500">{email}</p>
          </div>
          <div className="flex justify-around items-center">
            {/* <div className="space-y-1">
              <p className="text-gray-500 text-sm font-sans">Shots</p>
              <p className="text-3xl tracking-wider text-gray-700">23</p>
            </div> */}
            <div className="space-y-1">
              <p className="text-gray-500 text-sm font-sans">Following</p>
              <p className="text-3xl tracking-wider text-gray-700">{followerCount?.length ? followerCount?.length : 0}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500 text-sm font-sans">Followers</p>
              <p className="text-3xl tracking-wider text-gray-700">{friends?.length ? friends?.length : 0}</p>
            </div>
          </div>
          <div>
            <Link to={`/update-profile/${_id}`} className="btn rounded-full btn-outline">
              Update Profile
            </Link>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default Profile;
