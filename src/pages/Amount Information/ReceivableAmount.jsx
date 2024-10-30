import { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import axios from 'axios';

const ReceivableAmount = () => {
  const [userData, setUserData] = useState([]);

  // Fetch user data on component mount
  const fetchUser = async () => {
    try {
      const response = await axios.get('/customizePackage'); // Assuming your route is prefixed with `/api`
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="mt-6 container p-6">
      <h2 className="text-2xl font-semibold text-blue text-center mb-4">
        Amount Receivable Information
      </h2>
      
      {/* Search Bar */}
      <div className="flex w-80 ml-1 items-center rounded-xl gap-2 text-xs ring-[1.5px] ring-gray-600 px-2 mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-72 p-2 bg-transparent outline-none border-e-[1px] border-gray-600"
        />
        <span className="cursor-pointer">
          <FaSearch size={15} color="gray"/>
        </span>
      </div>
      
      {/* Ledger Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-blue text-white">
              <th className="px-4 py-2">SR.#</th>
              <th className="px-4 py-2">CUSTOMER NAME</th>
              <th className="px-4 py-2">BALANCE</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((entry, index) => (
              <tr key={entry._id} className='bg-white border border-gray-800'>
                <td className="border px-4 py-2 text-center">{index + 1}</td> {/* Serial number */}
                <td className="border px-4 py-2 text-center">{entry.username}</td> {/* Assuming "username" exists */}
                <td className="border px-4 py-2 text-center">{entry.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReceivableAmount;
