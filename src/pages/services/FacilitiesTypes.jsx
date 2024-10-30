/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useEffect, useRef } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
function FacilitiesTypes() {
  const [facilityName, setFacilityName] = useState("");
  const [facilityTypes, setFacilityTypes] = useState([]);
  const [tourTypes, setTourTypes] = useState([]); // To handle tour types
  const [isTourTypeDropdownOpen, setIsTourTypeDropdownOpen] = useState(false);
  const [selectedTourType, setSelectedTourType] = useState("");

  const dropdownRef = useRef(null); // Ref for the dropdown

  // Toggle function for dropdown
  const toggleTourTypeDropdown = () => {
    setIsTourTypeDropdownOpen((prev) => !prev);
  };

  const closeDropdowns = () => {
    setIsTourTypeDropdownOpen(false);
  };

  useEffect(() => {
    fetchTourTypes();
    fetchFacilityTypes();

    // Event listener for outside click
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdowns();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchTourTypes = async () => {
    try {
      const response = await axios.get("/tours"); // Adjust the endpoint as necessary
      setTourTypes(response.data);
      console.log("Fetched tour types:", response.data);
    } catch (error) {
      console.error("Error fetching tour types:", error);
      
    }
  };

  const fetchFacilityTypes = async () => {
    try {
      const response = await axios.get("/facility");
      console.log("Fetched facility types:", response.data);
      setFacilityTypes(response.data); // Make sure response.data is an array
    } catch (error) {
      console.error("Error fetching facility types:", error);
    }
  };

  const handleTourTypeSelect = (tourTypeName) => {
    setSelectedTourType(tourTypeName);
    setIsTourTypeDropdownOpen(false); // Close dropdown after selection
    console.log("Tour type selected:", tourTypeName);
  };

  const handleSave = async () => {
    if (!facilityName || !selectedTourType) {
      alert("Please enter both a facility name and tour type.");
      return;
    }

    const dataToSend = {
      facilityName, // String
      tourName: selectedTourType, // Selected tour type
    };

    console.log("Data to send to backend:", dataToSend);

    try {
      const response = await axios.post("/facility", dataToSend); // Adjust the endpoint as necessary
      console.log("Saved facility response:", response.data);
      setFacilityTypes([...facilityTypes, response.data]); // Update facilityTypes
      setFacilityName("");
      setSelectedTourType("");
    } catch (error) {
      console.error("Error saving facility:", error);
    }
  };

  const handleEdit = async (id) => {
    const updatedFacilityName = prompt("Enter the new facility name:");
    if (!updatedFacilityName) return;

    try {
      const response = await axios.put(`/facility/${id}`, {
        facilityName: updatedFacilityName,
      });
      setFacilityTypes(
        facilityTypes.map((facility) =>
          facility._id === id ? response.data : facility
        )
      );
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("You are not authorized. Redirecting to login.");
        window.location.href = "/login";
      } else {
        console.error("Error updating facility:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error("Facility ID is undefined.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this facility?"))
      return;

    try {
      await axios.delete(`/facility/${id}`); // Adjust the endpoint as necessary
      setFacilityTypes(facilityTypes.filter((facility) => facility._id !== id));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("You are not authorized. Redirecting to login.");
        window.location.href = "/login";
      } else {
        console.error("Error deleting facility:", error);
      }
    }
  };

  return (
    <>
      <div className="bg-[#f3f7f8] mx-[18rem] w-[24rem] border-blue border mt-20">
        <h1 className="flex justify-start text-2xl font-bold mt-4 pl-8 text-blue">
          Facility Types
        </h1>

        <div className="grid grid-cols-1 mt-2 mx-[2rem]">
          <div className="col-span-1">
            <label className="text-gray-800 font-semibold">Package Type</label>
            <div className="relative" ref={dropdownRef}>
              {/* Dropdown input */}
              <div
                className="flex items-center justify-between w-full border rounded-xl border-blue px-2 py-2 cursor-pointer"
                onClick={toggleTourTypeDropdown}
              >
                <input
                  type="text"
                  className="bg-transparent text-gray-800 text-sm outline-none cursor-pointer w-full"
                  value={selectedTourType || "Select a tour type"}
                  readOnly
                />
                <span className="ml-2 text-gray-800">▼</span>
              </div>

              {/* Dropdown list */}
              {isTourTypeDropdownOpen && (
                <div className="absolute mt-1 w-full bg-white shadow-lg rounded-xl max-h-40 overflow-auto z-50">
                  <ul className="divide-y divide-gray-100">
                    {tourTypes.map((tour, index) => (
                      <li
                        className="px-4 py-2 text-gray-800 hover:bg-blue-100 cursor-pointer"
                        key={index}
                        onClick={() => handleTourTypeSelect(tour.tourName)}
                      >
                        {tour.tourName}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Facility input */}
          <div className="mb-4">
            <label
              htmlFor="facilityName"
              className="flex justify-start font-semibold text-gray-800 mb-2"
            >
              Enter Facility
            </label>
            <div className="relative">
              <input
                id="facilityName"
                type="text"
                className="bg-transparent text-sm text-gray-900 outline-none w-full border rounded-xl border-blue px-2 py-2"
                placeholder="Enter facility"
                value={facilityName}
                onChange={(e) => setFacilityName(e.target.value)}
              />
            </div>
          </div>

          {/* Save button */}
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

      {/* Table section */}
      <div className="mt-6 max-w-full mx-3">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Serial No.#</th>
              <th className="border px-4 py-2">Tour Name</th>
              <th className="border px-4 py-2">Facility Name</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(facilityTypes) ? (
              facilityTypes.map((facility, index) => (
                <tr key={facility._id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{facility.tourName}</td>
                  <td className="border px-4 py-2">{facility.facilityName}</td>
                  <td className="border px-4 py-3 flex justify-center space-x-4">
                    <FaEdit
                      className="text-blue-600 cursor-pointer"
                      onClick={() => handleEdit(facility._id)}
                    />
                    <FaTrashAlt
                      className="text-red-600 cursor-pointer"
                      onClick={() => handleDelete(facility._id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border px-4 py-2 text-center">
                  No facilities found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default FacilitiesTypes;
