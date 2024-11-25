import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash"; // Ensure you have lodash for debounce
import Loading from "./loading";

const fetchSuggestions = async (query) => {
  if (query.length < 1) {
    return []; // Return an empty array if the query is too short
  }
  try {
    const response = await axios.get(
      "http://localhost:3000/api/vehicles/search",
      {
        params: { query },
      }
    );

    console.log("API Response:", response.data); // Log API response for debugging

    // Return a list of vehicle objects that match the query
    return response.data.filter((vehicle) =>
      vehicle.vehiclename.toLowerCase().startsWith(query.toLowerCase())
    );
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return []; // Return an empty array in case of an error
  }
};

const fetchServicesByVehicleType = async (vehicleType) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/services/services/${vehicleType}`
    );
    return response.data.services; // Adjust based on your response structure
  } catch (error) {
    console.error("Error fetching services:", error);
    return null; // Return null or an empty object on error
  }
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState(null);
  const [isVehicleSelected, setIsVehicleSelected] = useState(false); // Track whether a vehicle is selected
  const [vehicleType, setVehicleType] = useState(""); // New state variable for vehicle type
  const [selectedVehicleName, setSelectedVehicleName] = useState(""); // State for the selected vehicle name
  const [leading, setLeading] = useState(false); //start with loading

  const fetchSuggestionsDebounced = useCallback(
    debounce(async (query) => {
      setLoading(true);
      const results = await fetchSuggestions(query);
      setSuggestions(results);
      setLoading(false);
    }, 300),
    []
  );

  useEffect(() => {
    if (query) {
      fetchSuggestionsDebounced(query);
    } else {
      setSuggestions([]);
      setIsVehicleSelected(false); // Reset when query is cleared
    }
  }, [query, fetchSuggestionsDebounced]);

  const handleSuggestionClick = async (suggestion) => {
    setQuery(suggestion.vehiclename); // Set the input to the selected vehicle name
    setSelectedVehicleName(suggestion.vehiclename); // Set selected vehicle name
    setSuggestions([]);
    setIsVehicleSelected(true); // Mark that a vehicle has been selected
    setLeading(true);

    const type = suggestion.type; // Use the type from the suggestion
    setVehicleType(type); // Set the vehicle type in state

    // Fetch services based on vehicle type
    // Start loading while fetching services
    setLoading(true);
    const fetchedServices = await fetchServicesByVehicleType(type);
    setServices(fetchedServices);
    setLoading(false); // Stop loading once services are fetched

    
    
    setLeading(false); // Stop loading once services are fetched

  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/image/type/${vehicleType}`, // Now using vehicleType
        {
          responseType: "json", // Expect a JSON response with the image URL
        }
      );

      const imageUrl = response.data.imageUrl; // Get the image URL from the response

      // Create a link element to initiate the download
      const a = document.createElement("a");
      a.href = imageUrl;
      a.download = `image_${vehicleType}.jpg`; // Set the file name for download
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  if (leading) {
     // Show loading screen while data is being fetched
     return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loading/>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-100 p-1">
      <div className="w-full max-w-7xl flex flex-col items-center bg-gray-100 p-1">
        <div className="relative w-full max-w-md mt-2">
          <div className="flex items-center p-1 bg-white rounded-full shadow-lg overflow-hidden">
            {/* Input Field */}
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search for vehicles..."
                className="w-full p-0.5 text-gray-700 text-xs rounded-full outline-none focus:ring-1 focus:ring-blue-500"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIsVehicleSelected(false); // Reset when user types a new query
                }}
              />
              {loading && (
                <p className="absolute top-full right-0 mt-0.5 text-gray-500 text-xxs">
                  Loading...
                </p>
              )}
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              disabled={!isVehicleSelected} // Disable the button if no vehicle is selected
              className={`${
                isVehicleSelected
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white text-xs font-bold py-0.5 px-1.5 rounded-full flex items-center justify-center ml-auto`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4 4m0 0l4-4m-4 4V4"
                />
              </svg>
              Download
            </button>
          </div>

          {suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 bg-white shadow-lg rounded-lg border border-gray-300 mt-1 z-50 text-xs max-h-24 overflow-auto">
              {suggestions.map((vehicle) => (
                <li
                  key={vehicle._id}
                  className="p-0.5 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSuggestionClick(vehicle)}
                >
                  {vehicle.vehiclename}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-gray-50 mt-1 w-full h-full overflow-hidden">
          <h1 className="text-xs font-bold text-gray-900 mb-1 text-center">
            Price For <b>{selectedVehicleName || "Vehicle"}</b>
          </h1>
          {services && (
            <div className="px-0.5 py-1">
              {/* Nano Diamond Coating */}
              <h2 className="text-xs font-bold text-gray-900 bg-blue-500 text-white py-0.5 text-center mb-1">
                Nano Diamond Coating
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 mb-2">
                {Object.entries(
                  services[0].services["Nano Diamond Coating"]
                ).map(([packageName, packageDetails]) => (
                  <div
                    key={packageName}
                    className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 p-1 text-xs"
                  >
                    <h4 className="font-semibold text-center">{packageName}</h4>
                    <p className="text-gray-700">
                      Price: ₹{packageDetails.Price}
                    </p>
                    <p className="text-gray-700">
                      Warranty: {packageDetails.Warranty}
                    </p>
                    {packageDetails.MaintenanceServices && (
                      <p className="text-gray-700">
                        Maintenance: {packageDetails.MaintenanceServices}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Graphene Coating */}
              <h2 className="text-xs font-bold text-gray-900 bg-blue-500 text-white py-0.5 text-center mb-1">
                Graphene Coating
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 mb-2">
                {Object.entries(services[0].services["Graphene Coating"]).map(
                  ([packageName, packageDetails]) => (
                    <div
                      key={packageName}
                      className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 p-1 text-xs"
                    >
                      <h4 className="font-semibold text-center">
                        {packageName}
                      </h4>
                      <p className="text-gray-700">
                        Price: ₹{packageDetails.Price}
                      </p>
                      <p className="text-gray-700">
                        Warranty: {packageDetails.Warranty}
                      </p>
                      {packageDetails.MaintenanceServices && (
                        <p className="text-gray-700">
                          Maintenance: {packageDetails.MaintenanceServices}
                        </p>
                      )}
                    </div>
                  )
                )}
              </div>

              {/* Other Coating Services */}
              <h2 className="text-xs font-bold text-gray-900 bg-blue-500 text-white py-0.5 text-center mb-1">
                Other Coating Services
              </h2>
              <div className="flex flex-wrap justify-center gap-4 mb-2">
                {Object.entries(services[0].services["Other Coatings"]).map(
                  ([packageName, packageDetails]) => (
                    <div
                      key={packageName}
                      className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 p-2 text-xs max-w-xs text-center"
                    >
                      <h4 className="font-semibold">{packageName}</h4>
                      <p className="text-gray-700">
                        Price: ₹{packageDetails.Price}
                      </p>
                      <p className="text-gray-700">
                        Warranty: {packageDetails.Warranty}
                      </p>
                    </div>
                  )
                )}
              </div>

              {/* Additional Information Section */}
              {services[0].services["Additional Information"] && (
                <div className="bg-white rounded-lg overflow-hidden shadow-lg p-1 text-xs mb-2">
                  <p className="text-gray-800 text-center">
                    {services[0].services["Additional Information"].Details}
                  </p>
                </div>
              )}

              {/* Other Detailing Services */}
              <h2 className="text-xs font-bold text-gray-900 bg-blue-500 text-white py-0.5 text-center mb-1">
                Other Detailing Services
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 mb-2">
                {Object.entries(
                  services[0].services["Other Detailing Services"]
                ).map(([serviceName, servicePrice]) => (
                  <div
                    key={serviceName}
                    className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 p-1 text-xs"
                  >
                    <h4 className="font-semibold text-center">{serviceName}</h4>
                    <p className="text-gray-700 text-center">
                      Price: ₹{servicePrice}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
