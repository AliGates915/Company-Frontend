/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, useRef } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";

function AccountHead() {
    const [accountName, setAccountName] = useState("");
    const [accountTypes, setAccountTypes] = useState([]);
   
    const [date, setDate] = useState("");
    const [debitCheck, setDebitCheck] = useState("");
    const [amountCheck, setAmountCheck] = useState("");
    const [accountCode, setAccountCode] = useState("");
    const [balance, setBalance] = useState("");



    const [subHeadName, setSubHeadName] = useState("");
    const [headCode, setHeadCode] = useState("");
    const [subHeadCode, setSubHeadCode] = useState("");
    const [companyCode, setCompanyCode] = useState("");
    const [headTypes, setHeadTypes] = useState([]);
    const [companyTypes, setCompanyTypes] = useState([]);
    const [, setIsCompanyTypeDropdownOpen] = useState(false);
    const [selectedCompanyType, setSelectedCompanyType] = useState("");
    const [selectedHeadType, setSelectedHeadType] = useState("");
    const [selectedSubHeadType, setSelectedSubHeadType] = useState("");
    const [description, setDescription] = useState('');
    const [subHeadTypes, setSubHeadTypes] = useState([]);
    const [, setIsHeadTypeDropdownOpen] = useState(false);
    const [isSubHeadTypeDropdownOpen, setIsSubHeadTypeDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [headData, setHeadData] = useState([]);
    const [openHead, setOpenHead] = useState(false);




    const toggleSubHeadTypeDropdown = () => {
        setIsSubHeadTypeDropdownOpen(prev => !prev);
    };

    const closeDropdowns = () => {
        setIsSubHeadTypeDropdownOpen(false);
        setIsCompanyTypeDropdownOpen(false);
        setIsHeadTypeDropdownOpen(false);
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


    const handleEdit = async (id) => {
        const updatedHeadName = prompt("Enter the new account name:");
        if (!updatedHeadName) return;

        try {
            const response = await axios.put(`/accountHead/${id}`, {
                head: updatedHeadName,
            });
            setHeadTypes(
                headTypes.map((head) =>
                    head._id === id ? response.data : head
                )
            );
        } catch (error) {
            console.error("Error updating Account:", error);
        }
        
    };

    const handleDelete = async (id) => {
        if (!id) {
            console.error("Account ID is undefined.");
            return;
        }

        if (!window.confirm("Are you sure you want to delete this Account?"))
            return;

        try {
            await axios.delete(`/accountHead/${id}`); // Adjust the endpoint as necessary
            setHeadTypes(headTypes.filter((head) => head._id !== id));
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error("Error deleting Account:", error);
            }
        }
    };

    useEffect(() => {
        const fetchCompanyTypes = async () => {
            try {
                const { data } = await axios.get("/subHead");
                setCompanyTypes(data);
            } catch (error) {
                console.error("Error fetching company types:", error);
            }
        };
    
        const fetchHeads = async () => {
            try {
                const { data } = await axios.get('/subHead');
                setHeadCode(data.length.toString().padStart(2, '0'));
            } catch (error) {
                console.error('Error fetching head:', error);
            }
        };
    
        const fetchSubHeads = async () => {
            try {
                const { data } = await axios.get('/subHead');
                setSubHeadCode(data.length.toString().padStart(2, '0'));
            } catch (error) {
                console.error('Error fetching subHead:', error);
            }
        };
    
        const fetchAccount = async () => {
            try {
                const { data } = await axios.get('/accountHead');
                const newCodeNumber = data.length + 1;
                setAccountCode(`${companyCode}-${headCode}-${newCodeNumber.toString().padStart(3, '0')}`);
            } catch (error) {
                console.error('Error fetching account:', error);
            }
        };
    
        const fetchAccountHead = async () => {
            try {
                const { data } = await axios.get('/accountHead');
                setHeadData(data);
            } catch (error) {
                console.error("Error fetching account head data:", error);
            }
        };

        fetchCompanyTypes()
         fetchSubHeads();
        fetchHeads();
        fetchAccount()
        fetchAccountHead()

    }, []);

    

    const handleCompanySelect = (event) => {
        const companyName = event.target.value;
        const selectedCompany = companyTypes.find(company => company.companyName === companyName);
        
        if (selectedCompany) {
            setSelectedCompanyType(companyName);
            setCompanyCode(selectedCompany.companyCode);
            fetchHeadForCompany(selectedCompany.companyCode);
        }
    };
    const fetchHeadForCompany = async (companyCode) => {
        try {
            const { data } = await axios.get(`/subHead?companyCode=${companyCode}`);
            setHeadTypes(data);
        } catch (error) {
            console.error("Error fetching heads for company:", error);
        }
    };
    const fetchSubHeadForHead = async (headCode) => {
        try {
            const { data } = await axios.get(`/subHead?headCode=${headCode}`);
            setSubHeadTypes(data);
        } catch (error) {
            console.error("Error fetching sub heads for head:", error);
        }
    };

   
    const handleHeadTypeSelect = (event) => {
        const headName = event.target.value;
        const selectedHead = headTypes.find(head => head.headName === headName);

        if (selectedHead) {
            setSelectedHeadType(headName);
            setHeadCode(selectedHead.headCode);
            fetchSubHeadForHead(selectedHead.headCode);
        }
    };

    

    const handleSubHeadTypeSelect = (subHeadName) => {
        const selectedSubHead = subHeadTypes.find(head => head.subHeadName === subHeadName);
        if (selectedSubHead) setSelectedSubHeadType(subHeadName);
    };

   
    const filteredDestinations = selectedHeadType
        ? subHeadTypes.filter(destination => destination.headName === selectedHeadType)
        : [];
        

        const filteredHeads = selectedCompanyType
        ? headTypes.filter(destination => destination.companyName === selectedCompanyType)
        : [];
        console.log("data", headTypes);
        
    
    const handleAccountChange = (e) => {
        setAccountName(e.target.value);
        // Generate the next subhead code based on current company and head codes
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
            accountName,
            accountCode,
            balance,
            amountCheck: amountCheck || null,
            debitCheck: debitCheck || null,
            subHeadCode,
            date,
            subHeadName,
            selectedSubHeadType,
            description,
        };

        console.log("Data to send to backend:", dataToSend);


        try {
            const response = await axios.post("/accountHead", dataToSend); // Adjust the endpoint as necessary
            console.log("Saved head response:", response.data);
            if (response.data.status === "200" || response.data.status === "201") {   
                alert(response.data.message)
            }
            alert(response.data.message)
            setAccountTypes([...accountTypes, response.data]);
            setSelectedCompanyType("");
            setSelectedSubHeadType("");
            setSelectedHeadType("");
            setSubHeadName("");
            setBalance("");
            setAmountCheck("");
            setDebitCheck("");
            setAccountName("");
            setAccountCode("");
            setCompanyCode("");
            setHeadCode("");
            setSubHeadCode("");
            setDate("");
            setDescription("");
        } catch (error) {
            console.error("Error saving head:", error);
            alert("Error saving head");
        }
    };


    return (
        <>
            <nav className='flex justify-between my-4 mx-8 '>
            <div className='text-2xl font-extrabold text-[#7339ff] tracking-wide '>
                ACCOUNT HEADS
                </div>

                <button className='bg-[#5239c3] font-extrabold px-3 py-1 rounded-full transition-all duration-300 
                text-xl text-white tracking-wide flex items-center justify-center hover:bg-[#4a32b3] 
               hover:scale-105 hover:shadow-lg hover:shadow-[#4a32b3]/80'
                    onClick={() => setOpenHead(true)}
                >
                    +
                </button>
            </nav>
            <hr className='bg-gray-400 mb-4' />
            {openHead && (
                <div className="bg-gray-100 mx-auto w-[40rem] border mt-4 p-6 shadow-xl rounded-md">
                    <div className="grid grid-cols-2 gap-4 mb-2">
                        <button onClick={() => setOpenHead(false)} className="absolute top-36 
                    right-[17rem] text-xl text-[#3116ae] hover:text-red font-extrabold">
                            X
                        </button>
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
                        {/* code */}
                        <div>
                            <label className=" text-gray-800 ml-28 font-semibold">Code</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={companyCode}
                                    className=" bg-white  text-sm ml-28 text-gray-800 outline-none w-[8rem] border rounded px-2 py-2"
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                        {/* Head */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                            <label className="text-gray-800 font-semibold">Head</label>
                            <select
                                value={selectedHeadType}
                                onChange={handleHeadTypeSelect}
                                className="w-[22rem] border text-gray-800 rounded outline-none px-2 py-2 cursor-pointer"
                            >
                                <option value="" disabled>Select Main Head</option>
                                {filteredHeads.map((company, index) => (
                                    <option key={index} value={company.headName}>
                                        {company.headName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* code */}
                        <div>
                            <label className="text-gray-800 ml-28 font-semibold">Code</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={headCode}
                                    className="bg-white text-sm ml-28 text-gray-800 outline-none w-[8rem] border rounded px-2 py-2"
                                    readOnly
                                />
                            </div>
                        </div>

                        {/* subHead */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="text-gray-800 font-semibold">Sub Head</label>
                            <div ref={dropdownRef} className="relative">
                                <div
                                    className="flex items-center justify-between w-[22rem] border rounded px-2 py-2 cursor-pointer"
                                    onClick={toggleSubHeadTypeDropdown}
                                >
                                    <input
                                        type="text"
                                        className="bg-transparent text-gray-800 text-sm outline-none cursor-pointer w-full"
                                        value={selectedSubHeadType || "Select Sub Head"}
                                        readOnly
                                    />
                                    <span className="ml-2 text-gray-800">▼</span>
                                </div>
                                {isSubHeadTypeDropdownOpen && (
                                    <div className="absolute mt-1 w-[22rem] bg-white shadow-lg rounded max-h-40 overflow-auto z-50">
                                        <ul className="divide-y divide-gray-100">
                                            {filteredDestinations.map((head, index) => (
                                                <li
                                                    className="px-4 py-2 text-gray-800 hover:bg-blue-100 cursor-pointer"
                                                    key={index}
                                                    onClick={() => handleSubHeadTypeSelect(head.subHeadName)}
                                                >
                                                    {head.subHeadName}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>


                        </div>


                        {/* code */}
                        <div>
                            <label className="text-gray-800 ml-28 font-semibold">Code</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={subHeadCode}
                                    className="bg-white text-sm ml-28 text-gray-800 outline-none w-[8rem] border rounded px-2 py-2"
                                    readOnly
                                />
                            </div>
                        </div>

                        {/* account Title */}
                        <div>
                            <label className="text-gray-800 font-semibold">Account Title</label>
                            <input
                                type="text"
                                className="bg-white text-sm text-gray-800 outline-none w-[24rem] border rounded px-2 py-2"
                                placeholder="Enter account title"
                                value={accountName}
                                onChange={handleAccountChange}
                            />
                        </div>
                        {/* code */}
                        <div>
                            <label className="text-gray-800 ml-28 font-semibold">Code</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={accountCode}
                                    className="bg-white text-sm ml-28 text-gray-800 outline-none w-[8rem] border rounded px-2 py-2"

                                />
                            </div>
                        </div>
                        {/* Description */}
                        <div>
                            <label className="text-gray-800 font-semibold">Description</label>
                            <textarea
                                type="text"
                                rows={3}
                                value={description}
                                className="bg-white text-sm  text-gray-800 outline-none w-[34.5rem] border rounded px-2 py-2"
                                placeholder="Enter Description"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    {/*  balance */}
                    <div className="grid grid-cols-2 gap-4 mb-2">
                        <div className="relative flex flex-row items-center">
                            <label className="text-gray-800 font-normal">Opening Balance</label>
                            <input
                                type="Number"
                                className="bg-white text-sm mr-8 text-gray-800 
                            outline-none w-[8rem] ml-3 border rounded px-2 py-2"
                                placeholder="balance..."
                                value={balance}
                                onChange={(e) => setBalance(e.target.value)}
                            />
                        </div>
                        {/* opening date */}
                        <div className="relative flex flex-row items-center">
                            <label className="text-gray-800 font-normal">Opening Date</label>
                            <input
                                type="date"
                                className="bg-white text-sm ml-3 text-gray-800 outline-none
                             w-[8rem] border rounded px-2 py-2"
                                placeholder="balance..."
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        {/* checkbox */}
                        <div className="grid grid-cols-2 gap-4 mb-2 w-full ml-32">
                            <div className="relative flex flex-row items-center ">
                                <input
                                    type="checkbox"
                                    className="bg-white text-sm mx-2 text-gray-800 outline-none
                             border rounded px-2 py-2"
                                    placeholder="balance..."
                                    value={debitCheck}
                                    onChange={(e) => setDebitCheck(e.target.value)}
                                />
                                <label className="text-gray-800 font-normal">Debit Balance</label>
                            </div >

                            <div className="relative flex flex-row items-center ml-32 w-full">
                                <input
                                    type="checkbox"
                                    className="bg-white text-sm mx-2 text-gray-800 outline-none
                             border rounded px-2 py-2"
                                    placeholder="balance..."
                                    value={amountCheck}
                                    onChange={(e) => setAmountCheck(e.target.value)}
                                />
                                <label className="text-gray-800 font-normal">Active Amount</label>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            className="bg-[#5239c3] hover:bg-[#4a32b3] 
                            hover:scale-105 hover:shadow-lg hover:shadow-[#4a32b3]/80 text-white 
                            text-md font-bold w-40 py-2 mt-2 rounded-full hover:bg-blue-600"
                            onClick={handleSave}
                        >
                            SAVE
                        </button>
                    </div>
                </div>
            )}
            <div className="my-6 max-w-full mx-4">
                <table className="min-w-full  shadow-xl border-collapse border border-gray-300">
                    <thead className="text-sm bg-[#7339ff] text-gray-50">
                        <tr>
                            <th className="border px-1 py-2">SR.#</th>
                            <th className="border px-1 py-2">CODE</th>
                            <th className="border px-4 py-2">MAIN HEAD</th>
                            <th className="border px-4 py-2">SUB HEAD</th>
                            <th className="border px-4 py-2">TITLE</th>
                            <th className="border px-4 py-2">OPENING</th>
                            <th className="border px-4 py-2">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {Array.isArray(headData) && headData.length > 0 ? (
                            headData.map((facility, index) => (
                                <tr key={facility._id}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{facility.accountCode}</td>
                                    <td className="border px-4 py-2">{facility.headName}</td>
                                    <td className="border px-4 py-2">{facility.subHeadName}</td>
                                    <td className="border px-4 py-2">{facility.accountName}</td>
                                    <td className="border px-4 py-2">{facility.balance || 0}</td>
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
                            <td colSpan="8" className="border px-4 font-semibold py-2 text-center">
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
