import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import '../styles/globals.css';

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPhotos = async () => {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/photos');
      setPhotos(data);
    };
    fetchPhotos();
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleDelete = (id) => {
    setPhotos(photos.filter(photo => photo.id !== id));
  };

  const filteredPhotos = photos.filter(photo =>
    photo.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Photo Gallery</h1>
      <input 
        type="text" 
        placeholder="Search" 
        value={search} 
        onChange={handleSearch} 
        className="p-2 mb-4 border"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredPhotos.slice(0, 1000).map(photo => (
          <div key={photo.id} className="p-2 border">
            <h2 className="text-lg">{photo.title}</h2>
            <img src={photo.thumbnailUrl} alt={photo.title} className="w-full"/>
            <a href={photo.url} className="text-blue-500">View Full Image</a>
            <button 
              onClick={() => handleDelete(photo.id)} 
              className="p-2 mt-2 text-white bg-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photos;
