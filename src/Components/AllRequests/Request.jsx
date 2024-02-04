const Request = ({ request, handleConfirm }) => {
  return (
    <div className="px-2 py-5 shadow-lg w-60 font-sans rounded-xl space-y-5 mx-auto">
      <div className="flex justify-center w-full">
        <img
          className="rounded-lg w-full h-40 object-cover"
          src={request?.photo}
          alt="img"
        />
      </div>
      <div className="text-center w-[85%] mx-auto font-semibold space-y-2">
        <h2>{request?.name}</h2>
      </div>
      <div className="flex items-center justify-center flex-wrap gap-6 text-sm md:text-base">
        <button onClick={() => handleConfirm('confirm', request?.email)} className="px-4 py-2 bg-gray-200 rounded-lg btn">
          Confirm
        </button>
        <button onClick={() => handleConfirm('cancel', request?.email)} className="flex items-center ">
          <span className="">Cencel</span>
        </button>
      </div>
    </div>
  );
};

export default Request;
