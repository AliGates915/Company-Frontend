/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function PaymentVoucher() {
    const [users, setUser] = useState([]);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState("");
    const [bookings, setBookings] = useState([]);
    const [isBookingDropdownOpen, setIsBookingDropdownOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [des, setDes] = useState("");
    const [voucherId, setVoucherId] = useState('');

    // Function to generate a new voucher ID
    const generateVoucherId = () => {
        // Assuming you want to auto-generate voucher ID sequentially.
        // You may want to adjust this logic based on how you want to track the last ID used.
        const lastId = parseInt(voucherId) || 0; // Convert current voucherId to a number or use 0
        const newId = lastId + 1; // Increment by 1
        const formattedId = String(newId).padStart(4, '0'); // Format with leading zeros to 4 digits
        setVoucherId(formattedId); // Update the state
    };

    // Auto-generate voucher ID when the component mounts
    useEffect(() => {
        generateVoucherId();
    }, []);

    // Separate refs for each dropdown
    const userDropdownRef = useRef(null);
    const bookingDropdownRef = useRef(null);

    useEffect(() => {

        fetchUsers();

        // Event listener for outside click
        const handleClickOutside = (event) => {
            if (
                userDropdownRef.current &&
                !userDropdownRef.current.contains(event.target)
            ) {
                setIsUserDropdownOpen(false);
            }
            if (bookingDropdownRef.current && !bookingDropdownRef.current.contains(event.target)) {
                setIsBookingDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("/users");
            setUser(response.data);
            console.log("Fetched packages:", response.data);
        } catch (error) {
            console.error("Error fetching packages:", error);
        }
    };


    const handleUserSelect = (user) => {
        setSelectedUser(user.username); // Update selected user
        setIsUserDropdownOpen(false);

        // Automatically create a booking ID using the user ID
        const newBookingId = user._id; // This is the booking ID based on user ID
        setSelectedBooking(newBookingId); // Set the selected booking ID
        // Optionally add it to the bookings array if you want to keep track of it
        setBookings(prevBookings => [...prevBookings, newBookingId]);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value); // Set the value to the string from the input
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {
            users: selectedUser,
            des,
            booking: selectedBooking,
            date,
            amount,
            voucherId,
        };

        console.log("Submitting data:", postData); // Added logging

        try {
            const response = await axios.post("/voucher", postData);
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
                Payment Voucher
            </h1>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 ml-[3rem] mt-6 w-[75%]">

                    <div className="flex space-x-4">
                        {/* Date Field */}
                        <div className="col-span-2 ">
                            <label className="text-sm font-medium text-gray-800">
                                Date
                            </label>
                            <input
                                type="date"
                                value={date}
                                onChange={handleDateChange}
                                className="mt-1 w-full border border-blue rounded-xl shadow-sm py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div className="col-span-2 ">
                            <label className="text-sm font-medium text-gray-800">
                                Voucher ID
                            </label>
                            <input
                                type="number"
                                value={voucherId}
                                disabled
                                className="mt-1 w-full border border-blue rounded-xl shadow-sm py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                    </div>

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
                                    value={selectedUser || "Select a User"}
                                    readOnly
                                />
                                <span className="ml-2 text-gray-800">▼</span>
                            </div>
                            {isUserDropdownOpen && (
                                <div className="absolute mt-1 w-full bg-white shadow-lg rounded-xl max-h-[7.5rem] overflow-auto z-50">
                                    <ul className="divide-y divide-gray-100">
                                        {users.map((user) => (
                                            <li
                                                className="px-4 py-2 text-gray-800 hover:bg-blue-100 cursor-pointer"
                                                key={user._id}
                                                onClick={() => handleUserSelect(user)}
                                            >
                                                {user.username}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Booking Dropdown */}
                    <div className="col-span-2" ref={bookingDropdownRef}>
                        <label className="text-gray-800 font-semibold">Booking ID</label>
                        <div className="relative">
                            <div
                                className="flex items-center justify-between w-full border rounded-xl border-blue px-2 py-2 cursor-pointer"
                                onClick={() => setIsBookingDropdownOpen(!isBookingDropdownOpen)}
                            >
                                <input
                                    type="text"
                                    className="bg-transparent text-gray-800 text-sm outline-none cursor-pointer w-full"
                                    value={selectedBooking || "Select a Booking ID"}
                                    readOnly
                                />
                                <span className="ml-2 text-gray-800">▼</span>
                            </div>
                            {isBookingDropdownOpen && (
                                <div className="absolute mt-1 w-full bg-white shadow-lg rounded-xl max-h-[7.5rem] overflow-auto z-50">
                                    <ul className="divide-y divide-gray-100">
                                        {bookings.map((booking) => (
                                            <li
                                                className="px-4 py-2 text-gray-800 hover:bg-blue-100 cursor-pointer"
                                                key={booking}
                                                onClick={() => {
                                                    setSelectedBooking(booking);
                                                    setIsBookingDropdownOpen(false);
                                                }}
                                            >
                                                {booking}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Amount Field */}
                    <div className="col-span-2 w-full">
                        <label className="text-sm font-medium text-gray-800">Amount</label>
                        <input
                            type="text"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="mt-1 w-full border border-blue rounded-xl shadow-sm py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Description Field */}
                    <div className="col-span-2 w-full">
                        <label className="text-sm font-medium text-gray-800">Description</label>
                        <textarea
                            value={des}
                            onChange={(e) => setDes(e.target.value)}
                            className="mt-1 w-full border border-blue rounded-xl shadow-sm py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-2 flex justify-center">
                        <button
                            type="submit"
                            className="w-32 bg-blue text-white font-semibold rounded-xl py-2 hover:bg-blue-700"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default PaymentVoucher;
