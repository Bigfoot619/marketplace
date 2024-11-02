import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Toolbar from "../../../components/toolbar/toolbar";
import WeatherBar from "../../../components/weatherBar/weatherBar";
import ShowUser from "../showUser";

type EmailValue = {
  email: string;
};

type UserValues = {
  name: string;
  email: string;
  password: string;
  bank: number;
};

const GetUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailValue>();
  const [responseMessage, setResponseMessage] = useState("");
  const [user, setUser] = useState<UserValues>();

  const onSubmit = async (data: EmailValue) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setResponseMessage("You have to login first");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:9000/api/user/email/${data.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResponseMessage("");
      setUser(response.data);
    } catch (err) {
      setUser(undefined);
      setResponseMessage("This email does not exist. Try again!");
    }
  };

  return (
    <>
      <WeatherBar />
      <Toolbar />
      <div className="getUser">
        <h1>Watch User Details</h1>
        <form id="getUserForm" onSubmit={handleSubmit(onSubmit)}>
          <p>Enter Email</p>
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Enter email"
          />
          {errors.email && <span>This field is required</span>}

          <p>
            <button type="submit">Get User</button>
          </p>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
        {user && <ShowUser user={user} />}
      </div>
    </>
  );
};

export default GetUser;
