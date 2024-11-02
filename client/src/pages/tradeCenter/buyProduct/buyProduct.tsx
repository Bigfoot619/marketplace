import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import ShowCProduct from "../../products/visualizeProducts/showCProduct";

type ProductAndUser = {
  title: string;
  userId: string;
};

type CompleteProduct = {
  product: {
    user_id: string;
    title: string;
    description: string;
    price: number;
    createdAt: string;
  };
  user: {
    name: string;
    email: string;
    password: string;
    bank: number;
  };
};

const BuyProduct = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [product, setProduct] = useState<CompleteProduct>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductAndUser>();

  const onSubmit = async (data: ProductAndUser) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setResponseMessage("You have to login first!");
      return;
    }
    try {
      const response = await axios.patch<CompleteProduct>(
        `http://localhost:9000/api/trade/buy/${data.userId}`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResponseMessage("Congratulations on your purchase!");
      setProduct(response.data);
    } catch (e: any) {
      setProduct(undefined);
      setResponseMessage("Insufficient Balance / Invalid Credentials");
    }
  };

  return (
    <>
      <h2>Purchase A Product!</h2>
      <div className="buyProduct">
        <form id="productAndUser" onSubmit={handleSubmit(onSubmit)}>
          <p>Enter User ID</p>
          <input
            {...register("userId", { required: true })}
            type="text"
            placeholder="Enter user ID"
          />
          {errors.userId && <span>This field is required</span>}
          <p>Enter the Product Title</p>
          <input
            {...register("title", { required: true })}
            type="text"
            placeholder="Enter product title"
          />
          {errors.title && <span>This field is required</span>}
          <p>
            <button type="submit">Buy!</button>
          </p>
        </form>
        {responseMessage && (
          <p style={{ whiteSpace: "pre-line" }}>{responseMessage}</p>
        )}
        {product && <ShowCProduct newProduct={product} />}
      </div>
    </>
  );
};

export default BuyProduct;
