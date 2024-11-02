import React from "react";
import { formatDate } from "./formatDate";

type Product = {
  user_id: string;
  title: string;
  description: string;
  price: number;
  createdAt: string;
};

type ProductTableProps = {
  newProduct: Product;
};

const ShowProduct: React.FC<ProductTableProps> = ({ newProduct }) => {
  return (
    <div className="Table">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price ($)</th>
            <th>Published at</th>
          </tr>
        </thead>
        <tbody>
          <td>{newProduct.title}</td>
          <td>{newProduct.description}</td>
          <td>{newProduct.price}</td>
          <td>{formatDate(newProduct.createdAt)}</td>
        </tbody>
      </table>
    </div>
  );
};

export default ShowProduct;
