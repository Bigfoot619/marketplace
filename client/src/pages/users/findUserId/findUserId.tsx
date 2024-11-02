import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./findUserId.css";
import AddProductLink from "../../../components/links/productLinks/addProductLink";
import FindProductIdLink from "../../../components/links/productLinks/findProductIdLink";
import GetAllProductsLink from "../../../components/links/productLinks/getAllProductsLink";
import Toolbar from "../../../components/toolbar/toolbar";
import WeatherBar from "../../../components/weatherBar/weatherBar";

type EmailValue = {
  email: string;
};

const FindUserId = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailValue>();
  const [responseMessage, setResponseMessage] = useState("");

  const onSubmit = async (data: EmailValue) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setResponseMessage("You have to login first");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:9000/api/user/id/${data.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResponseMessage("Your user id: " + response.data);
    } catch (err) {
      setResponseMessage("This email does not exist. Try again!");
    }
  };

  return (
    <>
      <WeatherBar />
      <Toolbar />
      <GetAllProductsLink />
      <AddProductLink />
      <FindProductIdLink />
      <div className="findUserId">
        <h1>Need User ID?</h1>
        <form id="emailForm" onSubmit={handleSubmit(onSubmit)}>
          <p>Enter Email</p>
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Enter email"
          />
          {errors.email && <span>This field is required</span>}

          <p>
            <button type="submit">Find ID</button>
          </p>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
      </div>
    </>
  );
};

export default FindUserId;
