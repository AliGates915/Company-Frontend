/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState ,useRef} from "react";
import Tooltip from "@mui/material/Tooltip";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";

const CompanyInfo = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    code: '',
    address: '',
    telephone: '',
    mobile: '',
    fax: '',
    email: '',
    contactPerson: '',
    ntn: '',
    gst: '',
    logo: null, // Make sure this is correctly set if you're handling file uploads
  });
  
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
        ...formData,
        [name]: type === 'file' ? files[0] : value, // Handle file input
    });
};

  const fileInputRef = useRef(null);
  const handleFileClick = () => {
    // Trigger click on the hidden file input
    fileInputRef.current.click();
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!formData.companyName || !formData.gst) {
        setErrorMessage("Company Name and GST are required fields.");
        return;
    }

    const formDataToSend = new FormData();

    // Handle file upload to Cloudinary
    let logoUrl = null;
    if (formData.logo) {
        const data = new FormData();
        data.append("file", formData.logo);
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

    // Append form data to formDataToSend
    formDataToSend.append("companyName", formData.companyName);
    formDataToSend.append("companyCode", formData.code);
    if (logoUrl) formDataToSend.append("logo", logoUrl);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("telephone", formData.telephone);
    formDataToSend.append("mobile", formData.mobile);
    formDataToSend.append("fax", formData.fax);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("contactPerson", formData.contactPerson);
    formDataToSend.append("ntn", formData.ntn);
    formDataToSend.append("gst", formData.gst);

    // Log each field for debugging
    for (const [key, value] of formDataToSend.entries()) {
        console.log(`${key}: ${value}`);
    }

    try {
        const response = await fetch("http://localhost:8000/api/companies", {
            method: "POST",
            body: formDataToSend,
        });

        if (response.ok) {
            const responseData = await response.json();
            setSuccessMessage(responseData.message || "Company created successfully!");
        } else {
            const errorData = await response.json();
            console.error('Error response from server:', errorData); // Log the error details
            setErrorMessage(errorData.message || "An error occurred");
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
                  value={formData.companyName}
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
                  name="code"
                  className="w-[16rem] text-gray-800 bg-transparent text-sm border-b border-gray-300 focus:border-blue px-2 py-2 outline-none"
                  placeholder="Enter code"
                  value={formData.code}
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
                value={formData.address}
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
                  value={formData.telephone}
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
                  value={formData.mobile}
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
                  type="text"
                  name="fax"
                  className="w-[24rem] bg-transparent text-gray-800 text-sm border-b border-gray-300 focus:border-blue px-2 py-2 outline-none"
                  placeholder="Enter fax"
                  value={formData.fax}
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
                  value={formData.email}
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
                  className="w-[42rem] bg-transparent text-gray-800 text-sm border-b border-gray-300 focus:border-blue px-2 py-2 outline-none"
                  placeholder="Enter Contact Person"
                  value={formData.contactPerson}
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
                  value={formData.ntn}
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
                  value={formData.gst}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </Tooltip>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className="bg-[#3116ae] text-white py-2 px-8 rounded-md hover:bg-[#270da8] transition duration-200"
            >
              Submit
            </button>
          </div>

          {/* Messages */}
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
          {successMessage && <p className="text-green-600">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default CompanyInfo;
