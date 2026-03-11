import React from 'react';

const TimelineModal = ({ lead, onClose }) => {
    if (!lead) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[85vh] border border-slate-200">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <div>
                        <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Activity Timeline</h2>
                        <p className="text-sm text-slate-500 mt-0.5 font-medium">{lead.name}</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors p-2 rounded-full hover:bg-slate-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <div className="p-8 overflow-y-auto bg-white">
                    <div className="relative border-l-2 border-slate-200 ml-3 space-y-8">
                        {lead.timeline && lead.timeline.map((event, index) => (
                            <div key={index} className="relative pl-6">
                                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white bg-blue-500 shadow-sm"></div>
                                <div className="flex flex-col bg-slate-50 p-3 rounded-lg border border-slate-100 shadow-sm">
                                    <span className="text-sm font-bold text-slate-800">{event.action}</span>
                                    <span className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wide">
                                        {new Date(event.timestamp).toLocaleString('en-US', {
                                            month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {(!lead.timeline || lead.timeline.length === 0) && (
                            <p className="text-sm text-slate-500 ml-4 font-medium">No activity recorded yet.</p>
                        )}
                    </div>
                </div>

                <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end">
                    <button onClick={onClose} className="px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-lg">
                        Close View
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimelineModal;