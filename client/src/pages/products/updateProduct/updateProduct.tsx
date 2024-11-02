import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Toolbar from "../../../components/toolbar/toolbar";
import FindUserIdLink from "../../../components/links/userLinks/findUserIdLink";
import FindProductIdLink from "../../../components/links/productLinks/findProductIdLink";
import WeatherBar from "../../../components/weatherBar/weatherBar";
import "./updateProduct.css";
import ShowProduct from "../visualizeProducts/showProduct";

type ProductValues = {
  product_id: string;
  user_id: string;
  title: string;
  description: string;
  price: number;
  createdAt: string;
};

const updateProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductValues>();
  const [responseMessage, setResponseMessage] = useState("");
  const [product, setProduct] = useState<ProductValues>();

  const onSubmit = async (data: ProductValues) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== "")
    );
    const token = localStorage.getItem("token");
    if (!token) {
      setResponseMessage("You have to login first!");
      return;
    }
    try {
      const response = await axios.patch(
        `http://localhost:9000/api/product/${filteredData.product_id}`,
        { ...filteredData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResponseMessage(
        "The product " + response.data.title + " has been updated!"
      );
      setProduct(response.data);
    } catch (err) {
      setProduct(undefined);
      setResponseMessage("No such product exist. Try again!");
    }
  };

  return (
    <>
      <WeatherBar />
      <Toolbar />
      <h1>Need to update your product?</h1>
      <FindProductIdLink />
      <FindUserIdLink />
      <div className="updateProduct-container">
        <form id="productForm" onSubmit={handleSubmit(onSubmit)}>
          <p>Product ID</p>
          <input
            {...register("product_id", { required: true })}
            type="text"
            placeholder="Enter product id"
          />
          {errors.product_id && <span>This field is required</span>}

          <p>User ID</p>
          <input
            {...register("user_id", { required: true })}
            type="text"
            placeholder="Enter user id"
          />
          {errors.user_id && <span>This field is required</span>}

          <p>Product Title</p>
          <input
            {...register("title")}
            type="text"
            placeholder="Enter product title"
          />

          <p>Description</p>
          <input
            {...register("description")}
            type="text"
            placeholder="Enter description"
          />

          <p>Price ($)</p>
          <input
            {...register("price")}
            type="number"
            placeholder="Enter product price"
          />
          <p>
            <button type="submit">Update Product!</button>
          </p>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
        {product && <ShowProduct newProduct={product} />}
      </div>
    </>
  );
};

export default updateProduct;
