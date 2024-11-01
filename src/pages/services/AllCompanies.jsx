import React, {useEffect, useState} from 'react'
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import {Link} from  'react-router-dom'

import axios from 'axios';

function AllCompanies() {
    const [allCompanyTypes, setAllCompaniesTypes] = useState([]);;

    useEffect(() => {
        fetchAllCompanies();
    },[])
    const fetchAllCompanies = async () => {
        try {
            const response = await axios.get("https://company-backend-delta.vercel.app/api/companies"); // Adjusted to match the router setup
            setAllCompaniesTypes(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Error fetching packages types:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
            }
        }
    };

    
    const handleEdit = async (id) => {
        const updatedHeadName = prompt("Enter the new head name:");
        if (!updatedHeadName) return;

        try {
            const response = await axios.put(`https://company-backend-delta.vercel.app/api/companies/${id}`, {
                head: updatedHeadName,
            });
            setAllCompaniesTypes(
                allCompanyTypes.map((head) =>
                    head._id === id ? response.data : head
                )
            );
        } catch (error) {
            console.error("Error updating head:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!id) {
            console.error("Head ID is undefined.");
            return;
        }

        if (!window.confirm("Are you sure you want to delete this head?"))
            return;

        try {
            await axios.delete(`https://company-backend-delta.vercel.app/api/companies/${id}`); // Adjust the endpoint as necessary
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
            <div className='text-3xl font-extrabold text-[#7339ff] tracking-wide '>
                All Companies
            </div>
            <Link to='/info'>
            <button className='bg-[#5239c3]  px-4 py-2 rounded-sm 
            hover:rounded-lg text-md  text-white tracking-wide'>
                Add New Company
            </button>
            </Link>
        </nav>
        <hr className='bg-gray-400'/>
        <div className="mt-6 max-w-full mx-4">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">SR.#</th>
                            <th className="border px-4 py-2">COMPANY</th>
                            <th className="border px-4 py-2">CODE</th>
                            <th className="border px-4 py-2">ADDRESS</th>
                            <th className="border px-4 py-2">CITY</th>
                            <th className="border px-4 py-2">PERSON</th>
                            <th className="border px-4 py-2">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(allCompanyTypes) ? (
                            allCompanyTypes.map((companies, index) => (
                                <tr key={companies._id}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{companies.companyName}</td> 
                                    <td className="border px-4 py-2">{companies.companyCode}</td> 
                                    <td className="border px-4 py-2">{companies.address}</td> 
                                    <td className="border px-4 py-2">{companies.city || "No Available"}</td> 
                                    <td className="border px-4 py-2 ">{companies.contactPerson || "No Available"}</td> 
                                    <td className="border px-4 py-3 flex justify-center space-x-4">
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