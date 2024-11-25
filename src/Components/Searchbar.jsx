import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash/debounce";


const fetchSuggestions = async (query) => {
  if (query.length < 1) {
    return []; // Return an empty array if the query is too short
  }
  try {
    const response = await axios.get("http://localhost:3000/api/vehicles/search", {
      params: { query },
    });

    console.log("API Response:", response.data); // Log API response for debugging

    // Return a list of vehicle names starting with the query
    return response.data
      .filter((vehicle) =>
        vehicle.vehiclename.toLowerCase().startsWith(query.toLowerCase())
      )
      .map((vehicle) => vehicle.vehiclename);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return []; // Return an empty array in case of an error
  }
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounced fetchSuggestions function
  const fetchSuggestionsDebounced = useCallback(
    debounce(async (query) => {
      setLoading(true);
      const results = await fetchSuggestions(query);
      console.log("Debounced results:", results); // Debug results
      setSuggestions(results);
      setLoading(false);
    }, 300),
    []
  );

  // Call fetchSuggestionsDebounced whenever query changes
  useEffect(() => {
    if (query) {
      fetchSuggestionsDebounced(query);
    } else {
      setSuggestions([]);
    }
  }, [query, fetchSuggestionsDebounced]);

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion); // Set the selected suggestion as the query
    setSuggestions([]); // Clear suggestions
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <div className="relative w-full max-w-md mt-4">
        <div className="flex items-center p-2 bg-white rounded-full shadow-lg overflow-hidden">
          <button className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold py-2 px-4 rounded-full flex items-center justify-center mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 21l6-6m0 0l-6-6m6 6H3"
              />
            </svg>
            Search
          </button>
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search for vehicles..."
              className="w-full p-2 text-gray-700 text-lg rounded-full outline-none focus:ring-2 focus:ring-blue-500"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {loading && (
              <p className="absolute top-full right-0 mt-2 text-gray-500">Loading...</p>
            )}
          </div>
        </div>
        {suggestions.length > 0 && (
          <ul className="absolute left-0 right-0 bg-white shadow-lg rounded-lg border border-gray-300 mt-1 z-50">
            {suggestions.map((vehicle, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSuggestionClick(vehicle)}
              >
                {vehicle}
              </li>
            ))}
          </ul>
        )}
      </div>
     
    </div>
  );
}
