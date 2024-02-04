import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUsers = async () => {
  const axiosSecure = useAxiosSecure();

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = axiosSecure.get("/users");
      return data
    },
  });

  console.log(users);

  return users;
};

export default useUsers;
