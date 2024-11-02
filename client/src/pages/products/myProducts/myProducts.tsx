import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import FindUserIdLink from "../../../components/links/userLinks/findUserIdLink";
import Toolbar from "../../../components/toolbar/toolbar";
import WeatherBar from "../../../components/weatherBar/weatherBar";
import ShowProducts from "../visualizeProducts/showProducts";



type Product = {
      user_id: string;
      title: string;
      description: string;
      price: string;
      createdAt: string;
    };

const MyProducts = () => {
  const [loader, setLoader] = useState(false);
  const { register,watch, handleSubmit} = useForm<Product>();
  const [products, setProducts] = useState<any[]>([]);
  const [responseMessage, setResponseMessage] = useState("");
  const userId = watch("user_id");

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
      const response = await axios.get<Product[]>(
        `http://localhost:9000/api/product/myProducts/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoader(false);
      setProducts(response.data);
      if (products.length === 0) {
        setResponseMessage("You have no products!");
      }
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
      <h1>Show me my Products!</h1>
      <FindUserIdLink />
      <div className="MyProducts">
        <form id="product-form" onSubmit={handleSubmit(onSubmit)}>
          <p>User ID</p>
          <input
            className="input-text"
            {...register("user_id", { required: true })}
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
        {products.length > 0 && <ShowProducts products={products} />}
      </div>
    </>
  );
};

export default MyProducts;
