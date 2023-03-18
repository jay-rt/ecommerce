import { useState, useEffect } from "react";
import useUserRequest from "./useUserRequest";

const useIncome = () => {
  const [income, setIncome] = useState([]);
  let current,
    previous = 0;
  const userRequest = useUserRequest();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getIncome = async () => {
      try {
        const res = await userRequest.get("/orders/income", { signal: signal });
        console.log("Income info received");
        setIncome(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getIncome();

    return () => {
      //cancels the requests before the components unmount
      controller.abort();
    };
  }, [userRequest]);

  if (income.length > 1) {
    current = income[1].total;
    previous = income[0].total;
  } else if (income.length === 1) {
    current = income[0].total;
  }

  return { current: current, previous: previous };
};

export default useIncome;
