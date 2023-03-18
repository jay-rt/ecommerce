import { useEffect, useState } from "react";
import useUserRequest from "./useUserRequest";

const useValues = (link, title) => {
  const [values, setValues] = useState([]);
  const userRequest = useUserRequest();
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getValues = async () => {
      try {
        const res = await userRequest.get(link, {
          signal: signal,
        });
        console.log(`${title} info received`);
        setValues(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getValues();

    return () => {
      //cancels the requests before the components unmount
      controller.abort();
    };
  }, [link, title, userRequest]);

  return values;
};

export default useValues;
