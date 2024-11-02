import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Toolbar from "../../../components/toolbar/toolbar";
import WeatherBar from "../../../components/weatherBar/weatherBar";
import FindProductIdLink from "../../../components/links/productLinks/findProductIdLink";
import "./deleteProduct.css";

type ProductIdValue = {
  id: string;
};

const DeleteProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductIdValue>();
  const [responseMessage, setResponseMessage] = useState("");

  const onSubmit = async (data: ProductIdValue) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setResponseMessage("You have to login first");
      return;
    }
    try {
      await axios.delete(`http://localhost:9000/api/product/${data.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResponseMessage("Your product has deleted!");
    } catch (err) {
      setResponseMessage("This product is not exist. Try again!");
    }
  };

  return (
    <>
      <WeatherBar />
      <Toolbar />
      <h1>Here you can take off a product for sale!</h1>
      <div className="deleteProducts-container">    
          <FindProductIdLink />
        <form id="productId-form" onSubmit={handleSubmit(onSubmit)}>
          <p>Enter Product ID</p>
          <input
            {...register("id", { required: true })}
            type="text"
            placeholder="Enter product ID"
          />
          {errors.id && <span>This field is required</span>}
          <p>
            <button type="submit">Delete</button>
          </p>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
      </div>
    </>
  );
};

export default DeleteProduct;
