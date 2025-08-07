import React, { useState } from 'react';
import { createEvent } from '../eventApi';

const EventForm: React.FC = () => {
  const [clubId, setClubId] = useState('');
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [moduleId, setModuleId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEvent(clubId, name, startDate, endDate, location || undefined, description || undefined, moduleId || undefined);
      setMessage('Event created successfully!');
      setName('');
      setStartDate('');
      setEndDate('');
      setLocation('');
      setDescription('');
      setModuleId('');
    } catch (error: any) {
      setMessage(error.message || 'Error creating event');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      {message && <p className="mb-2 text-green-600">{message}</p>}
      <div className="mb-2">
        <label htmlFor="clubId" className="block mb-1 font-semibold">Club ID</label>
        <input id="clubId" type="text" value={clubId} onChange={(e) => setClubId(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      <div className="mb-2">
        <label htmlFor="name" className="block mb-1 font-semibold">Event Name</label>
        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      <div className="mb-2">
        <label htmlFor="startDate" className="block mb-1 font-semibold">Start Date</label>
        <input id="startDate" type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      <div className="mb-2">
        <label htmlFor="endDate" className="block mb-1 font-semibold">End Date</label>
        <input id="endDate" type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      <div className="mb-2">
        <label htmlFor="location" className="block mb-1 font-semibold">Location</label>
        <input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      <div className="mb-2">
        <label htmlFor="description" className="block mb-1 font-semibold">Description</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      <div className="mb-4">
        <label htmlFor="moduleId" className="block mb-1 font-semibold">Module ID</label>
        <input id="moduleId" type="text" value={moduleId} onChange={(e) => setModuleId(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">Create Event</button>
    </form>
  );
};

export default EventForm;
