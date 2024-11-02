import React from "react";
import { formatDate } from "./formatDate";

type CompleteProduct = {
  product: {
    user_id: string;
    title: string;
    description: string;
    price: number;
    createdAt: string;
  };
  user: {
    name: string;
    email: string;
    password: string;
    bank: number;
  };
};

type ProductTableProps = {
  newProduct: CompleteProduct;
};

const ShowCProduct: React.FC<ProductTableProps> = ({ newProduct }) => {
  return (
    <div className="Table">
      <table>
        <thead>
          <tr>
            <th>Owner</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price ($)</th>
            <th>Published at</th>
          </tr>
        </thead>
        <tbody>
          <td>{newProduct.user.name}</td>
          <td>{newProduct.product.title}</td>
          <td>{newProduct.product.description}</td>
          <td>{newProduct.product.price}</td>
          <td>{formatDate(newProduct.product.createdAt)}</td>
        </tbody>
      </table>
    </div>
  );
};

export default ShowCProduct;
