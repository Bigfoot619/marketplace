import { useState } from "react";
import axios from "axios";
import ShowUsers from "../showUsers";
import WeatherBar from "../../../components/weatherBar/weatherBar";
import Toolbar from "../../../components/toolbar/toolbar";

type UserValues = {
  name: string;
  email: string;
  password: string;
  bank: number;
};

const GetAllUsers = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [users, setUsers] = useState<UserValues[]>([]);
  const [loader, setLoader] = useState(false);

  const onClick = async () => {
    setLoader(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setResponseMessage("You have to login first!");
      setLoader(false);
      return;
    }
    try {
      const response = await axios.get(
        "http://localhost:9000/api/user/getAllUsers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoader(false);
      setResponseMessage(""); 
      setUsers(response.data);
    } catch (err) {
      setLoader(false);
      setUsers([]);
      setResponseMessage("An Error occured, please restart!");
    }
  };

  return (
    <>
      <WeatherBar />
      <Toolbar />
      <h1>Watch The Users</h1>
      <div className="getAllUsers-container">
          <button onClick={onClick}>
            {loader ? <>Retrieving..</> : <>Show!</>}
          </button>
        {responseMessage && <p>{responseMessage}</p>}
        {users.length > 0 && <ShowUsers users={users} />}
      </div>
    </>
  );
};

export default GetAllUsers;
