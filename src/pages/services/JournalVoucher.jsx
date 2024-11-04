/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, useRef } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

function JournalVoucher() {
    const [facilityName, setFacilityName] = useState("");
    const [isTourTypeDropdownOpen, setIsTourTypeDropdownOpen] = useState(false);
    const [selectedTourType, setSelectedTourType] = useState("");

    const dropdownRef = useRef(null); // Ref for the dropdown

    // Toggle function for dropdown
   
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
                <h4 className="text-white text-2xl font-extrabold">JOURNAL VOUCHER</h4>
            </div>
            <div className="bg-white mx-auto w-[60rem] border mt-4 p-4 shadow-md rounded-md">
                <div className="grid grid-cols-2 gap-4 mb-2">
                    <div className="relative flex flex-row items-center">
                        <label className="text-gray-800 font-normal">Opening Balance</label>
                        <input
                            type="text"
                            className="bg-transparent text-sm ml-3 text-gray-800 
                            outline-none w-[12rem] border rounded px-2 py-2"
                            placeholder="balance..."
                            value={facilityName}
                            onChange={(e) => setFacilityName(e.target.value)}
                        />
                    </div>
                    {/* opening date */}
                    <div className="relative flex flex-row justify-end items-center gap-3">
                        <label className="text-gray-800 font-normal">Opening Date</label>
                        <input
                            type="date"
                            className="bg-transparent text-sm text-gray-800 
                            outline-none w-[16rem] border rounded px-2 py-2"
                            placeholder="balance..."
                            value={facilityName}
                            onChange={(e) => setFacilityName(e.target.value)}
                        />
                    </div>
                </div>  
                
                <div className="relative flex flex-row gap-3 max-w-full">
                        <label className="text-gray-800 font-semibold">Description</label>
                        <textarea
                            type="text"
                            rows={5}
                            className="bg-transparent text-sm  text-gray-800 outline-none 
                             w-full border rounded px-2 py-2"
                            placeholder="Enter Description"
                        />
                    </div>

                    {/* account code  */}

                    <div className="grid grid-cols-5 gap-4 mt-10">                    <div>
                        <label className="text-gray-800 font-semibold">Account Code</label>
                        <input
                            type="text"
                            className="bg-transparent text-sm text-gray-800 outline-none     
                            w-full border rounded px-2 py-2"
                            placeholder="Enter account title"
                            value={facilityName}
                            onChange={(e) => setFacilityName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-gray-800 font-semibold">Account Title</label>
                        <div className="relative">
                            <input
                                type="text"
                                className="bg-transparent text-sm text-gray-800 outline-none 
                            w-[12rem] border rounded px-2 py-2"
                                placeholder="Title"
                            />
                        </div>
                    </div>
                    
                    <div className="ml-6">
                        <label className="text-gray-800 font-semibold">Details</label>
                        <div className="relative">
                            <input
                                type="text"
                                className="bg-transparent text-sm text-gray-800 outline-none
                                 w-[14rem] border rounded px-2 py-2"
                                placeholder="Details"
                            />
                        </div>
                    </div>
                    <div className="absolute top-[20rem] right-[14rem]">
                        <h1 className="text-gray-900 font-bold text-md">AMOUNT</h1>
                    </div>
                    <div className="ml-28 ">
                        <label className="text-gray-800 font-semibold ml-8">DR.</label>
                        <div className="relative">
                            <input
                                type="text"
                                className="bg-transparent text-sm text-gray-800 outline-none 
                                w-[6rem] border rounded px-2 py-2"
                                placeholder="02-02-01"
                            />
                        </div>
                    </div>
                    
                    <div className="ml-10">
                        <label className="text-gray-800 font-semibold ml-8">CR.</label>
                        <div className="relative">
                            <input
                                type="text"
                                className="bg-transparent text-sm text-gray-800 outline-none 
                                w-[6rem] border rounded px-2 py-2"
                                placeholder="02-02-01"
                            />
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
                            <th className="border px-4 py-2">CODE</th>
                            <th className="border px-4 py-2">TITLE</th>
                            <th className="border px-4 py-2">NARRATION</th>
                            <th className="border px-4 py-2">DR.</th>
                            <th className="border px-4 py-2">CR.</th>
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

export default JournalVoucher;
