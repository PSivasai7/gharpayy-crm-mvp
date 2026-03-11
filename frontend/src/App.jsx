import React, { useState, useEffect } from 'react';
import { fetchDashboardStats, fetchAllLeads, fetchAllVisits } from './services/api';
import KanbanBoard from './components/KanbanBoard';
import ListView from './components/ListView';

function App() {
  const [stats, setStats] = useState({ totalLeads: 0, leadsByStage: [] });
  const [leads, setLeads] = useState([]);
  const [visits, setVisits] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('board');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const statsRes = await fetchDashboardStats();
      const leadsRes = await fetchAllLeads();
      const visitsRes = await fetchAllVisits();
      setStats(statsRes.data);
      setLeads(leadsRes.data);
      setVisits(visitsRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phoneNumber.includes(searchTerm)
  );

  const getLeaderboard = () => {
    const agentStats = {};
    leads.forEach(lead => {
      if (!lead.assignedAgent) return;
      const agentName = lead.assignedAgent.name;
      if (!agentStats[agentName]) agentStats[agentName] = { total: 0, booked: 0 };
      agentStats[agentName].total += 1;
      if (lead.status === 'Booked') agentStats[agentName].booked += 1;
    });
    return Object.entries(agentStats).sort((a, b) => b[1].booked - a[1].booked).slice(0, 3);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-inner">G</div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Gharpayy CRM</h1>
          </div>
          <div className="relative w-96 hidden md:block">
            <input
              type="text"
              placeholder="Search leads by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all text-sm outline-none shadow-sm"
            />
            <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 py-8 flex gap-6">

        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 border-l-4 border-l-slate-800">
              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Total Leads</h3>
              <p className="text-2xl font-extrabold text-slate-900">{stats.totalLeads}</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 border-l-4 border-l-blue-500">
              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Visits Scheduled</h3>
              <p className="text-2xl font-extrabold text-blue-600">
                {stats.leadsByStage.find(s => s._id === 'Visit Scheduled')?.count || 0}
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 border-l-4 border-l-emerald-500">
              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Bookings Confirmed</h3>
              <p className="text-2xl font-extrabold text-emerald-600">
                {stats.leadsByStage.find(s => s._id === 'Booked')?.count || 0}
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 border-l-4 border-l-rose-500">
              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Opportunities Lost</h3>
              <p className="text-2xl font-extrabold text-rose-600">
                {stats.leadsByStage.find(s => s._id === 'Lost')?.count || 0}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
              <h2 className="font-bold text-lg text-slate-800 tracking-tight">Lead Management</h2>
              <div className="flex bg-slate-200 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('board')}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${viewMode === 'board' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Board
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${viewMode === 'list' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  List
                </button>
              </div>
            </div>
            <div className="p-4 bg-slate-50">
              {viewMode === 'board' ? (
                <KanbanBoard leads={filteredLeads} visits={visits} refreshData={loadData} />
              ) : (
                <ListView leads={filteredLeads} refreshData={loadData} />
              )}
            </div>
          </div>
        </div>

        <div className="w-80 shrink-0 hidden lg:block space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <h3 className="font-extrabold text-slate-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              Top Agents
            </h3>
            <div className="space-y-4">
              {getLeaderboard().map(([name, data], index) => (
                <div key={name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{name}</p>
                      <p className="text-[10px] font-semibold text-slate-500 uppercase">{data.total} assigned</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-extrabold text-emerald-600">{data.booked}</p>
                    <p className="text-[10px] font-semibold text-slate-500 uppercase">Booked</p>
                  </div>
                </div>
              ))}
              {getLeaderboard().length === 0 && (
                <p className="text-sm text-slate-500 font-medium text-center py-4">No closed deals yet.</p>
              )}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;