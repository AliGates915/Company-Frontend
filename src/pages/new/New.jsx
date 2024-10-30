/* eslint-disable react/react-in-jsx-scope */
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";  // Import hooks
import CloseIcon from "@mui/icons-material/Close";  // Import Close (X) icon

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const navigate = useNavigate();  // Initialize useNavigate
  const location = useLocation();  // Get the current location

  // Handle change for input fields
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Handle form submit and file upload
  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/daexycwc7/image/upload",
        data
      );
      const { url } = uploadRes.data;

      const newUser = {
        ...info,
        img: url,
      };

      await axios.post("/auth/register", newUser);
    } catch (err) {
      console.log(err);
    }
  };

  // Handle the X button click to navigate back to previous path
  const handleClose = () => {
    const basePath = location.pathname.split("/new")[0];  // Get the previous path
    navigate(basePath);  // Navigate to the base path
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
          <CloseIcon className="closeIcon" onClick={handleClose} /> {/* X button */}
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Profile Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
