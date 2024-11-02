import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Toolbar from "../../../components/toolbar/toolbar";
import "./products.css";
import FindUserIdLink from "../../../components/links/userLinks/findUserIdLink";
import WeatherBar from "../../../components/weatherBar/weatherBar";
import ShowCProducts from "../visualizeProducts/showCProducts";

type CompleteProduct = {
  product: {
    user_id: string;
    title: string;
    description: string;
    price: string;
    createdAt: string;
  };
  user: {
    name: string;
    email: string;
    password: string;
    bank: number;
  };
};

const GetAllProducts = () => {
  const [loader, setLoader] = useState(false);
  const { register, watch, handleSubmit } = useForm<CompleteProduct>();
  const [products, setProducts] = useState<any[]>([]);
  const [responseMessage, setResponseMessage] = useState("");
  const userId = watch("product.user_id");
  
  const onSubmit = async () => {
    setResponseMessage("");
    setProducts([]);
    setLoader(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setResponseMessage("You have to login first!");
      return;
    }
    try {
      const response = await axios.get<CompleteProduct[]>(
        `http://localhost:9000/api/product/showAll/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoader(false);
      setProducts(response.data);
    } catch (e: any) {
      setProducts([]);
      setLoader(false);
      setResponseMessage("Check user ID!");
    }
  };

  return (
    <>
      <WeatherBar />
      <Toolbar />
      <h1>Check Out Our Products!</h1>
      <FindUserIdLink />
      <div className="getAllProducts">
        <form id="product-form" onSubmit={handleSubmit(onSubmit)}>
          <p>User ID</p>
          <input
            className="input-text"
            {...register("product.user_id", { required: true })}
            type="text"
            placeholder="Enter user id"
          />
          <p>
            <button type="submit" className="get-products-button">
              {loader ? <>Retrieving..</> : <>Watch!</>}
            </button>
          </p>
        </form>
        {responseMessage && (
          <p style={{ whiteSpace: "pre-line" }}>{responseMessage}</p>
        )}
        {products.length > 0 && <ShowCProducts products={products} />}
      </div>
    </>
  );
};

export default GetAllProducts;
