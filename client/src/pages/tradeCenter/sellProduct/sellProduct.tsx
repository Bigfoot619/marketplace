import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

type ProductAndUser = {
  title: string;
  userId: string;
};

const SellProduct = () => {
  const [loader, setLoader] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductAndUser>();

  const sellProductWithConfirmation = async (data: ProductAndUser) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setResponseMessage("You have to login first");
        return;
      }
      const response = await axios.patch<number>(
        `http://localhost:9000/api/trade/sell/${data.userId}`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoader(false);
      setResponseMessage(
        `Product ${data.title} has been sold!\nCurrent Balance: ${response.data}$`
      );
    } catch (e) {
      setLoader(false);
      setResponseMessage("Insufficient Balance / Invalid Credentials");
    }
  };

  const onSubmit = (data: ProductAndUser) => {
    setResponseMessage("");
    const userConfirmed = window.confirm("Notice: fee 20%\nAre you sure you want to proceed?");
    if (!userConfirmed) {
      setResponseMessage("Transaction cancelled by user.");
      return;
    }
    setLoader(true);
    sellProductWithConfirmation(data);
  };

  return (
    <>
      <h2>Sell Your Product!</h2>
      <div className="sellProduct">
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
            <button type="submit">
              {loader ? <>Selling..</> : <>Sell!</>}
            </button>
          </p>
        </form>
        {responseMessage && (
          <p style={{ whiteSpace: "pre-line" }}>{responseMessage}</p>
        )}
      </div>
    </>
  );
};

export default SellProduct;
