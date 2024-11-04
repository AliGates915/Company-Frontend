/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";

function Designation() {
  const [countryName, setCountry] = useState("");
  const [cityName, setCity] = useState("");
  const [destinationName, setDestinationsName] = useState("");
  const [destinations, setDestinations] = useState([]);
  
  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/destination`);
      console.log("Fetched designations:", response.data);
      setDestinations(response.data);
    } catch (error) {
      console.error("Error fetching designations:", error);
    }
  };

  const handleSave = async () => {
    if (!countryName || !cityName || !destinationName) {
      alert("Please fill in all fields.");
      return;
    }
    const dataToSend = {
        countryName,
        cityName,
        destinationName,
    };

    console.log("Data to send to backend:", dataToSend);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/destination`, dataToSend);
      console.log("Saved facility response:", response.data);
      setDestinations([...destinations, response.data]);
      setCountry("");
      setCity("");
      setDestinationsName("");
    } catch (error) {
      console.error(
        "Error saving destination:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleEdit = async (id) => {
    const updatedDesignationName = prompt("Enter the new destination name:");
    if (!updatedDesignationName) return;

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/destination/${id}`, {
        destinationName: updatedDesignationName,
      });
      setDestinations(
        destinations.map((destination) =>
          destination._id === id ? response.data : destination
        )
      );
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("You are not authorized. Redirecting to login.");
        window.location.href = "/login";
      } else {
        console.error("Error updating destination:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this destination?"))
      return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/destination/${id}`);
      setDestinations(
        destinations.filter((destination) => destination._id !== id)
      );
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("You are not authorized. Redirecting to login.");
        window.location.href = "/login";
      } else {
        console.error("Error deleting destination:", error);
      }
    }
  };

  return (
    <>
      <div className="bg-[#f3f7f8] mx-[18rem] w-[24rem] border-blue border mt-10">
        <h1 className="flex justify-start text-2xl font-bold mt-4 pl-8 text-blue">
          Destinations
        </h1>

        <div className="grid grid-cols-1 mt-2 mx-[2rem]">
          <div className="mb-4">
            <label
              htmlFor="country"
              className="flex justify-start font-semibold text-gray-800 mb-2"
            >
              Enter Country *
            </label>
            <div className="relative">
              <input
                id="countryName"
                type="text"
                className="bg-transparent text-sm text-gray-900 outline-none w-full border rounded-xl border-blue px-2 py-2"
                placeholder="Enter country name"
                value={countryName}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="city"
              className="flex justify-start font-semibold text-gray-800 mb-2"
            >
              Enter City *
            </label>
            <div className="relative">
              <input
                id="cityName"
                type="text"
                className="bg-transparent text-sm text-gray-900 outline-none w-full border rounded-xl border-blue px-2 py-2"
                placeholder="Enter city name"
                value={cityName}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="designationName"
              className="flex justify-start font-semibold text-gray-800 mb-2"
            >
              Enter Destination
            </label>
            <div className="relative">
              <input
                id="designationName"
                type="text"
                className="bg-transparent text-sm text-gray-900 outline-none w-full border rounded-xl border-blue px-2 py-2"
                placeholder="Enter destination name"
                value={destinationName}
                onChange={(e) => setDestinationsName(e.target.value)}
              />
            </div>
          </div>

          <div className="pb-6 flex justify-center">
            <button
              className="bg-blue text-white text-md font-bold w-40 py-2 mt-2 rounded-full hover:bg-[#005a59]"
              onClick={handleSave}
            >
              SAVE
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 max-w-full mx-3">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Serial No.#</th>
              <th className="border px-4 py-2">Country</th>
              <th className="border px-4 py-2">City</th>
              <th className="border px-4 py-2">Destination</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(destinations) && destinations.length > 0 ? (
              destinations.map((destination, index) => (
                <tr key={destination._id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{destination.countryName}</td>
                  <td className="border px-4 py-2">{destination.cityName}</td>
                  <td className="border px-4 py-2">
                    {destination.destinationName}
                  </td>
                  <td className="border px-4 py-3 flex justify-center space-x-4">
                    <FaEdit
                      className="text-blue-600 cursor-pointer"
                      onClick={() => handleEdit(destination._id)}
                      aria-label={`Edit ${destination.destinationName}`}
                    />
                    <FaTrashAlt
                      className="text-red-600 cursor-pointer"
                      onClick={() => handleDelete(destination._id)}
                      aria-label={`Delete ${destination.destinationName}`}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border px-4 py-2 text-center">
                  No destinations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Designation;
