/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, useRef } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

function AccountHead() {
    const [facilityName, setFacilityName] = useState("");
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
    };const data = [
        {
          SR: 1,
          MAIN_HEAD: "Revenue",
          SUB_HEAD: "Product Sales",
          CODE: "R101",
          TITLE: "Online Store Sales",
          OPENING: 15000,
        },
        {
          SR: 2,
          MAIN_HEAD: "Expenses",
          SUB_HEAD: "Marketing",
          CODE: "E201",
          TITLE: "Social Media Ads",
          OPENING: 3000,
        },
        {
          SR: 3,
          MAIN_HEAD: "Assets",
          SUB_HEAD: "Inventory",
          CODE: "A301",
          TITLE: "Warehouse Supplies",
          OPENING: 12000,
        },
        {
          SR: 4,
          MAIN_HEAD: "Liabilities",
          SUB_HEAD: "Loans",
          CODE: "L401",
          TITLE: "Bank Loan",
          OPENING: 50000,
        },
        {
          SR: 5,
          MAIN_HEAD: "Revenue",
          SUB_HEAD: "Subscription Services",
          CODE: "R102",
          TITLE: "Premium Memberships",
          OPENING: 8000,
        },
        {
          SR: 6,
          MAIN_HEAD: "Expenses",
          SUB_HEAD: "Salaries",
          CODE: "E202",
          TITLE: "Employee Wages",
          OPENING: 25000,
        },
        {
          SR: 7,
          MAIN_HEAD: "Assets",
          SUB_HEAD: "Property",
          CODE: "A302",
          TITLE: "Office Building",
          OPENING: 100000,
        },
        {
          SR: 8,
          MAIN_HEAD: "Revenue",
          SUB_HEAD: "Consulting",
          CODE: "R103",
          TITLE: "Consulting Fees",
          OPENING: 12000,
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
                <h4 className="text-white text-2xl font-extrabold">ACCOUNT HEADS</h4>
            </div>
            <div className="bg-white mx-auto w-[40rem] border mt-4 p-4 shadow-md rounded-md">
                <div className="grid grid-cols-2 gap-4 mb-2">
                    {/* company */}
                    <div>
                        <label className="text-gray-800 font-semibold">Company</label>
                        <div ref={dropdownRef} className="relative">
                            <div
                                className="flex items-center justify-between w-[24rem] border rounded px-2 py-2 cursor-pointer"
                                onClick={toggleTourTypeDropdown}
                            >
                                <input
                                    type="text"
                                    className="bg-transparent text-gray-800 text-sm outline-none cursor-pointer w-full"
                                    value={selectedTourType || "Select Company Name"}
                                    readOnly
                                />
                                <span className="ml-2 text-gray-800">▼</span>
                            </div>
                            {isTourTypeDropdownOpen && (
                                <div className="absolute mt-1 w-full bg-white shadow-lg rounded max-h-40 overflow-auto z-50">
                                    <ul className="divide-y divide-gray-100">
                                        {tourTypes.map((tour, index) => (
                                            <li
                                                className="px-4 py-2 text-gray-800 hover:bg-blue-100 cursor-pointer"
                                                key={index}
                                                onClick={() => setSelectedTourType(tour.tourName)}
                                            >
                                                {tour.tourName}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="text-gray-800 ml-28 font-semibold">Code</label>
                        <div className="relative">
                            <input
                                type="text"
                                className="bg-transparent text-sm ml-28 text-gray-800 outline-none w-[8rem] border rounded px-2 py-2"
                                placeholder="02"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="text-gray-800 font-semibold">Head</label>
                        <div ref={dropdownRef} className="relative">
                            <div
                                className="flex items-center justify-between w-[24rem] border rounded px-2 py-2 cursor-pointer"
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
                                        {tourTypes.map((tour, index) => (
                                            <li
                                                className="px-4 py-2 text-gray-800 hover:bg-blue-100 cursor-pointer"
                                                key={index}
                                                onClick={() => setSelectedTourType(tour.tourName)}
                                            >
                                                {tour.tourName}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* code */}
                    <div>
                        <label className="text-gray-800 ml-28 font-semibold">Code</label>
                        <div className="relative">
                            <input
                                type="text"
                                className="bg-transparent text-sm ml-28 text-gray-800 outline-none w-[8rem] border rounded px-2 py-2"
                                placeholder="02"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-gray-800 font-semibold">Sub Head</label>
                        <div ref={dropdownRef} className="relative">
                            <div
                                className="flex items-center justify-between w-[24rem] border rounded px-2 py-2 cursor-pointer"
                                onClick={toggleTourTypeDropdown}
                            >
                                <input
                                    type="text"
                                    className="bg-transparent text-gray-800 text-sm outline-none cursor-pointer w-full"
                                    value={selectedTourType || "Select Sub Head"}
                                    readOnly
                                />
                                <span className="ml-2 text-gray-800">▼</span>
                            </div>
                            {isTourTypeDropdownOpen && (
                                <div className="absolute mt-1 w-full bg-white shadow-lg rounded max-h-40 overflow-auto z-50">
                                    <ul className="divide-y divide-gray-100">
                                        {tourTypes.map((tour, index) => (
                                            <li
                                                className="px-4 py-2 text-gray-800 hover:bg-blue-100 cursor-pointer"
                                                key={index}
                                                onClick={() => setSelectedTourType(tour.tourName)}
                                            >
                                                {tour.tourName}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* code */}
                    <div>
                        <label className="text-gray-800 ml-28 font-semibold">Code</label>
                        <div className="relative">
                            <input
                                type="text"
                                className="bg-transparent text-sm ml-28 text-gray-800 outline-none w-[8rem] border rounded px-2 py-2"
                                placeholder="04"
                            />
                        </div>
                    </div>

                    {/* account Title */}
                    <div>
                        <label className="text-gray-800 font-semibold">Account Title</label>
                        <input
                            type="text"
                            className="bg-transparent text-sm text-gray-800 outline-none w-[24rem] border rounded px-2 py-2"
                            placeholder="Enter account title"
                            value={facilityName}
                            onChange={(e) => setFacilityName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-gray-800 ml-28 font-semibold">Code</label>
                        <div className="relative">
                            <input
                                type="text"
                                className="bg-transparent text-sm ml-28 text-gray-800 outline-none w-[8rem] border rounded px-2 py-2"
                                placeholder="02-02-01"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-800 font-semibold">Description</label>
                        <textarea
                            type="text"
                            rows={3}
                            className="bg-transparent text-sm  text-gray-800 outline-none w-[34.5rem] border rounded px-2 py-2"
                            placeholder="Enter Description"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-2">
                    <div className="relative flex flex-row items-center">
                        <label className="text-gray-800 font-normal">Opening Balance</label>
                        <input
                            type="text"
                            className="bg-transparent text-sm mr-8 text-gray-800 
                            outline-none w-[8rem] ml-3 border rounded px-2 py-2"
                            placeholder="balance..."
                            value={facilityName}
                            onChange={(e) => setFacilityName(e.target.value)}
                        />
                    </div>
                    {/* opening date */}
                    <div className="relative flex flex-row items-center">
                        <label className="text-gray-800 font-normal">Opening Date</label>
                        <input
                            type="date"
                            className="bg-transparent text-sm ml-3 text-gray-800 outline-none
                             w-[8rem] border rounded px-2 py-2"
                            placeholder="balance..."
                            value={facilityName}
                            onChange={(e) => setFacilityName(e.target.value)}
                        />
                    </div>
                    {/* checkbox */}
                    <div className="grid grid-cols-2 gap-4 mb-2 w-full ml-32">
                        <div className="relative flex flex-row items-center ">
                            <input
                                type="checkbox"
                                className="bg-transparent text-sm mx-2 text-gray-800 outline-none
                             border rounded px-2 py-2"
                                placeholder="balance..."
                                value={facilityName}
                                onChange={(e) => setFacilityName(e.target.value)}
                            />
                            <label className="text-gray-800 font-normal">Debit Balance</label>
                        </div >

                        <div className="relative flex flex-row items-center ml-32 w-full">
                            <input
                                type="checkbox"
                                className="bg-transparent text-sm mx-2 text-gray-800 outline-none
                             border rounded px-2 py-2"
                                placeholder="balance..."
                                value={facilityName}
                                onChange={(e) => setFacilityName(e.target.value)}
                            />
                            <label className="text-gray-800 font-normal">Active Amount</label>
                        </div>
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
                            <th className="border px-4 py-2">MAIN HEAD</th>
                            <th className="border px-4 py-2">SUB HEAD</th>
                            <th className="border px-4 py-2">CODE</th>
                            <th className="border px-4 py-2">TITLE</th>
                            <th className="border px-4 py-2">OPENING</th>
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

export default AccountHead;
