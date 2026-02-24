import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Check,
    X,
    Clock,
    Search,
    Filter,
    MoreVertical,
    ShieldCheck,
    CheckCircle2,
    Fingerprint,
    Database,
    Zap,
    Cpu,
    GitBranch,
    Calendar,
    Edit,
    Mail
} from 'lucide-react';

const AttendancePanel = ({ students, onStatusChange, onUpdateStudent, onSendIndividualSMS }) => {
    const [filter, setFilter] = useState('All');
    const [localSearch, setLocalSearch] = useState('');
    const [editingStudent, setEditingStudent] = useState(null);
    const [editFormData, setEditFormData] = useState({ name: '', roll: '', studentClass: '', status: 'Present', parentPhoneNumber: '' });

    const filteredStudents = students.filter(student => {
        const matchesStatus = filter === 'All' || student.status === filter;
        const matchesSearch = student.name.toLowerCase().includes(localSearch.toLowerCase()) ||
            student.roll.toLowerCase().includes(localSearch.toLowerCase());
        return matchesStatus && matchesSearch;
    });

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
            className="space-y-10 pb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header / Controls */}
            <motion.div
                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 px-2"
                variants={itemVariants}
            >
                <div>
                    <h1 className="text-5xl font-black text-slate-800 tracking-tight flex items-center gap-4">
                        <Fingerprint className="text-indigo-600" size={40} />
                        Attendance <span className="text-indigo-600 italic">Logging</span>
                    </h1>
                    <p className="text-slate-400 font-medium text-base mt-2 flex items-center gap-2">
                        <ShieldCheck size={16} className="text-indigo-400" />
                        High-availability verification node for Polytechnic Central.
                    </p>
                </div>

                <div className="flex gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-indigo-400 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Identify subject..."
                            className="bg-white/5 border border-white/5 rounded-2xl py-3 pl-12 pr-6 text-sm font-bold w-48 focus:border-indigo-500/30 transition-all outline-none text-white uppercase tracking-widest placeholder:text-slate-600"
                            value={localSearch}
                            onChange={(e) => setLocalSearch(e.target.value)}
                        />
                    </div>
                </div>
            </motion.div>

            {/* NEW: Institutional Filtering parameters */}
            <motion.div className="glass-panel p-8 relative overflow-hidden group" variants={itemVariants}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                            <Cpu size={14} className="text-indigo-500" /> Department
                        </label>
                        <select className="w-full bg-white/5 border border-white/5 rounded-xl py-3 px-4 text-xs font-bold text-slate-300 outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer">
                            <option value="">Select Department</option>
                            <option>Computer Science</option>
                            <option>Electrical Eng</option>
                            <option>Mechanical Eng</option>
                            <option>Electronics</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                            <GitBranch size={14} className="text-indigo-500" /> Branch
                        </label>
                        <select className="w-full bg-white/5 border border-white/5 rounded-xl py-3 px-4 text-xs font-bold text-slate-300 outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer">
                            <option value="">Select Branch</option>
                            <option>CSE</option>
                            <option>ECE</option>
                            <option>EEE</option>
                            <option>ME</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                            <Calendar size={14} className="text-indigo-500" /> Semester
                        </label>
                        <select className="w-full bg-white/5 border border-white/5 rounded-xl py-3 px-4 text-xs font-bold text-slate-300 outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer">
                            <option value="">Select Semester</option>
                            <option>Semester I</option>
                            <option>Semester II</option>
                            <option>Semester III</option>
                            <option>Semester IV</option>
                            <option>Semester V</option>
                            <option>Semester VI</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                            <Database size={14} className="text-indigo-500" /> Subject
                        </label>
                        <select className="w-full bg-white/5 border border-white/5 rounded-xl py-3 px-4 text-xs font-bold text-slate-300 outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer">
                            <option value="">Select Subject</option>
                            <option>Data Structures</option>
                            <option>Microprocessors</option>
                            <option>Thermal Eng</option>
                            <option>Digital Logic</option>
                        </select>
                    </div>
                </div>
            </motion.div>

            {/* Core Interaction Matrix */}
            <motion.div className="glass-panel p-0 overflow-hidden shadow-2xl" variants={itemVariants}>
                <div className="p-6 border-b border-slate-100 flex gap-4 bg-slate-50/50">
                    {['All', 'Present', 'Absent', 'Late'].map((item) => (
                        <button
                            key={item}
                            onClick={() => setFilter(item)}
                            className={`px-8 py-2.5 rounded-xl text-[12px] uppercase font-black tracking-[0.2em] transition-all border ${filter === item
                                ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-600/30'
                                : 'bg-white border-slate-100 text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
                                }`}
                        >
                            {item} Status
                        </button>
                    ))}
                </div>

                <div className="divide-y divide-white/[0.03]">
                    <AnimatePresence mode="popLayout">
                        {filteredStudents.length > 0 ? filteredStudents.map((student) => (
                            <motion.div
                                key={student.id}
                                className="p-6 flex items-center justify-between hover:bg-white/[0.01] transition-all group"
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-900 border border-white/5 flex items-center justify-center font-black text-indigo-400 group-hover:scale-110 transition-all duration-500 group-hover:border-indigo-500/30">
                                        {student.name?.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4">
                                            <h5 className="text-lg font-black text-slate-800 tracking-tight leading-none">{student.name}</h5>
                                            <span className="bg-indigo-500/5 text-indigo-500 border border-indigo-500/10 px-2 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-widest">
                                                {student.roll}
                                            </span>
                                            <button
                                                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all border border-transparent hover:border-indigo-100"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setEditingStudent(student);
                                                    setEditFormData({
                                                        name: student.name,
                                                        roll: student.roll,
                                                        studentClass: student.studentClass || 'CSE-A',
                                                        status: student.status || 'Present',
                                                        parentPhoneNumber: student.parentPhoneNumber || ''
                                                    });
                                                }}
                                                title="Edit Registry"
                                            >
                                                <Edit size={16} />
                                            </button>
                                        </div>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
                                            <ShieldCheck size={12} className="text-indigo-400" />
                                            Verified Registry Personnel
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <StatusButton
                                        active={student.status === 'Present'}
                                        label="Present"
                                        color="emerald"
                                        icon={<CheckCircle2 size={14} />}
                                        onClick={() => onStatusChange(student.id, 'Present')}
                                    />
                                    <StatusButton
                                        active={student.status === 'Late'}
                                        label="Sync Delayed"
                                        color="amber"
                                        icon={<Clock size={14} />}
                                        onClick={() => onStatusChange(student.id, 'Late')}
                                    />
                                    <StatusButton
                                        active={student.status === 'Absent'}
                                        label="Absent"
                                        color="rose"
                                        icon={<X size={14} />}
                                        onClick={() => onStatusChange(student.id, 'Absent')}
                                    />
                                    <button
                                        onClick={() => {
                                            if (window.confirm(`Send status SMS for ${student.name}?`)) {
                                                if (onSendIndividualSMS) {
                                                    onSendIndividualSMS(student);
                                                } else {
                                                    alert(`SMS protocol initiated for ${student.name}: Status ${student.status}`);
                                                }
                                            }
                                        }}
                                        className="p-3 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl hover:bg-indigo-600 hover:text-white transition-all group shadow-sm shadow-indigo-500/10"
                                        title="Send Status SMS"
                                    >
                                        <Mail size={16} className="group-hover:scale-110 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        )) : (
                            <motion.div
                                className="p-24 text-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <Zap size={48} className="mx-auto text-slate-800 mb-4" />
                                <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-xs">Zero results detected in selection matrix</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="p-8 bg-indigo-500/[0.02] border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 border border-indigo-100 shadow-inner">
                            <ShieldCheck size={28} />
                        </div>
                        <div>
                            <p className="text-[15px] font-black text-slate-800 tracking-tight uppercase tracking-widest">Biometric Data Hardened</p>
                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.15em] mt-1 italic">Protocol 92.4 active • Atomic timestamping enabled</p>
                        </div>
                    </div>
                    <button className="btn-primary h-14 px-16 group gap-4 relative overflow-hidden group">
                        <span className="relative z-10 font-black uppercase tracking-widest text-[13px]">Finalize Registry Log</span>
                        <Check size={20} className="relative z-10 group-hover:scale-125 transition-transform" />
                    </button>
                </div>
            </motion.div>

            {/* Edit Student Modal */}
            <AnimatePresence>
                {editingStudent && (
                    <motion.div
                        key="modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl"
                    >
                        <motion.div
                            key="modal-content"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-[#0f172a] border border-white/10 rounded-[32px] p-10 max-w-md w-full shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                                <Fingerprint size={120} />
                            </div>

                            <h2 className="text-3xl font-black text-white tracking-tight mb-2">Edit <span className="text-indigo-500 italic">Registry</span></h2>
                            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-10">Updating personnel ID: {editingStudent.id}</p>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2 col-span-2">
                                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Full Identification</label>
                                    <input
                                        type="text"
                                        value={editFormData.name}
                                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white font-bold outline-none focus:border-indigo-500 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Protocol / Roll ID</label>
                                    <input
                                        type="text"
                                        value={editFormData.roll}
                                        onChange={(e) => setEditFormData({ ...editFormData, roll: e.target.value })}
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white font-mono font-bold outline-none focus:border-indigo-500 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Sector</label>
                                    <select
                                        value={editFormData.studentClass}
                                        onChange={(e) => setEditFormData({ ...editFormData, studentClass: e.target.value })}
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white font-bold outline-none focus:border-indigo-500 transition-all appearance-none"
                                    >
                                        <option value="CSE-A">CSE-A</option>
                                        <option value="CSE-B">CSE-B</option>
                                        <option value="ECE-A">ECE-A</option>
                                        <option value="ECE-B">ECE-B</option>
                                    </select>
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Operational Status</label>
                                    <select
                                        value={editFormData.status}
                                        onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white font-bold outline-none focus:border-indigo-500 transition-all appearance-none"
                                    >
                                        <option value="Present">Present</option>
                                        <option value="Absent">Absent</option>
                                        <option value="Late">Late</option>
                                    </select>
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Parent Contact Node (SMS)</label>
                                    <input
                                        type="text"
                                        placeholder="+1 234 567 890"
                                        value={editFormData.parentPhoneNumber}
                                        onChange={(e) => setEditFormData({ ...editFormData, parentPhoneNumber: e.target.value })}
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white font-mono font-bold outline-none focus:border-indigo-500 transition-all font-sans"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 mt-12">
                                <button
                                    onClick={() => setEditingStudent(null)}
                                    className="flex-1 py-4 rounded-2xl bg-white/5 text-slate-400 font-black uppercase tracking-widest text-[12px] hover:bg-white/10 transition-all"
                                >
                                    Abort
                                </button>
                                <button
                                    onClick={() => {
                                        onUpdateStudent(editingStudent.id, {
                                            name: editFormData.name,
                                            roll: editFormData.roll,
                                            studentClass: editFormData.studentClass,
                                            status: editFormData.status,
                                            parentPhoneNumber: editFormData.parentPhoneNumber
                                        });
                                        setEditingStudent(null);
                                    }}
                                    className="flex-1 py-4 rounded-2xl bg-indigo-600 text-white font-black uppercase tracking-widest text-[12px] hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20"
                                >
                                    Commit
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const StatusButton = ({ active, label, color, icon, onClick }) => {
    const styles = {
        emerald: active
            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
            : 'hover:bg-emerald-500/5 hover:text-emerald-500/80',
        amber: active
            ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
            : 'hover:bg-amber-500/5 hover:text-amber-500/80',
        rose: active
            ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
            : 'hover:bg-rose-500/5 hover:text-rose-500/80'
    };

    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[12px] font-black uppercase tracking-widest border transition-all duration-300 ${active
                ? `${styles[color]} shadow-lg shadow-black/20`
                : `bg-transparent text-slate-600 border-white/5 ${styles[color]}`
                }`}
        >
            {icon}
            {label}
        </button>
    );
};

export default AttendancePanel;
