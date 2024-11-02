import React from "react";

type UserValues = {
    name: string;
    email: string;
    password: string;
    bank: number;
  };
  

type UserTableProps = {
  user: UserValues;
};

const ShowUser: React.FC<UserTableProps> = ({ user }) => {
  return (
    <div className="Table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Bank ($)</th>
          </tr>
        </thead>
        <tbody>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.bank}</td>
        </tbody>
      </table>
    </div>
  );
};

export default ShowUser;
