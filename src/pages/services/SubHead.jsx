/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, useRef } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";

function SubHead() {
    const [subHeadName, setSubHeadName] = useState("");
    const [headCode, setHeadCode] = useState("");
    const [subHeadCode, setSubHeadCode] = useState("");
    const [companyCode, setCompanyCode] = useState("");
    const [headTypes, setHeadTypes] = useState([]);

    const [companyTypes, setCompanyTypes] = useState([]); // Fixed state declaration
    const [isCompanyTypeDropdownOpen, setIsCompanyTypeDropdownOpen] = useState(false);
    const [selectedCompanyType, setSelectedCompanyType] = useState("");

    const [isHeadTypeDropdownOpen, setIsHeadTypeDropdownOpen] = useState(false);
    const [selectedHeadType, setSelectedHeadType] = useState("");
    const [description, setDescription] = useState('');
    const [subHeadTypes, setSubHeadTypes] = useState([]);
    const [sequenceNumber, setSequenceNumber] = useState(1);

    const dropdownRef = useRef(null); // Ref for the dropdown

    const toggleCompanyTypeDropdown = () => {
        console.log('Toggling Dropdown');
        setIsCompanyTypeDropdownOpen((prev) => !prev);
    };

    const toggleHeadTypeDropdown = () => {
        setIsHeadTypeDropdownOpen((prev) => !prev);
    };

    const closeDropdowns = () => {
        setIsCompanyTypeDropdownOpen(false);
        setIsHeadTypeDropdownOpen(false);
    };

    useEffect(() => {
        fetchCompanyTypes(); 
        fetchHead();
        fetchSubHead();

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

    const fetchCompanyTypes = async () => {
        try {
            const response = await fetch('/companies'); // Adjust to actual API endpoint
            const data = await response.json();
            console.log('Fetched company data:', data); // Verify data structure
            if (Array.isArray(data) && data.length > 0 && data[0].hasOwnProperty('companyName')) {
                setCompanyTypes(data);
            } else {
                console.error("Unexpected company data structure:", data);
            }
        } catch (error) {
            console.error('Error fetching company types:', error);
        }
    };

    const handleHeadTypeSelect = (headName) => {
        const selectedHead = headTypes.find(head => head.headName === headName);

        if (selectedHead) {
            setSelectedHeadType(headName);
            setHeadCode(selectedHead.companyCode); // Set the head code based on selection
            setSubHeadCode(`${selectedHead.companyCode}${String(sequenceNumber).padStart(2, '0')}`); // Generate initial subhead code based on head
        } else {
            console.error("Selected head not found");
        }

        setIsHeadTypeDropdownOpen(false);
    };


    const handleCompanyTypeSelect = (companyName) => {
    const selectCompany = companyTypes.find(company => company.companyName === companyName);

    if (selectCompany) {
        setSelectedCompanyType(companyName);
        setCompanyCode(selectCompany.code);
        setHeadCode(`${selectCompany.code}${String(sequenceNumber).padStart(2, '0')}`);
        console.log("Selected Company Type:", companyName, "Company Code:", selectCompany.code); // Debugging output
    } else {
        console.error("Selected company not found");
    }

    setIsCompanyTypeDropdownOpen(false);
};

    const handleSubHeadChange = (e) => {
        setSubHeadName(e.target.value);
        // Generate the next subhead code based on current company and head codes
        const newSubHeadCode = `${companyCode}${String(sequenceNumber).padStart(2, '0')}`;
        setSubHeadCode(newSubHeadCode);
        // Increment the sequence number for the next subhead entry
        setSequenceNumber(prev => prev + 1);
    };



    const fetchHead = async () => {
        try {
            const response = await axios.get("/heads"); // Adjusted to match the router setup
            setHeadTypes(Array.isArray(response.data) ? response.data : []);
            console.log("Data", response.data);
        } catch (error) {
            console.error("Error fetching packages types:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
            }
        }
    };

    const fetchSubHead = async () => {
        try {
            const response = await axios.get("/subHead"); // Adjusted to match the router setup
            setSubHeadTypes(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Error fetching packages types:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
            }
        }
    };

    const handleSave = async () => {
        if (!selectedHeadType || !selectedCompanyType) {
            alert("Please enter both a facility name and tour type.");
            return;
        }

        const dataToSend = {
            companyName: selectedCompanyType,
            companyCode,
            headName: selectedHeadType,
            headCode,
            subHeadCode,
            subHeadName,
            description,
        };

        console.log("Data to send to backend:", dataToSend);
        

        try {
            const response = await axios.post("/subHead", dataToSend); // Adjust the endpoint as necessary
            console.log("Saved head response:", response.data);
            if (response.data.status === "201") {
                alert("Data is successfully saved.")
            }
            setSubHeadTypes([...subHeadTypes, response.data]);
            setSelectedCompanyType("");
            setSelectedHeadType("");
            setSubHeadName("");
            setDescription("");
        } catch (error) {
            console.error("Error saving head:", error);
        }
    };

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
                <h4 className="text-white text-2xl font-extrabold">ACCOUNT SUB HEADS</h4>
            </div>
            <div className="bg-white mx-auto w-[40rem] border mt-4 p-4 shadow-md rounded-md">

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* company */}
                        <div>
                            <label className="text-gray-800 font-semibold">Company</label>
                            <div ref={dropdownRef} className="relative">
                                <div
                                    className="flex items-center justify-between w-[22rem] border rounded px-2 py-2 cursor-pointer"
                                    onClick={toggleCompanyTypeDropdown}
                                >
                                    <input
                                        type="text"
                                        className="bg-transparent text-gray-800 text-sm outline-none cursor-pointer w-full"
                                        value={selectedCompanyType || "Select a Company"}
                                        readOnly
                                    />
                                    <span className="ml-2 text-gray-800">▼</span>
                                </div>
                                {isCompanyTypeDropdownOpen && (
                                    <div className="absolute mt-1 w-[22rem] bg-white shadow-lg rounded max-h-40 overflow-auto z-50">
                                        <ul className="divide-y divide-gray-100">
                                            {companyTypes.map((head, index) => (
                                                <li
                                                    className="px-4 py-2 text-gray-800 hover:bg-blue-100 cursor-pointer"
                                                    key={index}
                                                    onClick={() => handleCompanyTypeSelect(head.companyName)}
                                                >
                                                    {head.companyName}
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
                                    value={companyCode}
                                    readOnly
                                    className="bg-transparent text-sm ml-28 text-gray-800 outline-none w-[8rem] border rounded px-2 py-2"

                                />
                            </div>
                        </div>


                        {/* Head */}
                        <div>
                            <label className="text-gray-800 font-semibold">Head</label>
                            <div ref={dropdownRef} className="relative">
                                <div
                                    className="flex items-center justify-between w-[22rem] border rounded px-2 py-2 cursor-pointer"
                                    onClick={toggleHeadTypeDropdown}
                                >
                                    <input
                                        type="text"
                                        className="bg-transparent text-gray-800 text-sm outline-none cursor-pointer w-full"
                                        value={selectedHeadType || "Select Main Head"}
                                        readOnly
                                    />
                                    <span className="ml-2 text-gray-800">▼</span>
                                </div>
                                {isHeadTypeDropdownOpen && (
                                    <div className="absolute mt-1 w-[22rem] bg-white shadow-lg rounded max-h-40 overflow-auto z-50">
                                        <ul className="divide-y divide-gray-100">
                                            {headTypes.map((head, index) => (
                                                <li
                                                    className="px-4 py-2 text-gray-800 hover:bg-blue-100 cursor-pointer"
                                                    key={index}
                                                    onClick={() => handleHeadTypeSelect(head.headName)}
                                                >
                                                    {head.headName}
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
                                    value={headCode}
                                    readOnly
                                    className="bg-transparent text-sm ml-28 text-gray-800 outline-none w-[8rem] border rounded px-2 py-2"

                                />
                            </div>
                        </div>

                        {/* SubHead */}
                        <div>
                            <label className="text-gray-800 font-semibold">Sub Head</label>
                            <input
                                type="text"
                                className="bg-transparent text-sm text-gray-800 outline-none w-[24rem] border rounded px-2 py-2"
                                placeholder="Enter Head"
                                value={subHeadName}
                                onChange={handleSubHeadChange}
                            />
                        </div>

                        <div>
                            <label className="text-gray-800 ml-28 font-semibold">Code</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={subHeadCode}
                                    className="bg-transparent text-sm ml-28 text-gray-800 outline-none w-[8rem] border rounded px-2 py-2"
                                    placeholder="04"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-gray-800 font-semibold">Description</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}

                                className="bg-transparent text-sm text-gray-800 outline-none w-[34.5rem] border rounded px-2 py-2"
                                placeholder="Enter Description"
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
                                <th className="border px-4 py-2">CATEGORY</th>
                                <th className="border px-4 py-2">CODE</th>
                                <th className="border px-4 py-2">HEAD</th>
                                <th className="border px-4 py-2">DESCRIPTION</th>
                                <th className="border px-4 py-2">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(subHeadTypes) ? (
                                subHeadTypes.map((subHead, index) => (
                                    <tr key={subHead._id}>
                                        <td className="border px-4 py-2">{index + 1}</td>
                                        <td className="border px-4 py-2">{subHead.headName}</td>
                                        <td className="border px-4 py-2">{subHead.subHeadCode}</td>
                                        <td className="border px-4 py-2">{subHead.subHeadName}</td>
                                        <td className="border px-4 py-2">{subHead.description || ""}</td>
                                        <td className="border px-4 py-3 flex justify-center space-x-4">
                                            <FaEdit
                                                className="text-blue-600 cursor-pointer"
                                                onClick={() => handleEdit(subHead._id)}
                                                aria-label={`Edit ${subHead.destinationName}`}
                                            />
                                            <FaTrashAlt
                                                className="text-red-600 cursor-pointer"
                                                onClick={() => handleDelete(subHead._id)}
                                                aria-label={`Delete ${subHead.destinationName}`}
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

            export default SubHead;
