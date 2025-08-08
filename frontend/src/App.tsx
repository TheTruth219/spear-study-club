import React, { useState } from 'react';
import ClubForm from './components/ClubForm';
import EventForm from './components/EventForm';
import ClubList from './components/ClubList';
import EventList from './components/EventList';

const App: React.FC = () => {
  const [seats, setSeats] = useState(8);
  const [leaderContribution, setLeaderContribution] = useState(0);

  const getBasePrice = (seats: number) => {
    if (seats <= 11) {
      return 2000;
    } else if (seats <= 15) {
      return 2400;
    } else {
      return 2700;
    }
  };

  const calculateMemberFee = () => {
    const basePrice = getBasePrice(seats);
    return ((basePrice - leaderContribution) / seats).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="max-w-3xl w-full mt-10 bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Spear Study Club Pricing</h1>
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Number of seats: {seats}
          </label>
          <input
            type="range"
            min={8}
            max={18}
            value={seats}
            onChange={(e) => setSeats(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Leader contribution: ${leaderContribution}
          </label>
          <input
            type="range"
            min={0}
            max={getBasePrice(seats)}
            step={100}
            value={leaderContribution}
            onChange={(e) => setLeaderContribution(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <p className="font-medium">
            Member fee: ${calculateMemberFee()} per month
          </p>
        </div>
        <div className="mt-8">
         <ClubForm />
        </div>
      <div className="mt-8">
          <EventForm />
        </div>
      <div className="mt-8">
          <ClubList />
        </div>
        <div className="mt-8">
          <EventList />
        </div>
      </div>
    </div>
  );
};

export default App;
