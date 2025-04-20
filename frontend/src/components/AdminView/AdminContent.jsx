import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { decodeToken } from '../../Utils/authtoken';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';


const AdminContent = () => {
    const [activeTab, setActiveTab] = useState(1);
    const [ticket_type, setTicketType] = useState('');
    const [ticket_price, setTicketPrice] = useState('');
    const [transactionList, setTransactionList] = useState([]);
    const [nameFilter, setNameFilter] = useState('');
    const [emailFilter, setEmailFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    // data to show in dashboard 
    const [eventName, setEventName] = useState('');
    const [totalTicketSold, setTotalTicketSold] = useState('');
    const [totalRevenue, setTotalRevenue] = useState('');
    const [todaySale, setTodaySale] = useState('');
    const [recentBuyer, setRecentBuyer] = useState([]);
    const [recentComment, setRecentComment] = useState([]);
    const [saleData, setSaleData] = useState([]);
    const [message, setMessage] = useState('');
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [prevPageUrl, setPrevPageUrl] = useState(null);
    const { eventId } = useParams();
    const token = localStorage.getItem("authToken");
    const storedUserId = token ? decodeToken(token).user_id : null;
    const navigate = useNavigate();

    const [eventData, setEventData] = useState({
        name: "",
        description: "",
        event_type: "",
        event_image: null,
        country: "",
        city: "",
        latitude: "",
        longitude: "",
        address: "",
        date: "",
        time: "",
        ticket_active: false,
        max_tickets: "",
        is_featured: false
    });

    const handleTicketSubmit = async (e) => {
        e.preventDefault();
        if (!storedUserId) {
            setMessage("User not authenticated");
            return;
        }
        try {
            const response = await fetch('http://127.0.0.1:8000/ticketviewapi/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ticket_type,
                    ticket_price: Number(ticket_price),
                    event: eventId,
                    user: storedUserId
                })
            });
            const data = await response.json();
            if (response.ok) {
                setMessage("Ticket Added Successfully");
            } else {
                setMessage(data.error || "Something went wrong");
            }
        } catch (error) {
            setMessage("Failed to connect to the server");
        }
    };

    const filteredTransactions = Array.isArray(transactionList)
        ? transactionList
            .filter((payment) =>
                payment.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
                payment.email.toLowerCase().includes(emailFilter.toLowerCase())
            )
            .sort((a, b) => {
                if (sortOrder === 'asc') return a.name.localeCompare(b.name);
                if (sortOrder === 'desc') return b.name.localeCompare(a.name);
                return 0;
            })
        : [];
    const fetchPayments = async (url = `http://127.0.0.1:8000/paymenteventviewapi/${eventId}/`) => {
        try {
            const response = await axios.get(url);
            const data = response.data;
            setTransactionList(data.results || []);
            setNextPageUrl(data.next);
            setPrevPageUrl(data.previous);
        } catch (error) {
            console.error("Error fetching payment list:", error);
        }
    };
    const handleStatusChange = async (email) => {
        try {
            navigate(`/changestatus/${email}`)
        } catch (error) {
            console.error("Error updating payment status:", error);
            setMessage("Failed to change payment status.");
        }
    };


    useEffect(() => {
        if (!storedUserId) return;

        const fetchTicketAddCheck = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/checkticketadd/${eventId}/${storedUserId}/`);
                console.log("Can I see the message");
                console.log(response.data.checked);
            } catch (err) {
                console.log("Error fetching the results:", err);
            }
        };

        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/eventviewapi/${eventId}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEventData(response.data);
            } catch (error) {
                console.error("Error fetching event details:", error);
            }
        };
        const fetchDashboardDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/event/dashboarddataapi/${eventId}/`);
                console.log("dashboard data");
                console.log(response.data);
                console.log(response.data.event_name);
                setEventName(response.data.event_name);
                console.log(response.data.total_tickets_sold);
                setTotalTicketSold(response.data.total_tickets_sold);
                console.log(response.data.total_revenue);
                setTotalRevenue(response.data.total_revenue);
                console.log(response.data.sales_today);
                setTodaySale(response.data.sales_today);
                console.log(response.data.recent_buyers);
                setRecentBuyer(response.data.recent_buyers);
                console.log(response.data.recent_comments);
                setRecentComment(response.data.recent_comments);
                setSaleData(response.data.sales_over_time);
            }
            catch (error) {
                console.error("Error fetching dashboard data", error);
            }
        };

        fetchTicketAddCheck();
        if (eventId) {
            fetchEventDetails();
            fetchPayments();
        }
        fetchDashboardDetails();

    }, [eventId, storedUserId, token]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        setEventData((prevData) => ({
            ...prevData,
            event_image: e.target.files[0],
        }));
    };

    const handleEventUpdate = async (e) => {
        e.preventDefault();
        if (!storedUserId) {
            alert("User not authenticated!");
            return;
        }

        const updatedEventData = new FormData();
        Object.entries(eventData).forEach(([key, value]) => {
            updatedEventData.append(key, value);
        });

        try {
            await axios.put(`http://127.0.0.1:8000/eventviewapi/${eventId}/`, updatedEventData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Event updated successfully!");
        } catch (error) {
            console.error("Error updating event:", error.response?.data || error.message);
        }
    };

    return (
        <>

            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span class="sr-only">Open sidebar</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul class="space-y-2 font-medium">
                        <li className="p-2 cursor-pointer" onClick={() => navigate("/")}>
                            <span className="font-bold text-gray-900 dark:text-white select-none">
                                TicketSewa
                            </span>
                        </li>
                        <li>
                            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={() => setActiveTab(1)}>
                                <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span class="ms-3">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={() => setActiveTab(2)}>
                                <svg class="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                </svg>
                                <span class="flex-1 ms-3 whitespace-nowrap">Update Event</span>
                                {/*<span class="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>*/}
                            </a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={() => setActiveTab(3)}>
                                <svg class="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span class="flex-1 ms-3 whitespace-nowrap">Add Ticket</span>
                                {/*<span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>*/}
                            </a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={() => setActiveTab(4)}>
                                <svg class="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                </svg>
                                <span class="flex-1 ms-3 whitespace-nowrap">Ticket</span>
                            </a>
                        </li>
                        {/*
                        <li>
                            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={() => setActiveTab(5)}>
                                <svg class="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                                </svg>
                                <span class="flex-1 ms-3 whitespace-nowrap">Statistics</span>
                            </a>
                        </li>
                        */}
                    </ul>
                </div>
            </aside>
            {/*This is dashboard */}
            {activeTab == 1 && (
                <div class="p-4 sm:ml-64">
                    <div class="p-4">
                        <h1 class="text-2xl font-semibold mb-4">Contributor Dashboard</h1>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex flex-col justify-between">
                                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">EventName</p>
                                <h2 class="text-2xl font-bold text-gray-800 dark:text-white mt-2">{eventName}</h2>
                            </div>
                            <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex flex-col justify-between">
                                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Ticket Sold</p>
                                <h2 class="text-2xl font-bold text-gray-800 dark:text-white mt-2">{totalTicketSold}</h2>
                            </div>
                            <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex flex-col justify-between">
                                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
                                <h2 class="text-2xl font-bold text-gray-800 dark:text-white mt-2">Rs. {totalRevenue}</h2>
                            </div>
                            <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex flex-col justify-between">
                                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Today's Sale</p>
                                <h2 class="text-2xl font-bold text-gray-800 dark:text-white mt-2">{todaySale}</h2>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
                                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Recent Buyers</h3>
                                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                                    {recentBuyer.map((buyer, index) => (
                                        <li key={index}>
                                            👤 {buyer.name} - ✉️ {buyer.date}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
                                <h3 class="text-lg font-semibold mb-2 text-gray-800 dark:text-white">User Feedback</h3>
                                <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                                    {recentComment.map((comment, index) => (
                                        <li>⭐ “{comment.comment}”</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 mt-4">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Sales Over Time</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={saleData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                    </div>
                </div>
            )}

            {activeTab == 2 && (
                <div className="p-4 sm:ml-64">
                    <div className="p-4">
                        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 max-w-4xl mx-auto">
                            <h2 className="text-2xl font-bold mb-6 text-center">Update Event</h2>
                            <form className="space-y-5" onSubmit={handleEventUpdate}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Event Title</label>
                                    <input name='name' type='text' value={eventData.name} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Update Event Image</label>
                                    <input name='event_image' type='file' className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white" onChange={handleFileChange} />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                                    <textarea name='description' rows="4" required className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white" value={eventData.description} onChange={handleInputChange} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country</label>
                                        <input name="country" type='text' required className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white" value={eventData.country} onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
                                        <input name="city" type='text' required className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white" value={eventData.city} onChange={handleInputChange} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                                        <input name="date" type='date' required className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white" value={eventData.date} onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time</label>
                                        <input name="time" type='time' required className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white" value={eventData.time} onChange={handleInputChange} />
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <input name="is_featured" type='checkbox' className="mr-2" />
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300" checked={eventData.is_featured} onChange={handleInputChange}>Featured Event</label>
                                </div>

                                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Update Event</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {/**add ticket */}
            {activeTab == 3 && (
                <div className="max-w-4xl mt-4 mx-auto p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold mb-6 text-center">Add Ticket</h2>
                    <form onSubmit={handleTicketSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Ticket Type</label>
                            <input
                                type="text"
                                value={ticket_type}
                                onChange={(e) => setTicketType(e.target.value)}
                                required
                                placeholder="e.g. VIP, Regular"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Ticket Price</label>
                            <input
                                type="number"
                                value={ticket_price}
                                onChange={(e) => setTicketPrice(e.target.value)}
                                placeholder="e.g. 1000"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Submit
                        </button>
                    </form>
                    {/* Optional Message */}
                    <p className="mt-4 text-center text-sm text-red-500">{message}</p>
                </div>

            )}

            {/* all transactions*/}
            {activeTab == 4 && (
                <div className="sm:ml-64 p-4 mt-4">
                    <h2 className="text-2xl font-bold mb-6 text-center">All Tickets</h2>
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Filter by Name"
                                className="border px-3 py-1 rounded-md"
                                onChange={(e) => setNameFilter(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Filter by Email"
                                className="border px-3 py-1 rounded-md"
                                onChange={(e) => setEmailFilter(e.target.value)}
                            />
                        </div>
                        <select
                            className="border px-3 py-1 rounded-md"
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="">Sort by Name</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">S.N</th>
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Email</th>
                                    <th scope="col" className="px-6 py-3">Amount</th>
                                    <th scope="col" className="px-6 py-3">Ticket Type</th>
                                    <th scope="col" className="px-6 py-3">Created At</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTransactions.map((payment, index) => (
                                    <tr key={payment.payment_id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <td className="px-6 py-4">{payment.payment_id}</td>
                                        <td className="px-6 py-4">{payment.name}</td>
                                        <td className="px-6 py-4">{payment.email}</td>
                                        <td className="px-6 py-4">${payment.amount}</td>
                                        <td className="px-6 py-4">{payment.ticket_type}</td>
                                        <td className="px-6 py-4">{new Date(payment.created_at).toLocaleString()}</td>
                                        {/*
                                        <td className="px-6 py-4">
                                            {payment.status === 'paid' ? (
                                                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                                    Paid
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() => handleStatusChange(payment.email, payment.code)}
                                                    className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                                >
                                                    Mark as Paid
                                                </button>
                                            )}
                                        </td>
                                        */}
                                        <td className="px-6 py-4">
                                            <button onClick={() => handleStatusChange(payment.email)} className="text-black">
                                                Change Status to {payment.status === 1 ? "IN" : "OUT"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/*trying to show the input button */}
                        <div className="flex justify-center space-x-4 mt-4">
                            <button
                                onClick={() => prevPageUrl && fetchPayments(prevPageUrl)}
                                disabled={!prevPageUrl}
                                className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400`}
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => nextPageUrl && fetchPayments(nextPageUrl)}
                                disabled={!nextPageUrl}
                                className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400`}
                            >
                                Next
                            </button>
                        </div>

                    </div>
                </div>
            )}

            {activeTab == 5 && (
                <h2>This is it</h2>
            )}

        </>
    )
}

export default AdminContent