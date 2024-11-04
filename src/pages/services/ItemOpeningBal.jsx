/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, useRef } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";

function ItemOpening() {
    const [facilityName, setFacilityName] = useState("");
   const [openItem, setOpenItem] = useState([]); // To handle tour types
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



    useEffect(() => {
        
        const fetchAccount = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/accountHead`);
                setOpenItem(response.data);
            } catch (error) {
                console.error('Error fetching account:', error);
            }
        };
        fetchAccount()

    }, []);
    const handleSave = async () => {
        if (!facilityName || !selectedTourType) {
            alert("Please enter both a facility name and tour type.");
            return;
        }

        const dataToSend = {
            facilityName,
            tourName: selectedTourType,
        };

        console.log("Data to send to backend:", dataToSend);
    }; const data = [
        {
            SR: 1,
            MAIN_HEAD: "Revenue",
            SUB_HEAD: "Product Sales",
            CODE: "R101",
            TITLE: "Online Store Sales",
            OPENING: 15000,
            balance:1200,
        },
    ];



    const handleEdit = async (id) => {
        const updatedFacilityName = prompt("Enter the new facility name:");
        if (!updatedFacilityName) return;
    };

    const handleDelete = async (id) => {
        if (!id) {
            console.error("Facility ID is undefined.");
            return;
        }

        if (!window.confirm("Are you sure you want to delete this facility?"))
            return;
    };

    return (
        <>
            <div className="flex justify-center mb-4 py-3 bg-[#3116ae]">
                <h4 className="text-white text-2xl font-extrabold">ITEMS OPENING BALANCES</h4>
            </div>
            <div className="bg-white mx-auto w-[55rem] border mt-4 p-6 shadow-md rounded-md">
                <div className="grid grid-cols-3 gap-6 mb-4">

                    {/* Main Head */}
                    <div className="flex flex-col gap-1">
                        <label className="text-gray-800 font-semibold">Head</label>
                        <div ref={dropdownRef} className="relative">
                            <div
                                className="flex items-center justify-between w-[16.5rem] border rounded px-2 py-1 cursor-pointer"
                                onClick={toggleTourTypeDropdown}
                            >
                                <input
                                    type="text"
                                    className="bg-transparent text-gray-800 text-sm outline-none cursor-pointer w-full"
                                    value={selectedTourType || "Select Main Head"}
                                    readOnly
                                />
                                <span className="ml-2 text-gray-800">▼</span>
                            </div>
                            {isTourTypeDropdownOpen && (
                                <div className="absolute mt-1 w-full bg-white shadow-lg rounded max-h-40 overflow-auto z-50">
                                    <ul className="divide-y divide-gray-100">
                                        {openItem.map((head, index) => (
                                            <li
                                                className="px-4 py-2 text-gray-800 hover:bg-blue-100 cursor-pointer"
                                                key={index}
                                                onClick={() => setSelectedTourType(head.headName)}
                                            >
                                                {head.headName}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Account Title */}
                    <div className="flex flex-col gap-1">
                        <label className="text-gray-800 font-semibold">Account Title</label>
                        <input
                            type="text"
                            className="bg-transparent text-gray-800 text-sm border rounded px-3 py-2 outline-none w-[14rem]"
                            placeholder="Enter account title"
                            value={facilityName}
                            onChange={(e) => setFacilityName(e.target.value)}
                        />
                    </div>

                    {/* Opening Date */}
                    <div className="flex flex-col gap-1">
                        <label className="text-gray-800 font-semibold">Opening Date</label>
                        <input
                            type="date"
                            className="bg-transparent text-gray-800 text-sm border rounded px-3 py-2 outline-none w-[14rem]"
                        // value={openingDate}
                        // onChange={(e) => setOpeningDate(e.target.value)}
                        />
                    </div>
                </div>


                <div className="flex justify-center">
                    <button
                        className="bg-[#3116ae] text-white text-md font-bold w-40 py-2 mt-2 rounded-full hover:bg-blue-600"
                        onClick={handleSave}
                    >
                        SAVE
                    </button>
                </div>
            </div>

            <div className="mt-6 max-w-full mx-4">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">SR.#</th>
                            <th className="border px-4 py-2">MAIN GROUP</th>
                            <th className="border px-4 py-2">SUB GROUP</th>
                            <th className="border px-4 py-2">ACCOUNT CODE</th>
                            <th className="border px-4 py-2">ACCOUNT TITLE</th>
                            <th className="border px-4 py-2">DR. BALANCE</th>
                            <th className="border px-4 py-2">CR. BALANCE</th>
                            <th className="border px-4 py-2">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data) ? (
                            data.map((facility, index) => (
                                <tr key={facility._id}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{facility.MAIN_HEAD}</td>
                                    <td className="border px-4 py-2">{facility.SUB_HEAD}</td>
                                    <td className="border px-4 py-2">{facility.CODE}</td>
                                    <td className="border px-4 py-2">{facility.TITLE || ""}</td>
                                    <td className="border px-4 py-2">{facility.OPENING || ""}</td>
                                    <td className="border px-4 py-2">{facility.balance || ""}</td>
                                    <td className="border px-4 py-3 flex justify-center space-x-4">
                                        <FaEdit
                                            className="text-blue-600 cursor-pointer"
                                            onClick={() => handleEdit(facility._id)}
                                            aria-label={`Edit ${facility.destinationName}`}
                                        />
                                        <FaTrashAlt
                                            className="text-red-600 cursor-pointer"
                                            onClick={() => handleDelete(facility._id)}
                                            aria-label={`Delete ${facility.destinationName}`}
                                        />
                                    </td> </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="border px-4 py-2 text-center">
                                    No data found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ItemOpening;
