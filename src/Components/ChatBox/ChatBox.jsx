import { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData, useParams } from "react-router-dom";

const ChatBox = () => {
  const friendInfo = useLoaderData();
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const axiosSecure = useAxiosSecure();

  const {
    data: allMessages,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["messages", friendInfo?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/chats?from=${user.email}&to=${friendInfo.email}`
      );
      // console.log(data);
      return data;
    },
  });

  const { name, photo } = friendInfo;

  useEffect(() => {
    refetch();
  }, [friendInfo, refetch]);

  // console.log(allMessages);
  // console.log(friendInfo.email);

  const handleMessageSend = async () => {
    // const messageInfo = {
    //   message: message,
    //   // sendar
    // };
    const messageData = {
      from: user?.email,
      to: friendInfo?.email,
      content: message,
    };

    const { data } = await axiosSecure.post("/chats", messageData);
    if (data.insertedId) {
      refetch();
      setMessage("");
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className=" w-[90%] h-full rounded-xl relative flex flex-col bg-white justify-between">
      {/* <div className="h-24 w-full pb-4"></div> */}
      <div className="navbar bg-base-100 rounded-xl  p-5">
        <div className="flex-1"></div>
        <div className="flex-none gap-2">
          <div className="form-control"></div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="" src={photo} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <span className="justify-between">{name}</span>
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

      <div className="h-full bg-white z-0">
        {isPending && (
          <div className="h-full w-full flex justify-center items-center">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        )}
        {allMessages &&
          allMessages?.map((message) => {
            if (message?.from == user?.email) {
              return (
                <div key={message?._id} className="chat chat-end mb-2">
                  <div className="chat-bubble  bg-base-300 text-black ">
                    {message?.content}
                  </div>
                </div>
              );
            } else if (message?.from == friendInfo?.email) {
              return (
                <div key={message?._id} className="chat chat-start mb-2">
                  <div className="chat-bubble bg-base-300 text-black ">
                    {message?.content}
                  </div>
                </div>
              );
            }
          })}
      </div>

      <div className="join w-full bottom-0 lg:w-[50%] max-sm:left-0 max-md:left-0 bg-white fixed z-10 p-6 pb-10">
        <input
          onChange={handleMessageChange}
          value={message}
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
      <div className="h-24"></div>
    </div>
  );
};

export default ChatBox;
