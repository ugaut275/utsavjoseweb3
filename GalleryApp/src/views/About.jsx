import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-amber-50">
            <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    {/* Header Section */}
                    <div className="px-8 pt-8 pb-6">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">Gallery App</h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                       
                        </p>
                    </div>

                    {/* Disclaimer Banner */}
                    <div className="bg-amber-50 border-y border-amber-100 px-8 py-4 mb-8">
                        <p className="text-amber-800 text-sm font-medium">
                            ⓘ Important Note: Since i created the gallery view and the single gallery components first... all other components follow the same/similar stylings and logic 
                            to save time i didnt comment on all the copies of logic in other pages and have tried to be as descriptive as possible in the original
                        </p>
                    </div>

                    <div className="px-8 space-y-10">
                        {/* Assumptions Section */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-purple-600">Development Assumptions</h2>
                            <div className="bg-purple-50 rounded-2xl p-6">
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-center gap-3">
                                        <span className="text-purple-400 text-xl">◆</span>
                                        Favourites button doesnt work when localstorage its empty for the respective type... favourites button doesnt work on galleries when gallery is empty though it wasnt explicitly mentioned to mimick this in other pages.. i decided it would make the most sense to do so. Therefore fav button on artists page doesnt work when favArtits is empty
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="text-purple-400 text-xl">◆</span>
                                        Primarily meant for a desktop view though responsiveness was taken into consideration
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="text-purple-400 text-xl">◆</span>
                                        Favourties selections need to be persistant across different sessions
                                    </li>
                                  
                                </ul>
                            </div>
                        </section>

                        {/* AI Section */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-indigo-600">AI-Assisted/Generated Features</h2>
                            <div className="bg-indigo-50 rounded-2xl p-6">
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-center gap-3">
                                        <span className="text-indigo-400 text-xl">○</span>
                                        404 page implementation and styling
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="text-indigo-400 text-xl">○</span>
                                        API response merging in singleGenreCard.jsx
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="text-indigo-400 text-xl">○</span>
                                        In the gallery view, used AI to help with making the favourites Link conditionally render based on the local storage data. ( i had some issues trying to use the (state)? 'something' : 'something else' syntax and AI helped me debug it)
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="text-indigo-400 text-xl">○</span>
                                        In the gallery view, used AI to help with making the favourites Link conditionally render based on the local storage data. ( i had some issues trying to use the (state)? 'something' : 'something else' syntax and AI helped me debug it)
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="text-indigo-400 text-xl">○</span>
                                        As i was debugging the conditional render AI added an event listener to close the drop down when clicking outside of it.
                                    </li>
                                    <li className="flex bg-amber-200 text-amber-800 items-center gap-3">
                                        <span className="text-indigo-400 text-xl">○</span>
                                        Click here to see chat history with AI (some queries seems to have not been included because i uploaded a SS of my code and apparently you cant share the link of a chat with images uploaded): <a href="https://chatgpt.com/share/67e2f60d-c408-800f-a241-84f6ee4ad6c3" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Chat History</a>
                                        </li>
                                </ul>
                            </div>
                        </section>

                        {/* References Section */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold text-emerald-600">Design Resources</h2>
                            <div className="bg-emerald-50 rounded-2xl p-6">
                                <ul className="space-y-4 text-gray-700">
                                    <li>
                                        <a href="https://tailwindflex.com/@mr-robot/card-grid-section" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="group block p-3 rounded-lg hover:bg-emerald-100/50 transition-colors">
                                            <span className="font-medium text-emerald-700">Card Designs</span>
                                            <p className="mt-1 text-sm text-emerald-600">Card design for the painting displayed across the app.. used as inspiration but i think my cards are quite original</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.material-tailwind.com/docs/react/modal" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="group block p-3 rounded-lg hover:bg-emerald-100/50 transition-colors">
                                            <span className="font-medium text-emerald-700">Modal Components</span>
                                            <p className="mt-1 text-sm text-emerald-600"> Code for the Modal </p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="//https://dribbble.com/search/modal" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="group block p-3 rounded-lg hover:bg-emerald-100/50 transition-colors">
                                            <span className="font-medium text-emerald-700">Modal Components</span>
                                            <p className="mt-1 text-sm text-emerald-600"> Design for the modal</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://tw-elements.com/docs/standard/components/spinners/" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="group block p-3 rounded-lg hover:bg-emerald-100/50 transition-colors">
                                            <span className="font-medium text-emerald-700">Loading Spinner </span>
                                            <p className="mt-1 text-sm text-emerald-600"> Basically was a copy paste for this </p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://flowbite.com/docs/https://flowbite.com/docs/cards/" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="group block p-3 rounded-lg hover:bg-emerald-100/50 transition-colors">
                                            <span className="font-medium text-emerald-700">Card Design</span>
                                            <p className="mt-1 text-sm text-emerald-600"> More Card Designs</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://flowbite.com/docs/https://https://flowbite.com/docs/buttons/.com/docs/cards/" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="group block p-3 rounded-lg hover:bg-emerald-100/50 transition-colors">
                                            <span className="font-medium text-emerald-700">Buttons Design</span>
                                            <p className="mt-1 text-sm text-emerald-600"> Base Design for buttons across the app</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://api.reactrouter.com/v7/functions/react_router.Link.html" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="group block p-3 rounded-lg hover:bg-emerald-100/50 transition-colors">
                                            <span className="font-medium text-emerald-700">General React  </span>
                                            <p className="mt-1 text-sm text-emerald-600"> Used this page extensively for react documentation</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://flowbite.com/docs/forms/input-field/ " 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="group block p-3 rounded-lg hover:bg-emerald-100/50 transition-colors">
                                            <span className="font-medium text-emerald-700">Input field for LoginView</span>
                                            <p className="mt-1 text-sm text-emerald-600"> Input field</p>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* Navigation Footer */}
                        <div className="py-8 mt-8 border-t border-gray-200 flex justify-between items-center">
                            <Link to="/gallery" 
                                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl shadow-lg shadow-indigo-200 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200">
                                Return to Gallery
                            </Link>
                            <span className="text-sm text-gray-500">Version 1.0</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;