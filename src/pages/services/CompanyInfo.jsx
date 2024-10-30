/* eslint-disable react/react-in-jsx-scope */
import {  useState, useRef } from "react";
import Tooltip from "@mui/material/Tooltip";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";

const CompanyInfo = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyCode, setCompanyCode] = useState('');
  const [address, setAddress] = useState('');
  const [telephone, setTelephone] = useState('');
  const [mobile, setMobile] = useState('');
  const [fax, setFax] = useState('');
  const [email, setEmail] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [ntn, setNtn] = useState('');
  const [gst, setGst] = useState('');
  const [logo, setLogo] = useState(null); // Optional field for logo
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fileInputRef = useRef(null);
  
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setLogo(files[0]);
    } else {
      switch (name) {
        case 'companyName':
          setCompanyName(value);
          break;
        case 'companyCode':
          setCompanyCode(value);
          break;
        case 'address':
          setAddress(value);
          break;
        case 'telephone':
          setTelephone(value);
          break;
        case 'mobile':
          setMobile(value);
          break;
        case 'fax':
          setFax(value);
          break;
        case 'email':
          setEmail(value);
          break;
        case 'contactPerson':
          setContactPerson(value);
          break;
        case 'ntn':
          setNtn(value);
          break;
        case 'gst':
          setGst(value);
          break;
        default:
          break;
      }
    }
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!companyName || !gst) {
      setErrorMessage("Company Name and GST are required fields.");
      return;
    }

    const formDataToSend = new FormData();

    // Handle file upload to Cloudinary
    let logoUrl = null;
    if (logo) {
      const data = new FormData();
      data.append("file", logo);
      data.append("upload_preset", "upload");

      try {
        const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/daexycwc7/image/upload", data);
        logoUrl = uploadRes.data.url;
      } catch (uploadError) {
        console.error('File upload error:', uploadError.response ? uploadError.response.data : uploadError.message);
        setErrorMessage("Error uploading logo.");
        return;
      }
    }

    const dataToSend = {
      companyName,
      gst,
      logoUrl,
      address,
      telephone,
      mobile,
      contactPerson,
      companyCode,
      ntn,
      fax,
      email,
  }; 

  console.log("Data to send to backend:", dataToSend);

    // Log each field for debugging
    for (const [key, value] of formDataToSend.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await fetch("http://localhost:8000/api/companies", dataToSend);

      if (response.ok) {
        const responseData = await response.json();
        setSuccessMessage(responseData.message || "Company created successfully!");
        alert(successMessage)
      } else {
        const errorData = await response.json();
        console.error('Error response from server:', errorData); // Log the error details
        setErrorMessage(errorData.message || "An error occurred");
        alert(errorMessage)
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage("An error occurred");
    }
  };

  return (
    <div>
      <div className="w-90 h-screen bg-white font-[sans-serif] p-3">
        <div className="flex justify-center mb-8 py-3 bg-[#3116ae]">
          <h4 className="text-white text-2xl font-extrabold">COMPANY INFORMATION</h4>
        </div>

        <form onSubmit={handleSubmit} className="ml-20">
          {/* Company Name */}
          <div className="flex flex-row">
            <Tooltip title={errorMessage || "Company name is required"} open={!!errorMessage}>
              <div>
                <label className="text-gray-800 text-lg mb-2 block">Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  className="w-[24rem] text-gray-800 bg-transparent text-sm border-b border-gray-300 focus:border-blue px-2 py-2 outline-none"
                  placeholder="Enter company name"
                  value={companyName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </Tooltip>
            <Tooltip title={errorMessage || "Code is required"} open={!!errorMessage}>
              <div className="ml-8">
                <label className="text-gray-800 text-lg mb-2 block">Code *</label>
                <input
                  type="text"
                  name="companyCode"
                  className="w-[16rem] text-gray-800 bg-transparent text-sm border-b border-gray-300 focus:border-blue px-2 py-2 outline-none"
                  placeholder="Enter code"
                  value={companyCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </Tooltip>
          </div>

          {/* Logo */}
          <div className="absolute top-36 right-8 px-2 py-2">
            <label className="text-gray-800 text-lg mb-2 block" onClick={handleFileClick}>
              Logo: <DriveFolderUploadOutlinedIcon className="icon cursor-pointer" />
            </label>
            <input
              type="file"
              name="logo"
              accept="image/*"
              ref={fileInputRef} // Attach the ref here
              style={{ display: "none" }} // Keep it hidden
              onChange={handleInputChange}
            />
          </div>

          {/* Address */}
          <Tooltip title={errorMessage || "Address is required"} open={!!errorMessage}>
            <div className="mt-4">
              <label className="text-gray-800 text-lg mb-2 block">Address *</label>
              <input
                type="text"
                name="address"
                className="w-[42rem] bg-transparent text-gray-800 text-sm border-b border-gray-300 focus:border-blue px-2 py-2 outline-none"
                placeholder="Enter Address"
                value={address}
                onChange={handleInputChange}
                required
              />
            </div>
          </Tooltip>

          {/* Telephone and Mobile */}
          <div className="mr-20 mt-6 grid sm:grid-cols-2 gap-6">
            <Tooltip title={errorMessage || "Telephone is required"} open={!!errorMessage}>
              <div>
                <label className="text-gray-800 text-lg mb-2 block">Telephone *</label>
                <input
                  type="tel"
                  name="telephone"
                  className="w-[24rem] bg-transparent text-gray-800 text-sm border-b border-gray-300 focus:border-blue px-2 py-2 outline-none"
                  placeholder="Enter telephone"
                  value={telephone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </Tooltip>

            <Tooltip title={errorMessage || "Mobile is required"} open={!!errorMessage}>
              <div>
                <label className="text-gray-800 text-lg mb-2 block">Mobile *</label>
                <input
                  type="tel"
                  name="mobile"
                  className="w-[24rem] bg-transparent text-gray-800 text-sm border-b border-gray-300 focus:border-blue px-2 py-2 outline-none"
                  placeholder="Enter mobile"
                  value={mobile}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </Tooltip>
          </div>

          {/* Fax and Email */}
          <div className="mr-20 mt-6 grid sm:grid-cols-2 gap-6">
            <Tooltip title={errorMessage || "Fax is required"} open={!!errorMessage}>
              <div>
                <label className="text-gray-800 text-lg mb-2 block">Fax *</label>
                <input
                  type="tel"
                  name="fax"
                  className="w-[24rem] bg-transparent text-gray-800 text-sm border-b border-gray-300 focus:border-blue px-2 py-2 outline-none"
                  placeholder="Enter fax"
                  value={fax}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </Tooltip>

            <Tooltip title={errorMessage || "Email is required"} open={!!errorMessage}>
              <div>
                <label className="text-gray-800 text-lg mb-2 block">Email *</label>
                <input
                  type="email"
                  name="email"
                  className="w-[24rem] bg-transparent text-gray-800 text-sm border-b border-gray-300 focus:border-blue px-2 py-2 outline-none"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </Tooltip>
          </div>

          {/* Contact Person, NTN, and GST */}
          <div className="mr-20 mt-6 grid sm:grid-cols-2 gap-6">
            <Tooltip title={errorMessage || "Contact Person is required"} open={!!errorMessage}>
              <div>
                <label className="text-gray-800 text-lg mb-2 block">Contact Person *</label>
                <input
                  type="text"
                  name="contactPerson"
                  className="w-[24rem] bg-transparent text-gray-800 text-sm border-b border-gray-300 focus:border-blue px-2 py-2 outline-none"
                  placeholder="Enter contact person"
                  value={contactPerson}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </Tooltip>

            <Tooltip title={errorMessage || "NTN is required"} open={!!errorMessage}>
              <div>
                <label className="text-gray-800 text-lg mb-2 block">NTN *</label>
                <input
                  type="text"
                  name="ntn"
                  className="w-[24rem] bg-transparent text-gray-800 text-sm border-b border-gray-300 focus:border-blue px-2 py-2 outline-none"
                  placeholder="Enter NTN"
                  value={ntn}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </Tooltip>

            <Tooltip title={errorMessage || "GST is required"} open={!!errorMessage}>
              <div>
                <label className="text-gray-800 text-lg mb-2 block">GST *</label>
                <input
                  type="text"
                  name="gst"
                  className="w-[24rem] bg-transparent text-gray-800 text-sm border-b border-gray-300 focus:border-blue px-2 py-2 outline-none"
                  placeholder="Enter GST"
                  value={gst}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </Tooltip>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-8 bg-[#3116ae] text-white font-bold py-2 px-4 rounded"
          >
            Create Company
            
          
          </button>
               {/* Success/Error Message */}
        </form>
      </div>
    </div>
  );
};

export default CompanyInfo;
