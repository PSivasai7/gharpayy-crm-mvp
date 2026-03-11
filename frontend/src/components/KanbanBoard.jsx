import React, { useState } from 'react';
import { updateLeadStage, updateVisitOutcome } from '../services/api';
import VisitModal from './VisitModal';
import TimelineModal from './TimelineModal';

const STAGES = [
    'New Lead', 'Contacted', 'Requirement Collected',
    'Property Suggested', 'Visit Scheduled', 'Visit Completed',
    'Booked', 'Lost'
];

const OUTCOMES = ['Pending', 'Completed - Booked', 'Completed - Not Interested', 'No Show', 'Rescheduled'];

const KanbanBoard = ({ leads, visits = [], refreshData }) => {
    const [activeSchedule, setActiveSchedule] = useState(null);
    const [activeTimeline, setActiveTimeline] = useState(null);

    const handleStageChange = async (leadId, newStage) => {
        try {
            await updateLeadStage(leadId, newStage, leads.find(l => l._id === leadId).assignedAgent._id);
            refreshData();
        } catch (error) {
            console.error(error);
        }
    };

    const handleOutcomeChange = async (visitId, newOutcome) => {
        try {
            await updateVisitOutcome(visitId, newOutcome);
            refreshData();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex gap-4 overflow-x-auto pb-6 pt-2 w-full h-full min-h-[65vh] snap-x">
            {STAGES.map(stage => (
                <div key={stage} className="min-w-[320px] bg-slate-100/70 border border-slate-200 p-3.5 rounded-xl flex flex-col shrink-0 snap-start">
                    <div className="flex justify-between items-center mb-4 px-1">
                        <div className="flex items-center gap-2.5">
                            <h3 className="font-bold text-slate-800 text-sm tracking-wide">{stage}</h3>
                            <span className="bg-white border border-slate-200 text-slate-600 text-xs py-0.5 px-2.5 rounded-full font-bold shadow-sm">
                                {leads.filter(lead => lead.status === stage).length}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3.5 flex-grow overflow-y-auto pr-1">
                        {leads.filter(lead => lead.status === stage).map(lead => {
                            const leadVisit = visits.find(v => (v.leadId?._id || v.leadId) === lead._id);

                            return (
                                <div
                                    key={lead._id}
                                    className={`bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-slate-200 flex flex-col gap-3 ${lead.inactiveReminderSent ? 'ring-2 ring-rose-400 ring-offset-2' : ''}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-extrabold text-slate-900 text-sm">{lead.name}</p>
                                            <p className="text-xs text-slate-500 font-semibold mt-0.5">{lead.phoneNumber}</p>
                                        </div>
                                        <span className="text-[9px] font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded-md uppercase tracking-widest border border-slate-200">
                                            {lead.leadSource === 'Website forms' ? 'Website' : lead.leadSource === 'Social media messages' ? 'Social' : lead.leadSource}
                                        </span>
                                    </div>

                                    <div className="flex gap-2 w-full">
                                        <a
                                            href={`https://wa.me/${lead.phoneNumber.replace(/\D/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex justify-center items-center gap-1.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#075E54] font-bold py-1.5 rounded-lg text-xs transition-colors border border-[#25D366]/20"
                                        >
                                            Chat
                                        </a>
                                        <button
                                            onClick={() => setActiveTimeline(lead)}
                                            className="flex-1 flex justify-center items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-1.5 rounded-lg text-xs transition-colors border border-slate-200"
                                        >
                                            History
                                        </button>
                                    </div>

                                    <div className="pt-2 border-t border-slate-100 w-full">
                                        <select
                                            className="w-full text-xs font-bold border border-slate-200 bg-slate-50/50 rounded-lg p-2 text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm"
                                            value={lead.status}
                                            onChange={(e) => handleStageChange(lead._id, e.target.value)}
                                        >
                                            {STAGES.map(s => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {leadVisit ? (
                                        <div className="mt-1 bg-indigo-50 border border-indigo-100 rounded-lg p-3">
                                            <p className="text-xs font-bold text-indigo-900 mb-1 flex items-center gap-1">
                                                Upcoming Visit
                                            </p>
                                            <p className="text-[11px] text-indigo-700 font-medium">📍 {leadVisit.property}</p>
                                            <p className="text-[11px] text-indigo-700 font-medium mb-2">⏰ {new Date(leadVisit.visitDateTime).toLocaleString()}</p>

                                            <select
                                                className="w-full text-[10px] font-bold border border-indigo-200 bg-white rounded p-1.5 text-indigo-800 outline-none cursor-pointer"
                                                value={leadVisit.outcome}
                                                onChange={(e) => handleOutcomeChange(leadVisit._id, e.target.value)}
                                            >
                                                {OUTCOMES.map(o => (
                                                    <option key={o} value={o}>{o}</option>
                                                ))}
                                            </select>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setActiveSchedule({ leadId: lead._id, agentId: lead.assignedAgent._id })}
                                            className="w-full bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold py-2 rounded-lg text-xs transition-all duration-200 flex justify-center items-center gap-1.5 border border-blue-100 shadow-sm"
                                        >
                                            Schedule Visit
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}

            {activeSchedule && (
                <VisitModal
                    leadId={activeSchedule.leadId}
                    agentId={activeSchedule.agentId}
                    onClose={() => setActiveSchedule(null)}
                    onSchedule={() => {
                        refreshData();
                        setActiveSchedule(null);
                    }}
                />
            )}

            {activeTimeline && (
                <TimelineModal
                    lead={activeTimeline}
                    onClose={() => setActiveTimeline(null)}
                />
            )}
        </div>
    );
};

export default KanbanBoard;