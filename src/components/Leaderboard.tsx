import React, { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  wins: number;
}

const Leaderboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get('http://localhost:3001/api/leaderboard');
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSort = () => {
    const order = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(order);
    const sortedUsers = [...users].sort((a, b) => {
      if (order === 'asc') return a.wins - b.wins;
      return b.wins - a.wins;
    });
    setUsers(sortedUsers);
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-3xl font-bold text-center">Casino Leaderboard</h1>
      <input 
        type="text" 
        placeholder="Search" 
        value={search} 
        onChange={handleSearch} 
        className="mb-4 input"
      />
      <button onClick={handleSort} className="mb-4 button">
        Sort by Wins ({sortOrder})
      </button>
      <table className="table">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Wins</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id} className="text-center hover:bg-gray-100">
              <td className="py-2">{user.name}</td>
              <td className="py-2">{user.wins}</td>
              <td className="py-2">
                <button 
                  onClick={() => handleDelete(user.id)} 
                  className="button-red"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
