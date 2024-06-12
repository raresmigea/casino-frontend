import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import '../styles/globals.css';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get('http://localhost:3001/api/leaderboard');
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleSearch = (event) => {
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

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Casino Leaderboard</h1>
      <input 
        type="text" 
        placeholder="Search" 
        value={search} 
        onChange={handleSearch} 
        className="border p-2 mb-4"
      />
      <button onClick={handleSort} className="bg-blue-500 text-white p-2 mb-4">
        Sort by Wins ({sortOrder})
      </button>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Wins</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id} className="text-center">
              <td className="py-2">{user.name}</td>
              <td className="py-2">{user.wins}</td>
              <td className="py-2">
                <button 
                  onClick={() => handleDelete(user.id)} 
                  className="bg-red-500 text-white p-2"
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
