import ProductNavLink from "../../components/links/productLinks/productNavLink";
import UserNavLink from "../../components/links/userLinks/userNavLink";
import Toolbar from "../../components/toolbar/toolbar";
import WeatherBar from "../../components/weatherBar/weatherBar";
import BuyProduct from "./buyProduct/buyProduct";
import SellProduct from "./sellProduct/sellProduct";
import './tradeCenter.css';

const TradeCenter = () => {
  return (
    <>
    <h1 className='headerTC'>Welcome to Our Trade Center!</h1>
      <WeatherBar />
      <Toolbar />
      <h2>Utilities</h2>
      <ProductNavLink/>
      <UserNavLink/>
      <div className="trade-center-container">
        <div className="buy-product">
          <BuyProduct />
        </div>
        <div className="sell-product">
          <SellProduct />
        </div>
      </div>
    </>
  );
};

export default TradeCenter;
