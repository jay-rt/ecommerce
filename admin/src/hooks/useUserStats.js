import { useState, useEffect } from "react";
import useUserRequest from "./useUserRequest";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const useUserStats = () => {
  const [userStats, setUserStats] = useState([]);
  const userRequst = useUserRequest();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getUserStats = async () => {
      try {
        const res = await userRequst.get("/users/stats", { signal: signal });
        console.log("Setting user stats");
        setUserStats(
          res.data.map((item) => ({
            month: months[item._id - 1],
            total: item.total,
          }))
        );
      } catch (err) {
        console.log(err.message);
      }
    };

    getUserStats();

    return () => {
      controller.abort();
    };
  }, []);

  return userStats;
};

export default useUserStats;
