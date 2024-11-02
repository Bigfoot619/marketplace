import React from "react";
import "./showProducts.css";
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
  products: CompleteProduct[];
};

const ShowCProducts: React.FC<ProductTableProps> = ({ products }) => {
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
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.product.title}</td>
              <td>{product.product.description}</td>
              <td>{product.product.price}</td>
              <td>{formatDate(product.product.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowCProducts;
