import React, {useEffect, useState} from 'react'
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import {Link, useNavigate} from  'react-router-dom'

import axios from 'axios';

function AllCompanies() {
    const [allCompanyTypes, setAllCompaniesTypes] = useState([]);
    const [displayCompanies, setDisplayCompanies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllCompanies();
    },[])
    const fetchAllCompanies = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/companies`); // Adjusted to match the router setup
            setAllCompaniesTypes(Array.isArray(response.data) ? response.data : []);
            setDisplayCompanies(response.data);
        } catch (error) {
            console.error("Error fetching packages types:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
            }
        }
    };

    
    const handleEdit = (companyId) => {
        // Navigate to the edit form or page with the company's ID in the route
        navigate(`${process.env.REACT_APP_API_URL}/info/edit/${companyId}`);
    };

    const handleDelete = async (id) => {
        if (!id) {
            console.error("Company ID is undefined.");
            return;
        }

        if (!window.confirm("Are you sure you want to delete this head?"))
            return;

        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/companies/${id}`); // Adjust the endpoint as necessary
            setAllCompaniesTypes(allCompanyTypes.filter((head) => head._id !== id));
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error("Error deleting head:", error);
            }
        }
    };


  return (
    <div className='mx-8 my-8'>
        <nav className='flex justify-between mb-6'>
            <div className='text-2xl font-extrabold text-[#7339ff] tracking-wide '>
                All Companies
            </div>
            <Link to='/info'>
            <button className='bg-[#5239c3] font-extrabold px-3 py-1 rounded-full transition-all duration-300 
            text-xl text-white tracking-wide flex items-center justify-center hover:bg-[#4a32b3] 
               hover:scale-105 hover:shadow-lg hover:shadow-[#4a32b3]/80'>
                +
            </button>
            </Link>
        </nav>
        <hr className='bg-gray-400'/>
        <div className="mt-6 max-w-full mx-4">
                <table className="min-w-full border-collapse shadow-xl">
                    <thead className='bg-[#7339ff] text-gray-50 text-sm'>
                        <tr>
                            <th className="border px-1 py-2">SR.#</th>
                            <th className="border px-1 py-2">CODE</th>
                            <th className="border px-4 py-2">COMPANY</th>
                            <th className="border px-4 py-2">PERSON</th>
                            <th className="border px-4 py-2">ADDRESS</th>
                            <th className="border px-4 py-2">CITY</th>
                            <th className="border px-4 py-2">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className='text-sm'>
                        {Array.isArray(displayCompanies) && setDisplayCompanies.length > 0 ? (
                            displayCompanies.map((companies, index) => (
                                <tr key={companies._id}>
                                    <td className="border px-4 py-2 ">{index + 1}</td>
                                    <td className="border px-4 py-2 ">{companies.companyCode}</td> 
                                    <td className="border px-4 py-2">{companies.companyName}</td> 
                                    <td className="border px-4 py-2">{companies.contactPerson}</td> 
                                    <td className="border px-4 py-2">{companies.address || "No Available"}</td> 
                                    <td className="border px-4 py-2">{companies.city || "No Available"}</td> 
                                    <td className="border px-4 py-3 flex justify-center space-x-4 ">
                                        <FaEdit
                                            className="text-blue-600 cursor-pointer"
                                            onClick={() => handleEdit(companies._id)}
                                            aria-label={`Edit ${companies.head}`}
                                        />
                                        <FaTrashAlt
                                            className="text-red-600 cursor-pointer"
                                            onClick={() => handleDelete(companies._id)}
                                            aria-label={`Delete ${companies.head}`}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="border px-4 py-2 text-center">
                                    No data found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
    </div>
  )
}

export default AllCompanies