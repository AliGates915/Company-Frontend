/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';

function ServicesTypes() {
  const [tourName, setTourName] = useState('');
  const [tourTypes, setTourTypes] = useState([]);

  // Fetch all tour types when the component mounts
  useEffect(() => {
    fetchTourTypes();
  }, []);

  const fetchTourTypes = async () => {
    try {
      const response = await axios.get('/tours');
      setTourTypes(response.data);
    } catch (error) {
      console.error('Error fetching tour types:', error);
    }
  };

  const handleSave = async () => {
    if (!tourName) {
      alert('Please enter a tour name.');
      return;
    }

    try {
      const response = await axios.post('/tours', { tourName });
      setTourTypes([...tourTypes, response.data]);
      setTourName(''); // Clear the input after saving
    } catch (error) {
      console.error('Error saving tour type:', error);
    }
  };

  const handleEdit = async (id) => {
    const updatedTourName = prompt('Enter the new tour name:');
    if (!updatedTourName) return;

    try {
      const response = await axios.put(`/tours/${id}`, { tourName: updatedTourName });
      setTourTypes(tourTypes.map(tour => (tour._id === id ? response.data : tour)));
    } catch (error) {
      console.error('Error updating tour type:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tour?')) return;

    try {
      await axios.delete(`/tours/${id}`);
      setTourTypes(tourTypes.filter(tour => tour._id !== id));
    } catch (error) {
      console.error('Error deleting tour type:', error);
    }
  };

  return (
    <div className='bg-[#f4fcfe] mx-[18rem] w-88 border-blue border mt-20'>
      <h1 className='flex justify-start text-2xl font-bold mt-4 pl-8 text-blue'>
        Tour Types
      </h1>

      <div className='grid grid-cols-1 mt-2 mx-[2rem]'>
        <div className="mb-4">
          <label htmlFor="services" className="flex justify-start font-semibold text-gray-800 mb-2">
            Select a Tour
          </label>
          <div className="relative">
            {/* Input field */}
            <div className="flex items-center justify-between w-full border rounded-xl border-blue px-2 py-2 cursor-pointer">
              <input
                type="text"
                className="bg-transparent text-sm text-gray-900 outline-none cursor-pointer w-full"
                placeholder="Enter tour"
                value={tourName}
                onChange={(e) => setTourName(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className='pb-6'>
          <button
            className="bg-blue text-white text-md font-bold w-full py-2 mt-2 rounded-full hover:bg-[#005a59]"
            onClick={handleSave}
          >
            SAVE
          </button>
        </div>
      </div>

      {/* Display Tour Types in a Table */}
      <div className='mt-12'>
        <table className='min-w-full border-collapse'>
          <thead>
            <tr>
              <th className='border px-4 py-2'>#</th>
              <th className='border px-4 py-2'>Tour Name</th>
              <th className='border px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tourTypes.map((tour, index) => (
              <tr key={tour._id}>
                <td className='border px-4 py-2'>{index + 1}</td>
                <td className='border px-4 py-2'>{tour.tourName}</td>
                <td className='border px-4 py-2 flex justify-center space-x-4'>
                  <FaEdit
                    className='text-blue-600 cursor-pointer'
                    onClick={() => handleEdit(tour._id)}
                  />
                  <FaTrashAlt
                    className='text-red-600 cursor-pointer'
                    onClick={() => handleDelete(tour._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ServicesTypes;
