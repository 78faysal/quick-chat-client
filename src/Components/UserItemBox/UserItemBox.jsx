import { Link } from "react-router-dom";

const UserItemBox = ({ friendInfo, message, idx }) => {
  const { name, photo, _id } = friendInfo;
  // console.log(idx);
  return (
    <Link className="bg-base-300 py-3 mb-3" to={`/chats/${_id}`}>
      <div
        className="flex gap-2"
      >
        <img className="w-12 h-12 rounded-full" src={photo} alt="" />
        <div>
          <h2 className="text-lg mb-0 font-semibold">{name}</h2>
          <p>Message: {message[idx] ? message[idx].slice(0, 6) + '...' : ''}</p>
        </div>
      </div>
    </Link>
  );
};

export default UserItemBox;
