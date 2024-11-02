import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Toolbar from "../../../components/toolbar/toolbar";
import WeatherBar from "../../../components/weatherBar/weatherBar";
import FindUserIdLink from "../../../components/links/userLinks/findUserIdLink";

type IdValue = {
  id: string;
};

const DeleteUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IdValue>();
  const [responseMessage, setResponseMessage] = useState("");

  const onSubmit = async (data: IdValue) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setResponseMessage("You have to login first");
      return;
    }
    try {
      await axios.delete(`http://localhost:9000/api/user/${data.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResponseMessage(`The User has been deleted`);
    } catch (err) {
      setResponseMessage("This user does not exist. Try again!");
    }
  };

  return (
    <>
      <WeatherBar />
      <Toolbar />
      <div className="deleteUser">
        <h1>Delete User</h1>
        <FindUserIdLink/>
        <form id="deleteUserForm" onSubmit={handleSubmit(onSubmit)}>
          <p>User ID</p>
          <input
            {...register("id", { required: true })}
            type="text"
            placeholder="Enter User ID"
          />
          {errors.id && <span>This field is required</span>}

          <p>
            <button type="submit">Delete User</button>
          </p>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
      </div>
    </>
  );
};

export default DeleteUser;
