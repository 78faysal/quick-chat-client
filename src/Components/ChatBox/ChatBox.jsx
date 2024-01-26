import { useState } from "react";
import { IoMdSend } from "react-icons/io";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  // console.log(messages);

  const handleMessageSend = () => {
    const messageInfo = {
      message: message,
      // sendar
    };
    console.log(message);
  };
  return (
    <div className=" w-[90%] h-full rounded-xl flex flex-col justify-between">
      <div className="navbar bg-base-100 rounded-xl p-5">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl"> </a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control"></div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt=""
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="h-full">
        <div className="chat chat-start">
          <div className="chat-bubble bg-base-300 text-black ">
            It is over Anakin, I have the high ground
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble  bg-base-300 text-black ">You underestimate my power!</div>
        </div>
      </div>

      <div className="join w-full relative p-6">
        <input
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          name="message"
          placeholder="Send Message"
          className="input input-bordered join-item w-full pr-10"
        />
        <button
          onClick={handleMessageSend}
          className="join-item absolute right-0 mr-6 p-3"
        >
          <IoMdSend className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
