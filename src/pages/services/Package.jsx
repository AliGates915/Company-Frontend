/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";

function PackagesTypes() {
  const [packageName, setPackageName] = useState("");
  const [packageTypes, setPackageTypes] = useState([]);
 

  const handleSave = async () => {
    if (!packageName) {
      alert("Please fill in all fields.");
      return;
    }
    const dataToSend = {
      packageName,
    };
  
    // console.log("Data to send to backend:", dataToSend);
  
    try {
      const response = await axios.post("/packages", dataToSend);
      // console.log("Saved packages response:", response.data);
      // Check if response.data is a valid package object before updating state
      if (response.data && response.data._id) {
        setPackageTypes([...packageTypes, response.data]);
      } else {
        console.error("Invalid package data received:", response.data);
      }
      setPackageName("");
    } catch (error) {
      console.error(
        "Error saving packages:",
        error.response ? error.response.data : error.message
      );
    }
  };
  

  useEffect(() => {
    fetchPackageTypes();
  }, []);

  const fetchPackageTypes = async () => {
    try {
      const response = await axios.get("/packages");
      setPackageTypes(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching packages types:", error);
    }
  };
  
  const handleEdit = async (id) => {
    const updatedPackageName = prompt("Enter the new package name:");
    if (!updatedPackageName) return;
  
    try {
      const response = await axios.put(`/packages/${id}`, {
        packageName: updatedPackageName,
      });
      // Only update the state if response contains updated package data
      if (response.data) {
        setPackageTypes((prev) =>
          prev.map((pkg) => (pkg._id === id ? response.data : pkg))
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("You are not authorized. Redirecting to login.");
        window.location.href = "/login";
      } else {
        console.error("Error updating package type:", error);
      }
    }
  };
  

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?"))
      return;

    try {
      await axios.delete(`/packages/${id}`);
      setPackageTypes(packageTypes.filter((packages) => packages._id !== id));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("You are not authorized. Redirecting to login.");
        window.location.href = "/login";
      } else {
        console.error("Error deleting facility type:", error);
      }
    }
  };

  return (
    <>
      <div className="bg-[#f3f7f8] mx-[18rem] w-[24rem] border-blue border mt-20">
        <h1 className="flex justify-start text-2xl font-bold mt-4 pl-8 text-blue">
          Package Types
        </h1>

        <div className="grid grid-cols-1 mt-2 mx-[2rem]">
          <div className="mb-4">
            <label
              htmlFor="services"
              className="flex justify-start font-semibold text-gray-800 mb-2"
            >
              Enter Package
            </label>
            <div className="relative">
              <div className="flex items-center justify-between w-full border rounded-xl border-blue px-2 py-2 cursor-pointer">
                <input
                  id="packageName"
                  type="text"
                  className="bg-transparent text-sm text-gray-900 outline-none w-full"
                  placeholder="Enter package"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="pb-6 flex justify-center ">
            <button
              className="bg-blue text-white items-center text-md font-bold w-40 py-2 mt-2 rounded-full hover:bg-[#005a59]"
              onClick={handleSave}
            >
              SAVE
            </button>
          </div>
        </div>
      </div>
      {/* Display package Types in a Table */}
      <div className="mt-6 max-w-full mx-3">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Serial No.#</th>
              <th className="border px-4 py-2">Package Name</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(packageTypes) && packageTypes.length > 0 ? (
              packageTypes.map((packages, index) => (
                <tr key={packages._id}>
                  <td className="border px-4 py-2 ">{index + 1}</td>
                  <td className="border px-4 py-2">{packages.packageName}</td>
                  <td className="border px-4 py-3 flex justify-center space-x-4">
                    <FaEdit
                      className="text-blue-600 cursor-pointer"
                      onClick={() => handleEdit(packages._id)}
                    />
                    <FaTrashAlt
                      className="text-red-600 cursor-pointer"
                      onClick={() => handleDelete(packages._id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border px-4 py-2 text-center">
                  No packages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PackagesTypes;
