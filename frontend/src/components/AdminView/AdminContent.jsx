import React, { useState } from 'react'

const AdminContent = () => {
    const [activeTab, setActiveTab] = useState(1);
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
                        <li>
                            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={() => setActiveTab(5)}>
                                <svg class="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                                </svg>
                                <span class="flex-1 ms-3 whitespace-nowrap">Statistics</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
            {/*This is dashboard */}
            {activeTab == 1 && (
            <div class="p-4 sm:ml-64">
                <div class="p-4">
                    <h1 class="text-2xl font-semibold mb-4">TicketSewa Dashboard</h1>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex flex-col justify-between">
                            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Tickets Sold</p>
                            <h2 class="text-2xl font-bold text-gray-800 dark:text-white mt-2">1,245</h2>
                        </div>
                        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex flex-col justify-between">
                            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Revenue</p>
                            <h2 class="text-2xl font-bold text-gray-800 dark:text-white mt-2">Rs. 5,30,000</h2>
                        </div>
                        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex flex-col justify-between">
                            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Active Events</p>
                            <h2 class="text-2xl font-bold text-gray-800 dark:text-white mt-2">36</h2>
                        </div>
                        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex flex-col justify-between">
                            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">New Users</p>
                            <h2 class="text-2xl font-bold text-gray-800 dark:text-white mt-2">108</h2>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
                            <h3 class="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Recent Ticket Sales</h3>
                            <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                                <li>🎟️ 2 tickets sold for “Live Concert”</li>
                                <li>🎟️ 1 ticket sold for “Drama Night”</li>
                                <li>🎟️ 5 tickets sold for “Football Match”</li>
                                <li>🎟️ 3 tickets sold for “Coding Workshop”</li>
                            </ul>
                        </div>

                        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
                            <h3 class="text-lg font-semibold mb-2 text-gray-800 dark:text-white">User Feedback</h3>
                            <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                                <li>⭐ “Great service, quick booking!”</li>
                                <li>⭐ “Loved the event listings.”</li>
                                <li>⭐ “Easy to use interface!”</li>
                                <li>⭐ “Need better payment options.”</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            )}

            {activeTab ==2 && (
                <div className="p-4 sm:ml-64">
                <div className="p-4">
                  <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Update Event</h1>
              
                  <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 max-w-4xl mx-auto">
                    <form className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Event Title</label>
                        <input name='name' type='text' required className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white" />
                      </div>
              
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Update Event Image</label>
                        <input name='event_image' type='file' className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white" />
                      </div>
              
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                        <textarea name='description' rows="4" required className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white" />
                      </div>
              
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country</label>
                          <input name="country" type='text' required className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
                          <input name="city" type='text' required className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white" />
                        </div>
                      </div>
              
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                          <input name="date" type='date' required className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time</label>
                          <input name="time" type='time' required className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white" />
                        </div>
                      </div>
              
                      <div className="flex items-center">
                        <input name="is_featured" type='checkbox'className="mr-2" />
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Featured Event</label>
                      </div>
              
                      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Update Event</button>
                    </form>
                  </div>
                </div>
              </div>              
            )}

        </>
    )
}

export default AdminContent