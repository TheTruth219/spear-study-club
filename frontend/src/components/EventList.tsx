import React, { useEffect, useState } from 'react';
import { listEvents, deleteEvent } from '../eventApi';

interface EventListProps {
  clubId?: string;
}

/**
 * Displays a list of events. When a clubId prop is supplied, only events
 * belonging to that club are fetched. Each event shows basic details and
 * includes a simple delete button for removing it.
 */
const EventList: React.FC<EventListProps> = ({ clubId }) => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await listEvents(clubId);
        setEvents(data.listEvents || []);
      } catch (err) {
        setError('Failed to fetch events');
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, [clubId]);

  const handleDelete = async (id: string) => {
    try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
    } catch (err) {
      alert('Failed to delete event.');
    }
  };

  if (loading) {
    return <p>Loading events...</p>;
  }
  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Upcoming Events</h2>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li
              key={event.id}
              className="border p-2 mb-2 rounded shadow-sm bg-white"
            >
              <div className="font-semibold">{event.name}</div>
              <div>
                Start: {new Date(event.startDate).toLocaleString()}
              </div>
              {event.endDate && (
                <div>End: {new Date(event.endDate).toLocaleString()}</div>
              )}
              {event.location && <div>Location: {event.location}</div>}
              {event.description && (
                <div>Description: {event.description}</div>
              )}
              <button
                className="mt-2 text-sm text-red-500 hover:underline"
                onClick={() => handleDelete(event.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;
