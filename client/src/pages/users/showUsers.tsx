import React from 'react';


type UserValues = {
    name: string;
    email: string;
    password: string;
    bank: number;
  };
  

type UserTableProps = {
  users: UserValues[];
};


const ShowUsers: React.FC<UserTableProps> = ({ users }) => {
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
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.bank}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShowUsers;
