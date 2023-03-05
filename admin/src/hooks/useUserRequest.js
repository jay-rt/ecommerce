import { useEffect } from "react";
import { useSelector } from "react-redux";
import { currentUser } from "../redux/userSlice";
import { userRequest } from "../requestMethods";

const useUserRequest = () => {
  const user = useSelector(currentUser);
  const authToken = user && user.accessToken;

  useEffect(() => {
    const requestIntercept = userRequest.interceptors.request.use(
      (config) => {
        if (!config.headers.authorization && authToken) {
          config.headers.authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    return () => {
      userRequest.interceptors.request.eject(requestIntercept);
    };
  }, [authToken]);

  return userRequest;
};

export default useUserRequest;
