import AddProductLink from '../../../components/links/productLinks/addProductLink';
import DeleteProductLink from '../../../components/links/productLinks/deleteProductLink';
import FindProductIdLink from '../../../components/links/productLinks/findProductIdLink';
import GetAllProductsLink from '../../../components/links/productLinks/getAllProductsLink';
import UpdateProductLink from '../../../components/links/productLinks/updateProductLink';
import Toolbar from '../../../components/toolbar/toolbar';
import WeatherBar from '../../../components/weatherBar/weatherBar';
import './productNavigator.css';


const ProductNavigator = () => {
  return (
    <>
      <WeatherBar/>
      <Toolbar />
      <h1>Here you can access the Product's utilities!</h1>
      <div className="product-links">
        <div>
          <AddProductLink/>
        </div>
        <div>
          <GetAllProductsLink/>
        </div>
        <div>
          <FindProductIdLink/>
        </div>
        <div>
          <UpdateProductLink/>
        </div>
        <div>
          <DeleteProductLink/>
        </div>
      </div>
    </>
  );
};

export default ProductNavigator;
