import { useState } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const UpdateProfile = () => {
  const [updateLoading, setUpdateLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: userInfo = [], isPending } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/single-user/email?email=${user?.email}`
      );
      //   console.log(data);
      return data;
    },
  });

  const { name, email, photo } = userInfo;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);

    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const image = form.image.value;

    const user = {
      name,
      email,
      photo: image,
    };
    // console.log({...user, email});

    //update user
    const {data} = await axiosSecure.patch('/users', user);
    if(data.modifiedCount > 0){
        toast.success('Profile Updated')
        setUpdateLoading(false)
    }

    setUpdateLoading(false)
  };
  return (
    <div className="hero">
      {isPending && (
        <div className="h-full w-full flex justify-center items-center">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      )}
      {userInfo && (
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold">Update Info</h1>
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
                  defaultValue={name}
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
                  readOnly
                  defaultValue={email}
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
                  type="text"
                  name="image"
                  defaultValue={photo}
                  placeholder="Photo URL"
                  className="input input-bordered"
                  required
                />
              </div>
              {/* <div className="form-control">
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
              </div> */}
              <div className="form-control mt-3">
                <button type="submit" className="btn btn-outline">
                  {updateLoading && (
                    <FaSpinner className="text-xl animate-spin" />
                  )}
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;
