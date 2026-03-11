import React, { useState } from 'react';
import { scheduleVisit } from '../services/api';

const VisitModal = ({ leadId, agentId, onClose, onSchedule }) => {
    const [property, setProperty] = useState('');
    const [visitDateTime, setVisitDateTime] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await scheduleVisit({ leadId, agentId, property, visitDateTime });
            onSchedule();
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Schedule Visit</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Property Name"
                        value={property}
                        onChange={(e) => setProperty(e.target.value)}
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        type="datetime-local"
                        value={visitDateTime}
                        onChange={(e) => setVisitDateTime(e.target.value)}
                        className="border p-2 rounded"
                        required
                    />
                    <div className="flex gap-2 justify-end mt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded text-sm">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded text-sm">Schedule</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VisitModal;