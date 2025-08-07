import React, { useState } from 'react';
import { createClub } from '../api';

const getBasePrice = (seats: number): number => {
  if (seats >= 8 && seats <= 11) return 2000;
  if (seats >= 12 && seats <= 15) return 2400;
  return 2700;
};

const ClubForm: React.FC = () => {
  const [name, setName] = useState('');
  const [seats, setSeats] = useState(8);
  const [leaderContribution, setLeaderContribution] = useState(0);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const club = await createClub(name, seats, leaderContribution);
      // club.createClub contains the created club data
      // @ts-ignore
      setMessage(`Created club ${club.createClub.name} with member fee $${club.createClub.memberFee.toFixed(2)}`);
      setName('');
      setLeaderContribution(0);
      setSeats(8);
    } catch (err: any) {
      setMessage(err.message || 'An error occurred');
    }
  };

  const basePrice = getBasePrice(seats);
  const maxContribution = basePrice;

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Create a Study Club</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Club name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Seats: {seats}</label>
          <input
            type="range"
            min={8}
            max={18}
            value={seats}
            onChange={(e) => setSeats(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Leader contribution: ${leaderContribution} / ${basePrice}</label>
          <input
            type="range"
            min={0}
            max={maxContribution}
            value={leaderContribution}
            onChange={(e) => setLeaderContribution(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create Club</button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default ClubForm;
