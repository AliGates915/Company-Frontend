/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import axios from "axios";


const CustomizePackage = () => {
  const [users, setUser] = useState([]);
  const [isUserDropdownOpen, setIsUserDropdownOpen] =
    useState(false);
  const [selectUser, setSelectedUser] = useState("");

  const [destinations, setDestinations] = useState([]);
  
  const [isDestinationsDropdownOpen, setIDestinationsDropdownOpen] =
    useState(false);
  const [selectDestinations, setSelectedDestinations] = useState("");
  const [setFilteredDestinations] = useState([]);

  // const [countries, setCountry] = useState([]);
  const [isCountryDropdownOpen, setICountryDropdownOpen] =
    useState(false);
  const [selectCountry, setSelectedCountry] = useState("");

  const [isTourTypeDropdownOpen, setIsTourTypeDropdownOpen] = useState(false);
  const [isFacilitiesDropdownOpen, setIsFacilitiesDropdownOpen] =
    useState(false);

  const [tourTypes, setTourTypes] = useState([]);

  const [facilities, setFacilities] = useState([]);

  const [selectedTourType, setSelectedTourType] = useState("");
  const [selectedFacilities, setSelectedFacilities] = useState("");


  const [totalAdult, setTotalAdult] = useState("");
  const [totalChild, setTotalChild] = useState("");
  const [totalInfant, setTotalInfant] = useState("");
  const [vendor, setVendor] = useState('');
  const [totalDays, setTotalDays] = useState("");
  const [days, setDays] = useState("");
  const [nights, setNights] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [dateFrom, setDateFrom] = useState("");



  // New state for payment method and installment details
  const [paymentMethod, setPaymentMethod] = useState("");
  const [installmentCount, setInstallmentCount] = useState("");
  const [installmentAmount, setInstallmentAmount] = useState("");
  // Separate refs for each dropdown

  const tourDropdownRef = useRef(null);
  const facilitiesDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const destinationsDropdownRef = useRef(null);
  const countryDropdownRef = useRef(null);

  useEffect(() => {
    fetchTourTypes();
    fetchFacilities();
    fetchUser();
    fetchDestinations();
    console.log("Updated destinations:", destinations);

    if (selectCountry) {
      const relatedDestinations = destinations.filter(
        (destination) => destination.countryName === selectCountry
      );
      setFilteredDestinations(relatedDestinations);
    }

    // Event listener for outside click
    const handleClickOutside = (event) => {

      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target)
      ) {
        setICountryDropdownOpen(false);
      }
      if (
        destinationsDropdownRef.current &&
        !destinationsDropdownRef.current.contains(event.target)
      ) {
        setIDestinationsDropdownOpen(false);
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

  //fetching Data
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
      setUser(response.data);
      console.log("Fetched Users:", response.data);
      // Extract unique country names
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const fetchDestinations = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/destination`);
      if (response.data) {
        console.log("Fetched designations:", response.data);
        setDestinations(response.data);
        // console.log("destination", destinations)
      }
    } catch (error) {
      console.error("Error fetching designations:", error);
    }
  };
  const filteredDestinations = selectCountry
  ? destinations.filter(destination => destination.countryName === selectCountry)
  : [];
  
  console.log("filteredDestinations ", filteredDestinations )
  const fetchTourTypes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/tours`);
      if (response.data) {
        setTourTypes(response.data);
        console.log("Fetched tour types:", response.data);
      }

    } catch (error) {
      console.error("Error fetching tour types:", error);
    }
  };

  const fetchFacilities = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/facility`);
      setFacilities(response.data);
      console.log("Fetched facilities:", response.data);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    }
  };
  // handle data
  const handleFromDateChange = (e) => {
    setDateFrom(e.target.value); // Set the value to the string from the input
  };

  const handleToDateChange = (e) => {
    setDateTo(e.target.value); // Set the value to the string from the input
  };
  const handleVendorChange = (e) => {
    setVendor(e.target.value);
    // Update state with the input value
  };
  const handleAmount = (e) => {
    setTotalAmount(e.target.value)
  }

  const handleServiceToggle = (serviceName) => {
    setSelectedFacilities((prevSelected) => {
      if (prevSelected.includes(serviceName)) {
        return prevSelected.filter((service) => service !== serviceName); // Deselect if already selected
      } else {
        return [...prevSelected, serviceName]; // Add if not selected
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      tourType: selectedTourType, // Ensure this has the correct value
      facilities: selectedFacilities, // This should be an array
      username: selectUser, // Should have the correct user selected
      destinationName: selectDestinations, // Check this value
      countryName: selectCountry, // Ensure this is set properly
      totalDays, // Should be a number
      days, // Should be a number
      nights, // Should be a number
      dateFrom, // Ensure this is in the format "yyyy-MM-dd"
      dateTo, // Ensure this is in the format "yyyy-MM-dd"
      totalAdult, // Should be a number
      totalChild, // Should be a number
      vendor, // Ensure this is the correct vendor
      totalInfant, // Should be a number
      totalAmount, // Ensure this is a number
      installmentDetails: paymentMethod === "Installment" ? { installmentCount, installmentAmount } : null,
    };


    console.log("Submitting data:", postData); // Added logging

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/customizePackage`, postData);
      if (response.status === 200) {
        alert("Data submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data.");
    }
  };

  return (
    <div className="mx-auto w-[45%]  my-4 p-6 text-gray-800 bg-white shadow-md">
      <h2 className="text-2xl font-semibold text-center pt-2 text-blue mb-2">
        Customize Package
      </h2>
      <form onSubmit={handleSubmit} className="space-y-1">

        {/* users */}
        <div className="col-span-2" ref={userDropdownRef}>
          <label className="text-gray-800 font-semibold">Customer Name</label>
          <div className="relative">
            <div
              className="flex items-center justify-between w-full border rounded-xl border-blue px-2 py-2 cursor-pointer"
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            >
              <input
                type="text"
                className="bg-transparent text-gray-800 text-sm outline-none cursor-pointer w-full"
                value={selectUser || "Select a User"}
                readOnly
              />
              <span className="ml-2 text-gray-800">▼</span>
            </div>

            {isUserDropdownOpen && (
              <div className="absolute mt-1 w-full bg-white shadow-lg rounded-xl max-h-[7.5rem] overflow-auto z-50">
                <ul className="divide-y divide-gray-100">
                  {users.map((user, index) => (
                    <li
                      className="px-4 py-2 text-gray-800 hover:bg-blue-100 cursor-pointer"
                      key={index}
                      onClick={() => {
                        setSelectedUser(user.username); // Update selected user
                        setIsUserDropdownOpen(false);
                      }}
                    >
                      {user.username}
                    </li>
                  ))}
                </ul>
              </div>
            )}
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

        {/* Country Dropdown */}
        <div className="col-span-2" ref={countryDropdownRef}>
          <label className="text-gray-800 font-semibold">Country Name</label>
          <div className="relative">
            <div
              className="flex items-center justify-between w-full border rounded-xl border-blue px-2 py-2 cursor-pointer"
              onClick={() =>
                setICountryDropdownOpen(!isCountryDropdownOpen)
              }
            >
              <input
                type="text"
                className="bg-transparent text-gray-800 text-sm outline-none cursor-pointer w-full"
                value={selectCountry || "Select a Country"}
                readOnly
              />
              <span className="ml-2 text-gray-800">▼</span>
            </div>

            {isCountryDropdownOpen && (
              <div className="absolute mt-1 w-full bg-white shadow-lg rounded-xl max-h-[7.5rem] overflow-auto z-50">
                <ul className="divide-y divide-gray-100">
                  {destinations.map((country, index) => (
                    <li
                      className="px-4 py-2 text-gray-800 hover:bg-blue-100 cursor-pointer"
                      key={index}
                      onClick={() => {
                        setSelectedCountry(country.countryName);
                        setICountryDropdownOpen(false);
                      }}
                    >
                      {country.countryName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Destinations Dropdown */}
        <div className="col-span-2" ref={destinationsDropdownRef}>
          <label className="text-gray-800 font-semibold">Destinations</label>
          <div className="relative">
            <div
              className="flex items-center justify-between w-full border rounded-xl border-blue px-2 py-2 cursor-pointer"
              onClick={() =>
                setIDestinationsDropdownOpen(!isDestinationsDropdownOpen)
              }
            >
              <input
                type="text"
                className="bg-transparent text-gray-800 text-sm outline-none cursor-pointer w-full"
                value={selectDestinations || "Select a Destinations"}
                readOnly
              />
              <span className="ml-2 text-gray-800">▼</span>
            </div>

            {isDestinationsDropdownOpen && (
              <div className="absolute mt-1 w-full bg-white shadow-lg rounded-xl max-h-[7.5rem] overflow-auto z-50">
                <ul className="divide-y divide-gray-100">
                  {filteredDestinations.map((destination, index) => (
                    <li
                      className="px-4 py-2 text-gray-800 hover:bg-blue-100 cursor-pointer"
                      key={index}
                      onClick={() => {
                        setSelectedDestinations(destination.destinationName); // Set the selected destination
                        setIDestinationsDropdownOpen(false); // Close the dropdown
                      }}
                    >
                      {destination.destinationName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Date to and from  */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label htmlFor="dateTo" className="block text-sm font-medium">
              Date To
            </label>
            <input
              type="date"
              id="dateTo"
              value={dateTo}
              name="dateTo"
              onChange={handleToDateChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-2"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="dateFrom" className="block text-sm font-medium">
              Date From
            </label>
            <input
              type="date"
              value={dateFrom}
              id="dateFrom"
              name="dateFrom"
              onChange={handleFromDateChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-2"
            />
          </div>

        </div>

        {/* Total Days, Days, Nights */}
        <div className="pt-2 flex flex-row  gap-4 w-[29rem]">
          <div>
            <label className="text-gray-800 font-semibold">Total Days</label>
            <input
              type="number"
              value={totalDays}
              onChange={(e) => setTotalDays(e.target.value)}
              className="border rounded-xl  px-2 py-2 border-blue outline-none"
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

        {/* selected People type   */}
        <div className="py-3 flex flex-row gap-4 w-[29rem]">
          <div>
            <label className="text-gray-800 font-semibold">Adult (12+ Year)</label>
            <input
              type="number"
              value={totalAdult}
              onChange={(e) => setTotalAdult(e.target.value)}
              className="border rounded-xl w-full px-2 py-2 border-blue outline-none"
            />
          </div>
          <div>
            <label className="text-gray-800 font-semibold">Child(2-11 Years)</label>
            <input
              type="number"
              value={totalChild}
              onChange={(e) => setTotalChild(e.target.value)}
              className="border rounded-xl w-full px-2 py-2 border-blue outline-none"
            />
          </div>
          <div>
            <label className="text-gray-800 font-semibold">Infant (0-23 Months) </label>
            <input
              type="number"
              value={totalInfant}
              onChange={(e) => setTotalInfant(e.target.value)}
              className="border rounded-xl w-full px-2 py-2 border-blue outline-none"
            />
          </div>
        </div>
        <hr className=" border border-gray-400 rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.3),0_6px_20px_rgba(0,0,0,0.2)] bg-gradient-to-r from-gray-600 via-gray-900 to-gray-600" />

        {/* select multiple service */}
        <div className="col-span-2" ref={facilitiesDropdownRef}>
          <label className="text-gray-800 font-semibold">Select Services</label>
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
                value={
                  selectedFacilities.length > 0
                    ? selectedFacilities.join(", ")
                    : "Select Services"
                }
                readOnly
              />
              <span className="ml-2 text-gray-800">▼</span>
            </div>

            {isFacilitiesDropdownOpen && (
              <div className="absolute mt-1 w-full bg-white shadow-lg rounded-xl max-h-[7.5rem] overflow-auto z-50">
                <ul className="divide-y divide-gray-100">
                  {facilities.map((service, index) => (
                    <li
                      className="flex items-center px-4 py-2 text-gray-800 hover:bg-blue-100 cursor-pointer"
                      key={index}
                    >
                      <input
                        type="checkbox"
                        checked={selectedFacilities.includes(service.facilityName)}
                        onChange={() => handleServiceToggle(service.facilityName)}
                        className="mr-2"
                      />
                      {service.facilityName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Vendor */}
        <div className="col-span-2" >
          <label className="text-gray-800 font-semibold">Select Vendor</label>
          <div className="relative">
            <div
              className="flex items-center justify-between w-full border rounded-xl border-blue px-2 py-2 cursor-pointer"
            >
              <input
                type="text"
                id="vendor"
                value={vendor}
                className="bg-transparent text-gray-800 text-sm outline-none w-full"
                placeholder="Select a Vendor"
                onChange={handleVendorChange}
              />
              {/* <span className="ml-2 text-gray-800">▼</span> */}
            </div>
          </div>
        </div>

        {/* Total Amount */}
        <div>
          <label htmlFor="total" className="text-gray-800 block text-md font-medium">
            Total Amount *
          </label>
          <input
            type="number"
            id="totalAmount"
            value={totalAmount}
            onChange={handleAmount}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-2"
            placeholder="Enter Total Amount"
          />
        </div>

        {/* Payment Method */}
        <div className="flex flex-row gap-4">
          <div>
            <label className="text-gray-800 font-semibold">Payment Method</label>
            <div className="flex items-center space-x-8 mt-4">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Full Payment"
                  checked={paymentMethod === "Full Payment"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                Full Payment
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Installment"
                  checked={paymentMethod === "Installment"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                Installment
              </label>
            </div>
          </div>

          {/* Conditional Installment Fields */}
          {paymentMethod === "Installment" && (
            <div className="flex flex-row mt-6 gap-3">
              <div>
                <label className="text-gray-800 font-semibold">No. of per Installments</label>
                <input
                  type="number"
                  value={installmentCount}
                  onChange={(e) => setInstallmentCount(e.target.value)}
                  className="border rounded-md w-32 items-center px-2 py-1 border-blue outline-none"
                />
              </div>
              <div>
                <label className="text-gray-800 font-semibold">Amount per Installment</label>
                <input
                  type="number"
                  value={installmentAmount}
                  onChange={(e) => setInstallmentAmount(e.target.value)}
                  className="border rounded-md px-2 py-1 items-center border-blue outline-none w-32"
                />
              </div>
            </div>
          )}

        </div>

        {/* Submit */}
        <div className='flex justify-center'>
          <button
            type="submit"
            className="px-3 w-48 py-3 bg-blue text-white font-semibold rounded-xl mt-6"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomizePackage;
