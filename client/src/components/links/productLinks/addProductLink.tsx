import { Link } from "react-router-dom";

const AddProductLink = () => {
    return (
        <Link to="/addProduct">
            <button type="button">Add Product</button>
        </Link>
    );
};

export default AddProductLink;
