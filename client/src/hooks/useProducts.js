import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";

const useProducts = (link) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(link, {
          signal: signal,
        });
        console.log("Products information recieved");
        setProducts(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getProducts();

    return () => {
      //cancels the request before the components unmount
      controller.abort();
    };
  }, [link]);
  return products;
};

export default useProducts;
