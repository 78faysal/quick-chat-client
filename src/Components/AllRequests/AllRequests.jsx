import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Request from "./Request";

const AllRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: allRequests, isPending, refetch } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/user/all-requests?email=${user?.email}`
      );
      // console.log(data);
      return data;
    },
  });

  const handleConfirm = async (status, email) => {
    console.log(status, email);

    const { data } = await axiosSecure.patch(`/user/status`, {
      currentEmail: user?.email,
      targetedEmail: email,
      status
    });
    refetch();
    console.log(data);
  };
  return (
    <div className="h-full w-full p-5">
      {isPending && (
        <div className="h-full w-full flex justify-center items-center">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      )}
      {allRequests?.length < 1 && (
        <h2 className="text-xl font-semibold text-center my-10">
          You have no requests
        </h2>
      )}

      {allRequests?.length > 0 && (
        <>
          <h1 className="text-2xl font-semibold text-center mb-5">
            All requests
          </h1>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {allRequests?.map((request) => (
              <Request
                key={request?._id}
                request={request}
                handleConfirm={handleConfirm}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllRequests;
