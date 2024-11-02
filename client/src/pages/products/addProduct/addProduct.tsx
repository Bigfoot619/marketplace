import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Toolbar from "../../../components/toolbar/toolbar";
import "./addProduct.css";
import WeatherBar from "../../../components/weatherBar/weatherBar";
import FindUserIdLink from "../../../components/links/userLinks/findUserIdLink";
import ShowProduct from "../visualizeProducts/showProduct";

type ProductValues = {
  user_id: string;
  title: string;
  description: string;
  price: number;
  createdAt: string;
};

const addProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductValues>();
  const [responseMessage, setResponseMessage] = useState("");
  const [product, setProduct] = useState<ProductValues>();

  const onSubmit = async (data: ProductValues) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setResponseMessage("You have to login first!");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:9000/api/product",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResponseMessage(`${response.data.title}, has been added!`);
      setProduct(response.data);
    } catch (e) {
      setProduct(undefined);
      setResponseMessage("This title is already exist. Try again!");
    }
  };

  return (
    <>
      <WeatherBar />
      <Toolbar />
      <div className="addProduct-container">
        <h1>Have a product?</h1>
        <FindUserIdLink />
        <div className="addProduct">
          <form id="product-form" onSubmit={handleSubmit(onSubmit)}>
            <p>Enter your ID</p>
            <input
              {...register("user_id", { required: true })}
              type="text"
              placeholder="Enter user id"
            />
            {errors.user_id && <span>This field is required</span>}

            <p>Product Title</p>
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="Enter product title"
            />
            {errors.title && <span>This field is required</span>}

            <p>Description</p>
            <input
              {...register("description")}
              type="text"
              placeholder="Enter description"
            />

            <p>Price ($)</p>
            <input
              {...register("price", { required: true })}
              type="number"
              placeholder="Enter product price"
              />
              {errors.price && <span>This field is required</span>}
            <p>
              <button type="submit">Add Product!</button>
            </p>
          </form>
          {responseMessage && <p>{responseMessage}</p>}
          {product && <ShowProduct newProduct={product}/>}
        </div>
      </div>
    </>
  );
};

export default addProduct;
