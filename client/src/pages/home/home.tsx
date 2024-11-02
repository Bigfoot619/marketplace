import "./home.css";
import Toolbar from "../../components/toolbar/toolbar";
import WeatherBar from "../../components/weatherBar/weatherBar";
import ProductNavLink from "../../components/links/productLinks/productNavLink";
import UserNavLink from "../../components/links/userLinks/userNavLink";
import MyProductsLink from "../../components/links/productLinks/myProductsLink";

const Home = () => {
  return (
    <>
      <WeatherBar />
      <Toolbar />
      <h1>Welcome to Gilad's Club!</h1>
      <p>Discover the benefits of being a member. Join us today!</p>
      <div className="home-container">
        <div className="products">
         <ProductNavLink/>
        </div>
        <UserNavLink/>
      </div>
      <div>
        <MyProductsLink/>
      </div>
    </>
  );
};

export default Home;
