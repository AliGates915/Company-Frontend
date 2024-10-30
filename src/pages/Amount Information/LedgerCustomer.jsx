/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react';
import axios from 'axios'

const CustomerLedger = () => {
  const [customer, setCustomer] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [balance, setBalance] = useState();

  const [userData, setUserData] = useState([]);

  // Fetch user data on component mount
  const fetchUser = async () => {
    try {
      const response = await axios.get('/customizePackage'); // Assuming your route is prefixed with `/api`
      // Format the date for each entry
      const formattedData = response.data.map(entry => ({
        ...entry,
        formattedDateTo: new Date(entry.dateTo).toISOString().split('T')[0]
      }));

      setUserData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="container  p-6 text-gray-800">
      <h2 className="text-xl font-semibold text-blue text-center mb-4">CUSTOMER LEDGER</h2>

      {/* Customer selection and date range filters */}
      <div className="flex items-center gap-4 justify-between mb-6 text-white">
        <div className="w-1/4 text-gray-500">
          <label htmlFor="customer" className="text-white block text-sm font-medium">
            Customer
          </label>
          <select
            id="customer"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="block w-full mt-1  border border-gray-300 rounded-md shadow-sm py-2 px-3 "
          >
            <option value="">Select a Customer</option> {/* Default option */}
            {userData.map((entry) => (
              <option key={entry.id} value={entry.username}>
                {entry.username}
              </option>
            ))}
          </select>
        </div>

        <div className="w-1/4">
          <label htmlFor="dateFrom" className="block text-sm font-medium">
            Date From
          </label>
          <input
            type="date"
            id="dateFrom"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>

        <div className="w-1/4">
          <label htmlFor="dateTo" className="block text-sm font-medium">
            Date To
          </label>
          <input
            type="date"
            id="dateTo"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>

        <div className="w-1/4">
          <label htmlFor="balance" className="block text-sm font-medium">
            Balance
          </label>
          <input
            type="number"
            id="balance"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>
      </div>

      {/* Ledger Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full ">
          <thead>
            <tr className="bg-blue text-white">
              <th className="px-4 py-2">SR.#</th>
              <th className="px-4 py-2">DATE</th>
              <th className="px-4 py-2">BOOKING  ID</th>
              <th className="px-4 py-2">DESCRIPTION</th>
              <th className="px-4 py-2">DEBIT</th>
              <th className="px-4 py-2">CREDIT</th>
              <th className="px-4 py-2">BALANCE</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((entry, index) => (
              <tr key={entry.id} className={index % 2 === 0 ? 'bg-gray-400 ' : 'bg-gray-300 '}>
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2 text-center">{entry.formattedDateTo}</td>

                <td className="border px-4 py-2 text-center">{entry.booking_id}</td>
                <td className="border px-4 py-2">
                  {entry.username}  Going to {entry.countryName} for {entry.tourType}
                </td>
                <td className="border px-4 py-2 text-right">{entry.installmentCount || 0}</td>
                <td className="border px-4 py-2 text-right">{entry.installmentAmount || entry.totalAmount}</td>
                <td className="border px-4 py-2 text-right">{entry.totalAmount || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default CustomerLedger;
