import React, { useEffect, useState } from 'react';
import { listClubs } from '../api';

/**
 * Renders a list of existing clubs. Fetches clubs on mount and displays
 * basic details such as name, seat count and member fee. Shows loading
 * and error states appropriately.
 */
const ClubList: React.FC = () => {
  const [clubs, setClubs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClubs() {
      try {
        const data = await listClubs();
        // listClubs returns an object with listClubs property
        setClubs(data.listClubs || []);
      } catch (err) {
        setError('Failed to fetch clubs');
      } finally {
        setLoading(false);
      }
    }
    fetchClubs();
  }, []);

  if (loading) {
    return <p>Loading clubs...</p>;
  }
  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Existing Clubs</h2>
      {clubs.length === 0 ? (
        <p>No clubs found.</p>
      ) : (
        <ul>
          {clubs.map((club) => (
            <li
              key={club.id}
              className="border p-2 mb-2 rounded shadow-sm bg-white"
            >
              <div className="font-semibold">{club.name}</div>
              <div>Seats: {club.seats}</div>
              <div>Leader contribution: ${club.leaderContribution}</div>
              <div>Member fee: ${club.memberFee}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClubList;
