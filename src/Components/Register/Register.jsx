import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "../GoogleLogin/GoogleLogin";
import useAuth from "../../hooks/useAuth";
import { ImageUpload } from "../../hooks/ImageUpload";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";

const Register = () => {
  const { createUser, updateUser, setLoading } = useAuth();
  const [userLoading, setUserLoading] = useState(false);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setUserLoading(true);

    const form = e.target;

    const imageData = form.image.files[0];
    const image = await ImageUpload(imageData);
    // console.log(image.display_url);

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    // console.log(name, image.display_url);

    const user = {
      name,
      email,
      photo: image.display_url,
    };

    //create user
    createUser(email, password)
      .then((result) => {
        if (result.user) {
          updateUser(name, image?.display_url)
            .then(() => {
              axiosSecure
                .post("/users", user, {
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                .then((res) => {
                  if (res.data.insertedId) {
                    navigate("/");
                    form.reset();
                    setUserLoading(false);
                    toast.success("Account created👏");
                    setLoading(false)
                  }
                });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          toast.error("Email already in use");
          setUserLoading(false);
        }
      });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold">Register now!</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleFormSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="Your Email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Profile Photo</span>
              </label>
              <input
                type="file"
                name="image"
                className="file-input file-input-bordered w-full max-w-xs"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-3">
              <button type="submit" className="btn btn-primary">
                {userLoading && <FaSpinner className="text-xl animate-spin" />}
                Register
              </button>
            </div>
            <div className="form-control mt-3">
              <p className="text-center">
                Have an account?{" "}
                <Link className="text-blue-500 " to={"/login"}>
                  Login Now
                </Link>
              </p>
            </div>
            <div className="divider my-1"></div>
            <div>
              <GoogleLogin />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
