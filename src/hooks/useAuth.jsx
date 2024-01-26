import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useAuth = () => {
    const getAuth = useContext(AuthContext);
    return getAuth;
};

export default useAuth;