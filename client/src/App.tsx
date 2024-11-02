import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Register from './pages/register/register';
import Login from './pages/login/login';
import NoPage from './pages/noPage';
import Home from './pages/home/home';
import GetAllProducts from './pages/products/getAllProducts/products';
import ContactPage from './pages/contact/contact';
import AddProduct from './pages/products/addProduct/addProduct';
import FindUserId from './pages/users/findUserId/findUserId';
import UpdateProduct from './pages/products/updateProduct/updateProduct';
import FindProductId from './pages/products/findProductId/findProductId';
import Logout from './pages/login/logout/logout';
import ProductNavigator from './pages/products/productNavigator/productNavigator';
import GeneratePDF from './pages/pdf/downloadPDF';
import CreatePDF from './pages/pdf/createPDF';
import TradeCenter from './pages/tradeCenter/tradeCenter';
import DeleteProduct from './pages/products/deleteProduct/deleteProduct';
import UserNavigator from './pages/users/usersNavigator/usersNavigator';
import UpdateUser from './pages/users/updateUser/updateUser';
import DeleteUser from './pages/users/deleteUser/deleteUser';
import GetAllUsers from './pages/users/getAllUsers/getAllUsers';
import GetUser from './pages/users/getUser/getUser';
import MyProducts from './pages/products/myProducts/myProducts';

function App() {
  
  return (
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<GetAllProducts />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/findUserId" element={<FindUserId />} />
            <Route path="/updateProduct" element={<UpdateProduct />} />
            <Route path="/findProductId" element={<FindProductId />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/productNavigator" element={<ProductNavigator />} />
            <Route path="/activities" element={<GeneratePDF />} />
            <Route path="/createPDF" element={<CreatePDF />} />
            <Route path="/tradeCenter" element={<TradeCenter/>}/>
            <Route path="/deleteProduct" element={<DeleteProduct/>}/>
            <Route path="/userNavigator" element={<UserNavigator/>}/>
            <Route path="/updateUser" element={<UpdateUser/>}/>
            <Route path="/deleteUser" element={<DeleteUser/>}/>
            <Route path="/getAllUsers" element={<GetAllUsers/>}/>
            <Route path="/getUser" element={<GetUser/>}/>
            <Route path="/myProducts" element={<MyProducts/>}/>
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
