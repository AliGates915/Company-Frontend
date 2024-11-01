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
    const [companyTypes, setCompanyTypes] = useState([]);
    const [ setIsCompanyTypeDropdownOpen] = useState(false);
    const [selectedCompanyType, setSelectedCompanyType] = useState("");
    const [isHeadTypeDropdownOpen, setIsHeadTypeDropdownOpen] = useState(false);
    const [selectedHeadType, setSelectedHeadType] = useState("");
    const [description, setDescription] = useState('');
    const [, setSelectedCompanyCode] = useState('');
    const [subHeadTypes, setSubHeadTypes] = useState([]);
    const [sequenceNumber, setSequenceNumber] = useState(1);
    const [message, setMessage] = useState(null);  // Message state
    const [messageType, setMessageType] = useState("");
    const dropdownRef = useRef(null);
    const [openHead, setOpenHead] = useState(false);

    const toggleHeadTypeDropdown = () => {
        setIsHeadTypeDropdownOpen(prev => !prev);
    };

    // Close dropdowns on outside click
    const closeDropdowns = () => {
        setIsCompanyTypeDropdownOpen(false);
        setIsHeadTypeDropdownOpen(false);
    };

    useEffect(() => {


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
        fetchCompanyTypes();
        fetchSubHead()
    }, []);

    // Fetch company types
    const fetchCompanyTypes = async () => {
        try {
            const response = await axios.get("https://company-backend-delta.vercel.app/heads"); // Adjust the endpoint if needed
            setCompanyTypes(response.data);
            console.log("Company Data", response.data);
        } catch (error) {
            console.error("Error fetching company types:", error);
        }
    };

    const filteredDestinations = selectedCompanyType
        ? headTypes.filter(destination => destination.companyName === selectedCompanyType)
        : [];

    // Fetch heads based on selected company code
    const fetchHeadForCompany = async (companyCode) => {
        try {
            const response = await axios.get(`https://company-backend-delta.vercel.app/heads?companyCode=${companyCode}`);
            setHeadTypes(response.data);  // Set filtered heads based on companyCode
            console.log("Filtered Head Data", response.data);  // Verify correct data is fetched
        } catch (error) {
            console.error("Error fetching heads for company:", error);
        }
    };
    const handleHeadTypeSelect = async (headName) => {
        const selectedHead = headTypes.find(head => head.headName === headName);

        if (selectedHead) {
            setSelectedHeadType(headName);
            setHeadCode(selectedHead.headCode);

            // Use backticks to correctly set subHeadCode with template literals
            setSubHeadCode(`${selectedHead.headCode}${String(sequenceNumber).padStart(2, '0')}`);
        }
        setIsHeadTypeDropdownOpen(false);
    };


    // Handle company selection
    const handleCompanySelect = async (event) => {
        const companyName = event.target.value;
        const selectedCompany = companyTypes.find(company => company.companyName === companyName);
        const selectedCode = event.target.value;
        setSelectedCompanyCode(selectedCode);
        fetchHeadForCompany(selectedCode);

        if (selectedCompany) {
            setSelectedCompanyType(companyName);
            setCompanyCode(selectedCompany.companyCode);
            fetchHeadForCompany(selectedCompany.companyCode);
        }
    };

    // Handle subhead change and update code
    const handleSubHeadChange = (e) => {
        setSubHeadName(e.target.value);

        const newSubHeadCode = `${headCode}${String(sequenceNumber).padStart(2, '0')}`;
        setSubHeadCode(newSubHeadCode);
        setSequenceNumber(prev => prev + 1);
    };

    const fetchSubHead = async () => {
        try {
            const response = await axios.get("https://company-backend-delta.vercel.app/subHead");
            setSubHeadTypes(response.data);  // Set filtered heads based on companyCode
            console.log("Filtered Sub Head Data", response.data);  // Verify correct data is fetched
        } catch (error) {
            console.error("Error fetching heads for company:", error);
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
            const response = await axios.post("https://company-backend-delta.vercel.app/subHead", dataToSend); // Adjust the endpoint as necessary
            console.log("Saved head response:", response.data);
            if (response.data.status === "201") {
                setMessage("Data is successfully saved.");
                setMessageType("success");
            }
            setSubHeadTypes([...subHeadTypes, response.data]);
            setSelectedCompanyType("");
            setSelectedHeadType("");
            setSubHeadName("");
            setCompanyCode('')
            setSubHeadCode('')
            setHeadCode('');
            setDescription("");
        } catch (error) {
            console.error("Error saving head:", error);
            // Error message
            setMessage("Something went wrong.");
            setMessageType("error");
        } setTimeout(() => {
            setMessage(null);
            setMessageType("");
        }, 3000); // Adjust the delay as needed        
    };

    const handleEdit = async (id) => {
        const updatedHeadName = prompt("Enter the new subhead name:");
        if (!updatedHeadName) return;

        try {
            const response = await axios.put(`https://company-backend-delta.vercel.app/subHead/${id}`, {
                head: updatedHeadName,
            });
            setHeadTypes(
                headTypes.map((head) =>
                    head._id === id ? response.data : head
                )
            );
        } catch (error) {
            console.error("Error updating Sub Head:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!id) {
            console.error("Sub head ID is undefined.");
            return;
        }

        if (!window.confirm("Are you sure you want to delete this Subhead?"))
            return;

        try {
            await axios.delete(`https://company-backend-delta.vercel.app/subHead/${id}`); // Adjust the endpoint as necessary
            setHeadTypes(headTypes.filter((head) => head._id !== id));
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error("Error deleting Sub Head:", error);
            }
        }
    };



    return (
        <>
            <nav className='flex justify-between my-4 mx-8 '>
                <div className='text-3xl font-extrabold text-[#7339ff] tracking-wide '>
                    ACCOUNT SUB HEADS
                </div>

                <button className='bg-[#5239c3]  px-4 py-2 rounded-sm 
            hover:rounded-lg text-md  text-white tracking-wide'
                    onClick={() => setOpenHead(true)}
                >
                    Add new Sub Head
                </button>
            </nav>
            <hr className='bg-gray-400 mb-4' />
            {openHead && (
                <div className="bg-white mx-auto w-[40rem] border mt-4 p-4 shadow-md rounded-md">
                    <button onClick={() => setOpenHead(false)} className="absolute top-36 
                    right-[17rem] text-xl text-[#3116ae] hover:text-red font-extrabold">
                        X
                    </button>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* company */}
                        <div>
                            <label className="text-gray-800 font-semibold">Company</label>
                            <select
                                value={selectedCompanyType}
                                onChange={handleCompanySelect}
                                className="w-[22rem] border text-gray-800 rounded outline-none px-2 py-2 cursor-pointer"
                            >
                                <option value="" disabled>Select a Company</option>
                                {companyTypes.map((company, index) => (
                                    <option key={index} value={company.companyName}>
                                        {company.companyName}
                                    </option>
                                ))}
                            </select>
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
                                            {filteredDestinations.map((head, index) => (
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
                                    readOnly
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
                        {/* Message Display */}
                        {message && (
                            <div style={{
                                color: messageType === "success" ? "green" : "red",
                                fontWeight: "bold",
                                marginBottom: "10px"
                            }}>
                                {message}
                            </div>
                        )}
                        <button
                            className="bg-[#3116ae] text-white text-md font-bold w-40 py-2 mt-2 rounded-full hover:bg-blue-600"
                            onClick={handleSave}
                        >
                            SAVE
                        </button>
                    </div>
                </div>
            )}
            <div className="my-6 max-w-full mx-4 ">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead className="bg-[#7339ff] text-gray-50">
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
                        {Array.isArray(subHeadTypes) && subHeadTypes.length > 0 ? (
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
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="border px-4 py-2 text-center">
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
