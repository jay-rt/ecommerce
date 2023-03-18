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

const useStats = (link, title) => {
  const [stats, setStats] = useState([]);
  const userRequest = useUserRequest();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getStats = async () => {
      try {
        const res = await userRequest.get(link, { signal: signal });
        console.log(`Setting ${title} stats`);
        let data = res.data;
        if (data.length === 1) {
          const prev = { _id: data[0]._id - 1, total: 0 };
          data.push(prev);
        }
        data = res.data.sort((a, b) => a._id - b._id);
        setStats(
          data.map((item) => ({
            month: months[item._id - 1],
            total: item.total,
          }))
        );
      } catch (err) {
        console.log(err.message);
      }
    };

    getStats();

    return () => {
      controller.abort();
    };
  }, [link, title, userRequest]);

  return stats;
};

export default useStats;
