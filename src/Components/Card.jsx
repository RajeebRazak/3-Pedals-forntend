import React from "react";


export const Card = () => {
  console.log('Card component rendered');
  return (
    <div className="bg-gray-50">
    <h1 className="text-xl font-bold text-gray-900 mb-1 text-center">Services</h1>
  
    <div className="relative mb-1 px-1">
      <h2 className="text-sm font-bold text-gray-900 text-center">Nano Diamond Coating</h2>
      <button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-md shadow-md transition-transform transform hover:scale-105 text-xs">
        Download
      </button>
    </div>
  
    <section className="py-4 bg-gray-50">
      <div className="container mx-auto px-1">
        <div className="flex flex-wrap justify-between -mx-1">
          <div className="w-full sm:w-1/2 md:w-1/4 px-1 mb-1">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="p-1">
                <h3 className="text-xs font-semibold mb-1">Bronze - 2yrs Warranty</h3>
                <h4 className="text-xs font-semibold mb-1">₹25,000</h4>
                <p className="text-gray-600 mb-1 text-xxs">1 free maintenance</p>
              </div>
            </div>
          </div>
  
          <div className="w-full sm:w-1/2 md:w-1/4 px-1 mb-1">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="p-1">
                <h3 className="text-xs font-semibold mb-1">Gold - 3yrs Warranty</h3>
                <h4 className="text-xs font-semibold mb-1">₹415,000</h4>
                <p className="text-gray-600 mb-1 text-xxs">2 free maintenance</p>
              </div>
            </div>
          </div>
  
          <div className="w-full sm:w-1/2 md:w-1/4 px-1 mb-1">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="p-1">
                <h3 className="text-xs font-semibold mb-1">Platinum - 4yrs Warranty</h3>
                <h4 className="text-xs font-semibold mb-1">₹51,500</h4>
                <p className="text-gray-600 mb-1 text-xxs">3 free maintenance</p>
              </div>
            </div>
          </div>
  
          <div className="w-full sm:w-1/2 md:w-1/4 px-1 mb-1">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="p-1">
                <h3 className="text-xs font-semibold mb-1">Diamond - 5yrs Warranty</h3>
                <h4 className="text-xs font-semibold mb-1">₹60,500</h4>
                <p className="text-gray-600 mb-1 text-xxs">4 free maintenance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  
    <h2 className="text-sm font-bold text-center text-gray-900 mb-2">Graphene Coating</h2>
  
    <section className="py-4">
      <div className="container mx-auto px-1">
        <div className="flex flex-wrap justify-between -mx-1">
          <div className="w-full sm:w-1/2 md:w-1/4 px-1 mb-1">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="p-1">
                <h3 className="text-xs font-semibold mb-1">Bronze - 2yrs Warranty</h3>
                <h4 className="text-xs font-semibold mb-1">₹19,000</h4>
                <p className="text-gray-600 mb-1 text-xxs">1 free maintenance</p>
              </div>
            </div>
          </div>
  
          <div className="w-full sm:w-1/2 md:w-1/4 px-1 mb-1">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="p-1">
                <h3 className="text-xs font-semibold mb-1">Gold - 3yrs Warranty</h3>
                <h4 className="text-xs font-semibold mb-1">₹35,000</h4>
                <p className="text-gray-600 mb-1 text-xxs">2 free maintenance</p>
              </div>
            </div>
          </div>
  
          <div className="w-full sm:w-1/2 md:w-1/4 px-1 mb-1">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="p-1">
                <h3 className="text-xs font-semibold mb-1">Platinum - 4yrs Warranty</h3>
                <h4 className="text-xs font-semibold mb-1">₹45,500</h4>
                <p className="text-gray-600 mb-1 text-xxs">3 free maintenance</p>
              </div>
            </div>
          </div>
  
          <div className="w-full sm:w-1/2 md:w-1/4 px-1 mb-1">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="p-1">
                <h3 className="text-xs font-semibold mb-1">Diamond - 5yrs Warranty</h3>
                <h4 className="text-xs font-semibold mb-1">₹54,500</h4>
                <p className="text-gray-600 mb-1 text-xxs">4 free maintenance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  
    <h2 className="text-sm font-bold text-center text-gray-900 mb-2">Other Coating</h2>
  
    <section className="py-4">
      <div className="container mx-auto px-1 max-w-screen-lg">
        <div className="flex flex-wrap justify-center -mx-1">
          <div className="w-full sm:w-1/2 md:w-1/4 px-1 mb-1">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="p-1">
                <h3 className="text-xs font-semibold mb-1">Ceramic Coating</h3>
                <h4 className="text-xs font-semibold mb-1">₹10,000</h4>
                <p className="text-gray-600 mb-1 text-xxs">1 year Warranty</p>
              </div>
            </div>
          </div>
  
          <div className="w-full sm:w-1/2 md:w-1/4 px-1 mb-1">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="p-1">
                <h3 className="text-xs font-semibold mb-1">Sealant Coating</h3>
                <h4 className="text-xs font-semibold mb-1">₹6,000</h4>
                <p className="text-gray-600 mb-1 text-xxs">No Warranty</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  
    <section className="py-3 bg-gray-100">
      <div className="container mx-auto px-1">
        <div className="bg-white p-2 rounded-lg shadow-md">
          <p className="text-gray-800 text-xs md:text-xs font-medium leading-relaxed">
            All packages include coating on painted surfaces, exterior plastics, all glass areas, and alloy wheels. Coating for interior plastics and upholstery is available at an additional cost. Cleaning charges may apply.
          </p>
        </div>
      </div>
    </section>
  
    <section className="py-3">
      <div className="container mx-auto px-1">
        <div className="flex justify-between items-center mb-1">
          <div className="w-full md:w-1/2 pr-1">
            <h4 className="text-sm font-bold text-gray-900">Paint Protection Film (PPF)</h4>
            <div className="bg-white p-2 shadow-md rounded-lg mt-1">
              <h6 className="text-xs font-semibold text-gray-800">High Quality PPF Installation For Your Cars</h6>
            </div>
          </div>
  
          <div className="w-full md:w-1/2 pl-1">
            <h4 className="text-sm font-bold text-gray-900">Windshield Protection Film</h4>
            <div className="bg-white p-2 shadow-md rounded-lg mt-1">
              <h6 className="text-xs font-semibold text-gray-800">High Quality Windshield Protection Film</h6>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  

  );
};

export default Card;
