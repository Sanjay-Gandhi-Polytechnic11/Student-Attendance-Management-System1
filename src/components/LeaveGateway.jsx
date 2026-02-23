import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ClipboardList,
    Calendar,
    Clock,
    ShieldCheck,
    FileText,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Send,
    ChevronRight,
    Search,
    User,
    ArrowRight,
    Activity
} from 'lucide-react';

const LeaveGateway = ({ user }) => {
    const isApprover = user?.role === 'HOD' || user?.role === 'ADMIN';
    const [activeTab, setActiveTab] = useState('Overview');

    // Sample Data
    const [applications, setApplications] = useState([
        { id: 'LR-1003', applicant: 'Prof. Bob Smith', type: 'Casual Leave', duration: '1 Day', status: 'Approved', date: 'Feb 15, 2024', reason: 'Family engagement in hometown.' },
        { id: 'LR-1002', applicant: 'Prof. Elena Miller', type: 'Sabbatical', duration: '5 Days', status: 'Rejected', date: 'Feb 10, 2024', reason: 'Internal workshop participation.' },
    ]);

    const [formDate, setFormDate] = useState('');
    const [formType, setFormType] = useState('Casual Leave');
    const [formReason, setFormReason] = useState('');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const handleApply = (e) => {
        e.preventDefault();
        const newApp = {
            id: `LR-${Math.floor(1000 + Math.random() * 9000)}`,
            applicant: user?.username || 'Current User',
            type: formType,
            duration: 'Selected Range',
            status: 'Pending',
            date: new Date().toLocaleDateString(),
            reason: formReason
        };
        setApplications([newApp, ...applications]);
        alert('Sent Successful');
        setActiveTab('Overview');
        setFormReason('');
    };

    const handleAction = (id, newStatus) => {
        setApplications(applications.map(app =>
            app.id === id ? { ...app, status: newStatus } : app
        ));
    };

    return (
        <motion.div
            className="space-y-8 pb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* 1. HEADER */}
            <motion.div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2" variants={itemVariants}>
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
                        <ClipboardList className="text-indigo-500" size={36} />
                        Leave <span className="text-indigo-500 italic">Gateway</span>
                    </h1>
                    <p className="text-slate-400 font-medium text-sm mt-2 flex items-center gap-2">
                        <ShieldCheck size={14} className="text-indigo-400" />
                        Institutional absence management and protocol authorization.
                    </p>
                </div>

                <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
                    {['Overview', 'Apply', 'Archive'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </motion.div>

            <AnimatePresence mode="wait">
                {activeTab === 'Overview' && (
                    <motion.div
                        key="overview"
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                    >
                        {/* 2.1 PENDING REQUESTS / HISTORY */}
                        <div className="lg:col-span-2 space-y-6">
                            <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] px-2">Active Protocol Queue</h3>

                            {applications.filter(app => app.status === 'Pending').length > 0 ? (
                                applications.filter(app => app.status === 'Pending').map((app) => (
                                    <motion.div
                                        key={app.id}
                                        className="glass-panel p-6 group hover:bg-white/[0.04] transition-all"
                                        variants={itemVariants}
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div className="flex items-center gap-5">
                                                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                                                    <FileText size={20} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{app.id}</span>
                                                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-tighter bg-amber-500/20 text-amber-400`}>
                                                            {app.status}
                                                        </span>
                                                    </div>
                                                    <h4 className="text-white font-bold tracking-tight mt-1">{isApprover ? app.applicant : app.type}</h4>
                                                    <p className="text-[11px] text-slate-400 font-medium flex items-center gap-2 mt-1">
                                                        <Calendar size={12} /> {app.date} • <Clock size={12} /> {app.duration}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                {isApprover ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleAction(app.id, 'Approved')}
                                                            className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase rounded-xl hover:bg-emerald-500/20 transition-all font-sans"
                                                        >
                                                            Authorize
                                                        </button>
                                                        <button
                                                            onClick={() => handleAction(app.id, 'Rejected')}
                                                            className="px-4 py-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-black uppercase rounded-xl hover:bg-rose-500/20 transition-all font-sans"
                                                        >
                                                            Decline
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button className="text-slate-500 hover:text-white transition-colors">
                                                        <ChevronRight size={20} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-white/5 opacity-60">
                                            <p className="text-[11px] text-slate-400 italic">" {app.reason} "</p>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="glass-panel p-12 flex flex-col items-center justify-center text-center">
                                    <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-slate-500 mb-6 border border-white/5">
                                        <ShieldCheck size={32} />
                                    </div>
                                    <h4 className="text-white font-black uppercase tracking-widest text-xs">All Clear</h4>
                                    <p className="text-slate-500 text-[10px] font-medium mt-2 max-w-[240px]">The protocol queue is currently empty. Institutional equilibrium maintained.</p>
                                </div>
                            )}
                        </div>

                        {/* 2.2 SUMMARY SIDEBAR */}
                        <div className="space-y-6">
                            <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] px-2">Cycle Intelligence</h3>
                            <div className="glass-panel p-8 space-y-8">
                                <LeaveMetric label="Available Credits" value="12" sub="Institutional allocation" />
                                <LeaveMetric label="Pending Review" value={applications.filter(a => a.status === 'Pending').length} sub="Protocols in queue" />
                                <LeaveMetric label="Cycle Utilization" value="25%" sub="Jan - June 2024" />

                                <button
                                    onClick={() => setActiveTab('Apply')}
                                    className="w-full btn-primary h-14 justify-center gap-3 shadow-xl shadow-indigo-600/20"
                                >
                                    <Send size={18} />
                                    <span className="font-black uppercase tracking-widest text-[11px]">Initiate New Protocol</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'Archive' && (
                    <motion.div
                        key="archive"
                        className="space-y-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                    >
                        <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] px-2 text-center">Protocol History Archive</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {applications.filter(app => app.status !== 'Pending').map((app) => (
                                <motion.div
                                    key={app.id}
                                    className="glass-panel p-6 border-white/5 hover:border-white/10 transition-all"
                                    variants={itemVariants}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${app.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                                {app.status === 'Approved' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{app.id}</p>
                                                <h5 className="text-white text-xs font-bold leading-none mt-1">{isApprover ? app.applicant : app.type}</h5>
                                            </div>
                                        </div>
                                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${app.status === 'Approved' ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'}`}>
                                            {app.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-[9px] text-slate-500 font-bold uppercase tracking-widest">
                                        <span className="flex items-center gap-1"><Calendar size={12} /> {app.date}</span>
                                        <span className="flex items-center gap-1"><Clock size={12} /> {app.duration}</span>
                                    </div>
                                    <p className="mt-4 text-[10px] text-slate-400 italic border-l-2 border-white/10 pl-3">"{app.reason}"</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'Apply' && (
                    <motion.div
                        key="apply"
                        className="max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <div className="glass-panel p-10">
                            <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3">
                                <ArrowRight className="text-indigo-500" />
                                Leave Application Protocol
                            </h3>

                            <form onSubmit={handleApply} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Protocol Type</label>
                                        <select
                                            value={formType}
                                            onChange={(e) => setFormType(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold text-white focus:border-indigo-500 transition-all outline-none"
                                        >
                                            <option value="Casual Leave">Casual Leave</option>
                                            <option value="Medical Leave">Medical Leave</option>
                                            <option value="Sabbatical">Sabbatical</option>
                                            <option value="Earned Leave">Earned Leave</option>
                                        </select>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Commencement Date</label>
                                        <input
                                            type="date"
                                            value={formDate}
                                            onChange={(e) => setFormDate(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold text-white focus:border-indigo-500 transition-all outline-none color-scheme-dark"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Rationalization / Reason</label>
                                    <textarea
                                        rows="4"
                                        value={formReason}
                                        onChange={(e) => setFormReason(e.target.value)}
                                        placeholder="Explicate the institutional necessity for this absence..."
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold text-white focus:border-indigo-500 transition-all outline-none resize-none"
                                        required
                                    />
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl">
                                    <AlertCircle size={18} className="text-indigo-400 shrink-0" />
                                    <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
                                        By submitting this protocol, you acknowledge institutional guidelines for absence and affirm the veracity of provided justification.
                                    </p>
                                </div>

                                <button type="submit" className="btn-primary w-full h-14 justify-center text-sm">
                                    Authorize & Transmit Request <Send size={18} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const LeaveMetric = ({ label, value, sub }) => (
    <div>
        <div className="flex items-end justify-between mb-2">
            <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
                <p className="text-3xl font-black text-white mt-1">{value}</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <Activity size={14} />
            </div>
        </div>
        <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{sub}</p>
        <div className="w-full bg-white/5 h-1 rounded-full mt-4 overflow-hidden">
            <div className="bg-indigo-500 h-full w-[60%]"></div>
        </div>
    </div>
);

export default LeaveGateway;
