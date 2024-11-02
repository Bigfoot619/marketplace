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
  products: Product[];
};

const ShowProducts: React.FC<ProductTableProps> = ({ products }) => {
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
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{formatDate(product.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowProducts;
