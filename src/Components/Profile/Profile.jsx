import useAuth from "../../hooks/useAuth";

const Profile = () => {
    const {user} = useAuth();
  return (
    <div>
      <div className="flex flex-col md:flex-row  my-20">
        <div className="max-w-[350px]">
          <img
            className="rounded-lg w-full h-full object-cover"
            src={user?.photoURL}
            alt="img"
          />
        </div>
        <div className="space-y-12 max-w-[350px] rounded-tr-lg rounded-br-lg md:w-[350px] text-center p-10 shadow-[0px_7px_30px_2px_rgba(100,100,111,0.2)]">
          <div className="space-y-1">
            <h2 className="text-3xl font-medium text-gray-700 text-center font-sans">
              {user?.displayName}
            </h2>
            <p className="font-sans  text-gray-500">{user?.email}</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-gray-500 text-sm font-sans">Shots</p>
              <p className="text-3xl tracking-wider text-gray-700">23</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500 text-sm font-sans">Following</p>
              <p className="text-3xl tracking-wider text-gray-700">314</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500 text-sm font-sans">Followers</p>
              <p className="text-3xl tracking-wider text-gray-700">487</p>
            </div>
          </div>
          <div>
            <button className="btn rounded-full btn-outline">Update Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
