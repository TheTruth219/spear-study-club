import React, { useState } from 'react';

// Determine the base monthly price based on the number of seats.  In the prototype,
// seats between 8 and 11 cost $2,000/month, 12–15 cost $2,400/month and 16–18 cost $2,700/month.
const getBasePrice = (seats: number) => {
  if (seats >= 8 && seats <= 11) {
    return 2000;
  } else if (seats >= 12 && seats <= 15) {
    return 2400;
  } else {
    return 2700;
  }
};

const App: React.FC = () => {
  // Seat count state (8–18)
  const [seats, setSeats] = useState(8);
  const basePrice = getBasePrice(seats);
  // Leader contribution state (0–basePrice)
  const [contribution, setContribution] = useState(0);

  // Calculate the monthly fee per member
  const memberFee = (basePrice - contribution) / seats;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-start">
      <h1 className="text-3xl font-bold mb-6">Spear Study Club Pricing</h1>

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        {/* Seat selection slider */}
        <div className="mb-4">
          <label htmlFor="seats" className="block mb-2 font-semibold">
            Number of seats: {seats}
          </label>
          <input
            id="seats"
            type="range"
            min={8}
            max={18}
            value={seats}
            onChange={(e) => setSeats(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Leader contribution slider */}
        <div className="mb-4">
          <label htmlFor="contribution" className="block mb-2 font-semibold">
            Leader contribution: ${contribution.toFixed(0)} / ${basePrice}
          </label>
          <input
            id="contribution"
            type="range"
            min={0}
            max={basePrice}
            value={contribution}
            onChange={(e) => setContribution(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Computed member fee */}
        <div className="p-4 bg-blue-50 rounded">
          <p className="text-lg font-semibold">Monthly member fee:</p>
          <p className="text-2xl font-bold">${memberFee.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
