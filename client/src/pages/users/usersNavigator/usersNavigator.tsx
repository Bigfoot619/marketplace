import DeleteUserLink from "../../../components/links/userLinks/deleteUserLink";
import FindUserIdLink from "../../../components/links/userLinks/findUserIdLink";
import GetAllUsersLink from "../../../components/links/userLinks/getAllUsersLink";
import GetUserLink from "../../../components/links/userLinks/getUserLink";
import UpdateUserLink from "../../../components/links/userLinks/updateUserLink";
import Toolbar from "../../../components/toolbar/toolbar";
import WeatherBar from "../../../components/weatherBar/weatherBar";
import "./usersNavigator.css";

const UserNavigator = () => {
  return (
    <>
      <WeatherBar />
      <Toolbar />
      <h1>Here you can access the User's utilities!</h1>
      <div className="user-links">
        <div>
          <FindUserIdLink />
        </div>
        <div>
          <UpdateUserLink />
        </div>
        <div>
          <DeleteUserLink />
        </div>
        <div>
          <GetAllUsersLink/>
        </div>
        <div>
          <GetUserLink/>
        </div>
      </div>
    </>
  );
};

export default UserNavigator;
