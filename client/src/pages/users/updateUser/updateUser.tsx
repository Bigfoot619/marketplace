import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Toolbar from "../../../components/toolbar/toolbar";
import FindUserIdLink from "../../../components/links/userLinks/findUserIdLink";
import WeatherBar from "../../../components/weatherBar/weatherBar";
import './updateUser.css';
import ShowUser from "../showUser";

type UserValues = {
  user_id: string;
  name: string;
  email: string;
  password: string;
  bank: number;
};

const updateUser = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<UserValues>();
  const [responseMessage, setResponseMessage] = useState("");
  const [user, setUser] = useState<UserValues>();

  const onSubmit = async (data: UserValues) => {
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
        `http://localhost:9000/api/user/${filteredData.user_id}`,
        { ...filteredData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResponseMessage(`${response.data.name}, your details are updated!`);
      setUser(response.data);
    } catch (err) {
      setUser(undefined);
      setResponseMessage("No such user exist. Try again!");
    }
  };

  return (
    <>
      <WeatherBar />
      <Toolbar />
      <h1>Need to update your user?</h1>
      <FindUserIdLink />
      <div className="updateUser-container">
        <form id="userForm" onSubmit={handleSubmit(onSubmit)}>
        <p>User ID</p>
          <input
            {...register("user_id", { required: true })} 
            type="text"
            placeholder="Enter your ID"
          />
            {errors.user_id && <span>This field is required</span>}

          <p>Name</p>
          <input
            {...register("name")}
            type="text"
            placeholder="Enter your name"
          />

          <p>Email</p>
          <input
            {...register("email")}
            type="text"
            placeholder="Enter your email"
          />

          <p>Password</p>
          <input
            {...register("password")}
            type="text"
            placeholder="Enter your password"
          />

          <p>Bank</p>
          <input
            {...register("bank")}
            type="number"
            placeholder="Enter bank amount"
          />

          <p>
            <button type="submit">Update User!</button>
          </p>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
        {user && <ShowUser user={user} />}
      </div>
    </>
  );
};

export default updateUser;
