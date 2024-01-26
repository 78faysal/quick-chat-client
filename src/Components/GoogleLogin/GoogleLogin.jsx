import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSignIn = () => {
    googleSignIn().then((res) => {
      if (res.user) {
        axiosPublic.patch("/users", res.user).then((res) => {
          if (
            res.data.insertedId ||
            res.data.modifiedCount > 0 ||
            res.data.matchedCount > 0
          ) {
            toast.success("SignIn Successfull!");
            navigate(from, { replace: true });
          }
        });
      }
    });
  };
  return (
    <div>
      <button onClick={handleSignIn} className="btn w-full text-lg">
        Continue with <FcGoogle className="text-2xl" />
      </button>
    </div>
  );
};

export default GoogleLogin;
