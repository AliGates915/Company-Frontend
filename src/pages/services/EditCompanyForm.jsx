/* eslint-disable react/react-in-jsx-scope */
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";

export const EditCompanyForm = () => {
  const { id:_id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
  });
  useEffect(() => {
    // Fetch the company data by ID
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/companies/${_id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompany();
  }, [_id]);

  const fileInputRef = useRef(null);
  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const editHandle = async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/companies/${_id}`, formData);
      if (response.status === 200) {
        navigate(`${process.env.REACT_APP_API_URL}/all`); // Redirect after successful update
      }
    } catch (error) {
      console.error("Error updating company:", error);
      alert(error)
    }
  };

  return (
    <div>
      <div className="w-90 h-screen font-[sans-serif] p-3">
        <nav className="flex justify-between my-4 mx-6 ">
          <div className="text-3xl font-extrabold text-[#7339ff] tracking-wide ">
            Update Company Information
          </div>
          <Link to="/all">
            <button
              className="bg-[#5239c3]  px-4 py-2 rounded-sm 
                hover:rounded-lg text-md  text-white tracking-wide"
            >
              Back to All Company
            </button>
          </Link>
        </nav>
        <hr className="bg-gray-400 mb-4" />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            editHandle();
          }}
          className="ml-20"
        >
          {/* Company Name */}
          <div className="flex flex-row">
            <div>
              <label className="text-gray-800 text-lg mb-2 block">
                Company Name *
              </label>
              <input
                type="text"
                name="companyName"
                className="w-[24rem] text-gray-800 bg-transparent text-sm border-b border-gray-300 focus:border-blue px-2 py-2 outline-none"
                placeholder="Enter company name"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
                required
              />
            </div>

            <div className="ml-8">
              <label className="text-gray-800 text-lg mb-2 block">Code </label>
              <input
                name="companyCode"
                className="w-[16rem] text-gray-800 bg-transparent text-sm border-b border-gray-300 focus:border-blue px-2 py-2 outline-none"
                readOnly
                value={formData.companyCode}
                required
              />
            </div>
          </div>

          {/* Logo */}
          <div className="absolute top-36 right-8 px-2 py-2">
            <label
              className="text-gray-800 text-lg mb-2 block"
              onClick={handleFileClick}
            >
              Logo:{" "}
              <DriveFolderUploadOutlinedIcon className="icon cursor-pointer" />
            </label>
            <input
              type="file"
              name="logo"
              accept="image/*"
              ref={fileInputRef} // Attach the ref here
              style={{ display: "none" }} // Keep it hidden
              onChange={(e) =>
                setFormData({ ...formData, logo: e.target.value })
              }
            />
          </div>

          {/* Address and City */}
          <div className="mr-20 mt-6 grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-800 text-lg mb-2 block">
                Address *
              </label>
              <input
                type="text"
                name="address"
                className="w-[24rem] bg-transparent text-gray-800 text-sm border-b border-gray-300 focus:border-blue px-2 py-2 outline-none"
                placeholder="Enter Address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="text-gray-800 text-lg mb-2 block">City *</label>
              <input
                type="text"
                name="city"
                className="w-[24rem] bg-transparent text-gray-800 text-sm border-b border-gray-300 focus:border-blue px-2 py-2 outline-none"
                placeholder="Enter City"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                required
              />
            </div>
          </div>
          {/* Telephone and Mobile */}
          <div className="mr-20 mt-6 grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-800 text-lg mb-2 block">
                Telephone *
              </label>
              <input
                type="tel"
                name="telephone"
                className="w-[24rem] bg-transparent text-gray-800 text-sm border-b border-gray-300 focus:border-blue px-2 py-2 outline-none"
                placeholder="Enter telephone"
                value={formData.telephone}
                onChange={(e) =>
                  setFormData({ ...formData, telephone: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="text-gray-800 text-lg mb-2 block">
                Mobile *
              </label>
              <input
                type="tel"
                name="mobile"
                className="w-[24rem] bg-transparent text-gray-800 text-sm border-b border-gray-300 focus:border-blue px-2 py-2 outline-none"
                placeholder="Enter mobile"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Fax and Email */}
          <div className="mr-20 mt-6 grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-800 text-lg mb-2 block">Fax </label>
              <input
                type="tel"
                name="fax"
                className="w-[24rem] bg-transparent text-gray-800 text-sm border-b border-gray-300 focus:border-blue px-2 py-2 outline-none"
                placeholder="Enter fax"
                value={formData.fax}
                onChange={(e) =>
                  setFormData({ ...formData, fax: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-gray-800 text-lg mb-2 block">
                Email *
              </label>
              <input
                type="email"
                name="email"
                className="w-[24rem] bg-transparent text-gray-800 text-sm border-b border-gray-300 focus:border-blue px-2 py-2 outline-none"
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Contact Person, NTN, and GST */}
          <div className="mr-20 mt-6 grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-800 text-lg mb-2 block">
                Contact Person *
              </label>
              <input
                type="text"
                name="contactPerson"
                className="w-[24rem] bg-transparent text-gray-800 text-sm border-b border-gray-300 focus:border-blue px-2 py-2 outline-none"
                placeholder="Enter contact person"
                value={formData.contactPerson}
                onChange={(e) =>
                  setFormData({ ...formData, contactPerson: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="text-gray-800 text-lg mb-2 block">
                Destination *
              </label>
              <input
                type="text"
                name="destination"
                className="w-[24rem] bg-transparent text-gray-800 text-sm border-b border-gray-300 focus:border-blue px-2 py-2 outline-none"
                placeholder="Enter Destination"
                value={formData.destination}
                onChange={(e) =>
                  setFormData({ ...formData, destination: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="text-gray-800 text-lg mb-2 block">NTN *</label>
              <input
                type="text"
                name="ntn"
                className="w-[24rem] bg-transparent text-gray-800 text-sm border-b border-gray-300 focus:border-blue px-2 py-2 outline-none"
                placeholder="Enter NTN"
                value={formData.ntn}
                onChange={(e) =>
                  setFormData({ ...formData, ntn: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="text-gray-800 text-lg mb-2 block">GST *</label>
              <input
                type="text"
                name="gst"
                className="w-[24rem] bg-transparent text-gray-800 text-sm border-b border-gray-300 focus:border-blue px-2 py-2 outline-none"
                placeholder="Enter GST"
                value={formData.gst}
                onChange={(e) =>
                  setFormData({ ...formData, gst: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-8 bg-[#3116ae] text-white font-bold py-2 px-4 rounded"
          >
            Update Company
          </button>
          {/* Success/Error Message */}
        </form>
      </div>
    </div>
  );
};
