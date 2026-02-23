import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Search, Users, ShieldCheck, Filter } from 'lucide-react';

const MemberDirectory = ({ students, searchQuery }) => {
    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.roll.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <motion.div
            className="space-y-8 pb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header Section */}
            <motion.div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2" variants={itemVariants}>
                <div>
                    <h1 className="text-5xl font-black text-slate-800 tracking-tight flex items-center gap-4">
                        <Users className="text-indigo-600" size={40} />
                        Member <span className="text-indigo-600 italic">Registry</span>
                    </h1>
                    <p className="text-slate-400 font-medium text-base mt-2 flex items-center gap-2">
                        <ShieldCheck size={16} className="text-indigo-500" />
                        Formal record of all registered institutional personnel.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/5 flex items-center gap-3">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Total Identified</span>
                        <span className="text-sm font-black text-indigo-400 leading-none">{filteredStudents.length}</span>
                    </div>
                </div>
            </motion.div>

            {/* Registry Interface */}
            <motion.div className="glass-panel p-0 overflow-hidden" variants={itemVariants}>
                <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div className="flex items-center gap-4">
                        <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                        <h3 className="text-base font-black text-slate-800 uppercase tracking-[0.2em]">Validated Personnel Data</h3>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-all uppercase tracking-widest">
                        <Filter size={14} />
                        Filter Logic
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="px-8 py-6">Member Identification</th>
                                <th className="px-8 py-6 text-center">Protocol ID</th>
                                <th className="px-8 py-6 text-center">Unit / Sector</th>
                                <th className="px-8 py-6 text-center">Access Status</th>
                                <th className="px-8 py-6 text-right">Registry Depth</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((s, idx) => (
                                    <motion.tr
                                        key={s.id}
                                        className="hover:bg-white/[0.02] transition-colors group cursor-default"
                                        variants={itemVariants}
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-900 border border-white/5 flex items-center justify-center font-black text-indigo-400 group-hover:scale-110 transition-transform duration-500">
                                                    {s.name?.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-base font-black text-slate-800 tracking-tight">{s.name}</p>
                                                    <p className="text-[12px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Verified Personal</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 font-mono text-[13px] font-bold text-slate-400 text-center">{s.roll}</td>
                                        <td className="px-8 py-6 text-[13px] font-bold text-slate-500 text-center uppercase tracking-widest">{s.studentClass}</td>
                                        <td className="px-8 py-6 text-center">
                                            <div className="flex justify-center">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest border ${s.status === 'Present'
                                                    ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400'
                                                    : s.status === 'Absent'
                                                        ? 'bg-rose-500/5 border-rose-500/20 text-rose-400'
                                                        : 'bg-amber-500/5 border-amber-500/20 text-amber-400'
                                                    }`}>
                                                    <span className={`w-1 h-1 rounded-full ${s.status === 'Present' ? 'bg-emerald-400' : s.status === 'Absent' ? 'bg-rose-400' : 'bg-amber-400'
                                                        }`}></span>
                                                    {s.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="inline-flex items-center gap-2 text-[12px] font-black text-indigo-500 opacity-0 group-hover:opacity-100 transition-all hover:text-white uppercase tracking-widest">
                                                Registry Detailed <ArrowUpRight size={14} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <Users size={48} className="text-slate-800" />
                                            <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-xs">No personnel matched query</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default MemberDirectory;
