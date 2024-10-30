/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function PackageList() {
  const [isPackageDropdownOpen, setIsPackageDropdownOpen] = useState(false);
  const [isTourTypeDropdownOpen, setIsTourTypeDropdownOpen] = useState(false);
  const [isFacilitiesDropdownOpen, setIsFacilitiesDropdownOpen] =
    useState(false);

  const [tourTypes, setTourTypes] = useState([]);
  const [packages, setPackages] = useState([]);
  const [facilities, setFacilities] = useState([]);

  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedTourType, setSelectedTourType] = useState("");
  const [selectedFacilities, setSelectedFacilities] = useState("");
  const [rate, setRate] = useState("");
  const [description, setDescription] = useState("");
  const [totalDays, setTotalDays] = useState("");
  const [days, setDays] = useState("");
  const [nights, setNights] = useState("");

  // Separate refs for each dropdown
  const packageDropdownRef = useRef(null);
  const tourDropdownRef = useRef(null);
  const facilitiesDropdownRef = useRef(null);

  useEffect(() => {
    fetchPackages();
    fetchTourTypes();
    fetchFacilities();

    // Event listener for outside click
    const handleClickOutside = (event) => {
      if (
        packageDropdownRef.current &&
        !packageDropdownRef.current.contains(event.target)
      ) {
        setIsPackageDropdownOpen(false);
      }
      if (
        tourDropdownRef.current &&
        !tourDropdownRef.current.contains(event.target)
      ) {
        setIsTourTypeDropdownOpen(false);
      }
      if (
        facilitiesDropdownRef.current &&
        !facilitiesDropdownRef.current.contains(event.target)
      ) {
        setIsFacilitiesDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get("/packages");
      setPackages(response.data);
      console.log("Fetched packages:", response.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  const fetchTourTypes = async () => {
    try {
      const response = await axios.get("/tours");
      setTourTypes(response.data);
      console.log("Fetched tour types:", response.data);
    } catch (error) {
      console.error("Error fetching tour types:", error);
    }
  };

  const fetchFacilities = async () => {
    try {
      const response = await axios.get("/facility");
      setFacilities(response.data);
      console.log("Fetched facilities:", response.data);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      packageName: selectedPackage,
      tourType: selectedTourType,
      facilities: selectedFacilities,
      rate,
      description,
      totalDays,
      days,
      nights,
    };

    console.log("Submitting data:", postData); // Added logging

    try {
      const response = await axios.post("/packageList", postData);
      if (response.status === 201) {
        alert("Data submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data.");
    }
  };

  return (
    <div className="bg-[#f4fcfe] mx-[12rem] w-[50%] border border-blue my-4 p-4">
      <h1 className="flex justify-center text-2xl font-bold mt-4 text-blue">
        LIST OF PACKAGE
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 ml-[3rem] mt-6 w-[75%]">
          {/* Package Name Dropdown */}
          <div className="col-span-2" ref={packageDropdownRef}>
            <label
              htmlFor="services"
              className="flex justify-start font-semibold text-gray-800 mb-2"
            >
              Package Name
            </label>
            <div className="relative">
              <div
                className="flex items-center justify-between w-full border rounded-xl border-blue px-2 py-2 cursor-pointer"
                onClick={() => setIsPackageDropdownOpen(!isPackageDropdownOpen)}
              >
                <input
                  type="text"
                  id="packageName"
                  className="bg-transparent text-gray-800 text-sm outline-none cursor-pointer w-full"
                  value={selectedPackage || "Select a package"}
                  readOnly
                />
                <span className="ml-2 text-gray-800">▼</span>
              </div>
              {isPackageDropdownOpen && (
                <div className="absolute mt-1 w-full bg-white shadow-lg rounded-xl max-h-[7.5rem] overflow-auto">
                  <ul className="divide-y divide-gray-100">
                    {packages.map((pkg, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 text-gray-800 hover:bg-blue-100 cursor-pointer"
                        onClick={() => {
                          setSelectedPackage(pkg.packageName);
                          setIsPackageDropdownOpen(false);
                        }}
                      >
                        {pkg.packageName}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Total Days, Days, Nights */}
          <div className="flex flex-row gap-6 w-[25rem]">
            <div>
              <label className="text-gray-800 font-semibold">Total Days</label>
              <input
                type="number"
                value={totalDays}
                onChange={(e) => setTotalDays(e.target.value)}
                className="border rounded-xl w-full px-2 py-2 border-blue outline-none"
              />
            </div>
            <div>
              <label className="text-gray-800 font-semibold">Days</label>
              <input
                type="number"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="border rounded-xl w-full px-2 py-2 border-blue outline-none"
              />
            </div>
            <div>
              <label className="text-gray-800 font-semibold">Nights</label>
              <input
                type="number"
                value={nights}
                onChange={(e) => setNights(e.target.value)}
                className="border rounded-xl w-full px-2 py-2 border-blue outline-none"
              />
            </div>
          </div>

          {/* Tour Type Dropdown */}
          <div className="col-span-2" ref={tourDropdownRef}>
            <label className="text-gray-800 font-semibold">Tour Type</label>
            <div className="relative">
              <div
                className="flex items-center justify-between w-full border rounded-xl border-blue px-2 py-2 cursor-pointer"
                onClick={() =>
                  setIsTourTypeDropdownOpen(!isTourTypeDropdownOpen)
                }
              >
                <input
                  type="text"
                  className="bg-transparent text-gray-800 text-sm outline-none cursor-pointer w-full"
                  value={selectedTourType || "Select a tour type"}
                  readOnly
                />
                <span className="ml-2 text-gray-800">▼</span>
              </div>

              {isTourTypeDropdownOpen && (
                <div className="absolute mt-1 w-full bg-white shadow-lg rounded-xl max-h-[7.5rem] overflow-auto z-50">
                  <ul className="divide-y divide-gray-100">
                    {tourTypes.map((tour, index) => (
                      <li
                        className="px-4 py-2 text-gray-800 hover:bg-blue-100 cursor-pointer"
                        key={index}
                        onClick={() => {
                          setSelectedTourType(tour.tourName);
                          setIsTourTypeDropdownOpen(false);
                        }}
                      >
                        {tour.tourName}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Facilities Dropdown */}
          <div className="col-span-2" ref={facilitiesDropdownRef}>
            <label className="text-gray-800 font-semibold">Facilities</label>
            <div className="relative">
              <div
                className="flex items-center justify-between w-full border rounded-xl border-blue px-2 py-2 cursor-pointer"
                onClick={() =>
                  setIsFacilitiesDropdownOpen(!isFacilitiesDropdownOpen)
                }
              >
                <input
                  type="text"
                  className="bg-transparent text-gray-800 text-sm outline-none cursor-pointer w-full"
                  value={selectedFacilities || "Select a facility"}
                  readOnly
                />
                <span className="ml-2 text-gray-800">▼</span>
              </div>

              {isFacilitiesDropdownOpen && (
                <div className="absolute mt-1 w-full bg-white shadow-lg rounded-xl max-h-[7.5rem] overflow-auto z-50">
                  <ul className="divide-y divide-gray-100">
                    {facilities.map((facility, index) => (
                      <li
                        className="px-4 py-2 text-gray-800 hover:bg-blue-100 cursor-pointer"
                        key={index}
                        onClick={() => {
                          setSelectedFacilities(facility.facilityName);
                          setIsFacilitiesDropdownOpen(false);
                        }}
                      >
                        {facility.facilityName}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Rate and Description */}
          <div className="flex flex-row gap-6 w-[25rem]">
            <div>
              <label className="text-gray-800 font-semibold">Rate</label>
              <input
                type="text"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="border rounded-xl w-full px-2 py-2 border-blue outline-none"
              />
            </div>
            <div>
              <label className="text-gray-800 font-semibold">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border rounded-xl w-full px-2 py-2 border-blue outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-blue text-white font-semibold px-4 py-2 rounded-xl hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PackageList;
