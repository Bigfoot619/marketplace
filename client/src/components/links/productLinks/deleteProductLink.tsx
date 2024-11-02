import { Link } from "react-router-dom";

const deleteProductLink = () => {
    return (
        <Link to="/deleteProduct">
            <button type="button">Delete Product</button>
        </Link>
    );
};

export default deleteProductLink;