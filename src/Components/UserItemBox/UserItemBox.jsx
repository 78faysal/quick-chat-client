import { Link } from "react-router-dom";

const UserItemBox = ({ friendInfo, handleFriendSelect }) => {
  const { name, photo, _id } = friendInfo;
  // console.log(friendInfo);
  return (
      <Link className="bg-base-200 py-3 mb-3" to={`/chats/${_id}`}>
        <div
        onClick={() => handleFriendSelect(friendInfo)}
        className="flex gap-2"
      >
        <img className="w-12 h-12 rounded-full" src={photo} alt="" />
        <div>
          <h2 className="text-lg mb-0 font-semibold">{name}</h2>
          <p>Message:</p>
        </div>
      </div>
      </Link>
  );
};

export default UserItemBox;
