import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Calendar,
    BookOpen,
    CheckCircle,
    XCircle,
    Save,
    RefreshCw,
    Search,
    Filter,
    Download,
    Upload,
    Clock,
    AlertCircle,
    ChevronRight,
    ArrowRight,
    CheckCircle2,
    ShieldCheck,
    Cpu,
    GitBranch,
    Edit
} from 'lucide-react';

const StaffAttendanceEntry = ({ students: initialStudents = [], onStatusChange, onUpdateStudent, onSendIndividualSMS }) => {
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        subject: '',
        class: '',
        period: '',
        faculty: 'Prof. Shaik',
        semester: '',
        branch: '',
        department: ''
    });

    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [attendanceRecords, setAttendanceRecords] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [stats, setStats] = useState({ present: 0, absent: 0, total: 0 });

    const [editingStudent, setEditingStudent] = useState(null);
    const [editFormData, setEditFormData] = useState({ name: '', roll: '', studentClass: '', status: 'Present', parentPhoneNumber: '' });

    useEffect(() => {
        setStudents(initialStudents);
        setFilteredStudents(initialStudents);

        const initialRecords = {};
        initialStudents.forEach(student => {
            initialRecords[student.id] = {
                status: 'present',
                remarks: ''
            };
        });
        setAttendanceRecords(initialRecords);
    }, [initialStudents]);

    useEffect(() => {
        const filtered = students.filter(student =>
            student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (student.registerNumber || student.roll || '').toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredStudents(filtered);
    }, [searchQuery, students]);

    useEffect(() => {
        const present = Object.values(attendanceRecords).filter(r => r.status === 'present').length;
        const absent = Object.values(attendanceRecords).filter(r => r.status === 'absent').length;
        setStats({ present, absent, total: students.length });
    }, [attendanceRecords, students]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAttendanceChange = (studentId, status) => {
        setAttendanceRecords(prev => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                status: status
            }
        }));

        // Trigger global status change if prop is provided
        if (onStatusChange) {
            onStatusChange(studentId, status.charAt(0).toUpperCase() + status.slice(1));
        }

        if (status === 'present') {
            alert('The Student is Present');
        } else if (status === 'absent') {
            alert('The Student Is Absent');
        }
    };

    const markAllPresent = () => {
        const updatedRecords = {};
        students.forEach(student => {
            updatedRecords[student.id] = {
                status: 'present',
                remarks: attendanceRecords[student.id]?.remarks || ''
            };
        });
        setAttendanceRecords(updatedRecords);
    };

    const markAllAbsent = () => {
        const updatedRecords = {};
        students.forEach(student => {
            updatedRecords[student.id] = {
                status: 'absent',
                remarks: attendanceRecords[student.id]?.remarks || ''
            };
        });
        setAttendanceRecords(updatedRecords);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.subject || !formData.class || !formData.period) return;

        setIsSubmitting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert('Successfully Committed');
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 4000);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

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

    return (
        <motion.div
            className="space-y-8 pb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* 1. HERO HEADER SECTION */}
            <motion.div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2" variants={itemVariants}>
                <div>
                    <h1 className="text-5xl font-black text-slate-800 tracking-tight mb-2 flex items-center gap-3">
                        <Cpu className="text-indigo-600" size={40} />
                        Attendance <span className="text-indigo-600 italic">Ledger</span>
                    </h1>
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-2 text-[13px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
                            <Clock size={16} className="text-indigo-400" />
                            Session: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className="flex items-center gap-2 text-[13px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10">
                            <ShieldCheck size={16} />
                            Secured Protocol
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={markAllPresent}
                        className="btn-primary bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/20"
                    >
                        <CheckCircle2 size={16} /> Mark All Present
                    </button>
                    <button
                        onClick={markAllAbsent}
                        className="btn-primary bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/20"
                    >
                        <XCircle size={16} /> Mark All Absent
                    </button>
                </div>
            </motion.div>

            {/* 2. SUCCESS FEEDBACK */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="glass-panel border-emerald-500/20 bg-emerald-500/5 p-6 overflow-hidden"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                                <CheckCircle size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-800">Registry Synchronized</h3>
                                <p className="text-base text-slate-500 font-medium tracking-tight">System successfully committed {stats.total} student records to the central core.</p>
                            </div>
                            <button className="ml-auto p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-500">
                                <RefreshCw size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 3. CORE ANALYTICS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    label="Present Personnel"
                    value={stats.present}
                    total={stats.total}
                    icon={<CheckCircle2 />}
                    color="var(--success)"
                    variants={itemVariants}
                />
                <StatCard
                    label="Absent Personnel"
                    value={stats.absent}
                    total={stats.total}
                    icon={<XCircle />}
                    color="var(--accent)"
                    variants={itemVariants}
                />
                <StatCard
                    label="Total Enrollment"
                    value={stats.total}
                    icon={<Users />}
                    color="var(--primary)"
                    variants={itemVariants}
                    isTotal
                />
            </div>

            {/* 4. EXECUTION PARAMETERS (FORM) */}
            <motion.div className="glass-panel p-8 relative overflow-hidden group" variants={itemVariants}>

                <h2 className="text-base font-bold text-slate-800 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    Execution Parameters
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <InputField label="Ledger Date" icon={<Calendar size={16} />}>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="custom-input h-12"
                        />
                    </InputField>

                    <InputField label="Strategic Department" icon={<Cpu size={16} />}>
                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleInputChange}
                            className="custom-input h-12 font-bold appearance-none bg-black/40"
                        >
                            <option value="">Select Department</option>
                            <option value="Computer Science">Computer Science & Eng</option>
                            <option value="Electrical">Electrical & Electronics</option>
                            <option value="Electronics">Electronics & Comm</option>
                            <option value="Mechanical">Mechanical Eng</option>
                        </select>
                    </InputField>

                    <InputField label="Tactical Branch" icon={<GitBranch size={16} />}>
                        <select
                            name="branch"
                            value={formData.branch}
                            onChange={handleInputChange}
                            className="custom-input h-12 font-bold appearance-none bg-black/40"
                        >
                            <option value="">Select Branch</option>
                            <option value="CSE">CSE (Computer Science)</option>
                            <option value="AI">AI & ML</option>
                            <option value="ECE">ECE (Electronics)</option>
                            <option value="EEE">EEE (Electrical)</option>
                        </select>
                    </InputField>

                    <InputField label="Active Semester" icon={<Calendar size={16} />}>
                        <select
                            name="semester"
                            value={formData.semester}
                            onChange={handleInputChange}
                            className="custom-input h-12 font-bold appearance-none bg-black/40"
                        >
                            <option value="">Select Semester</option>
                            <option value="1">Semester I</option>
                            <option value="2">Semester II</option>
                            <option value="3">Semester III</option>
                            <option value="4">Semester IV</option>
                            <option value="5">Semester V</option>
                            <option value="6">Semester VI</option>
                        </select>
                    </InputField>

                    <InputField label="Strategic Subject" icon={<BookOpen size={16} />}>
                        <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="custom-input h-12 font-bold appearance-none bg-black/40"
                        >
                            <option value="">Select Subject</option>
                            <option value="Algorithms">Advanced Algorithms</option>
                            <option value="WebDev">Full Stack Web Dev</option>
                            <option value="Database">Database Management</option>
                            <option value="IoT">Internet of Things</option>
                        </select>
                    </InputField>

                    <InputField label="Class Division" icon={<Users size={16} />}>
                        <select
                            name="class"
                            value={formData.class}
                            onChange={handleInputChange}
                            className="custom-input h-12 font-bold appearance-none bg-black/40"
                        >
                            <option value="">Select Sector</option>
                            <option value="CSE-A">Sector CSE-A</option>
                            <option value="CSE-B">Sector CSE-B</option>
                            <option value="ECE-A">Sector ECE-A</option>
                        </select>
                    </InputField>

                    <InputField label="Execution Period" icon={<Clock size={16} />}>
                        <select
                            name="period"
                            value={formData.period}
                            onChange={handleInputChange}
                            className="custom-input h-12 font-bold appearance-none bg-black/40"
                        >
                            <option value="">Select Unit</option>
                            <option value="1">Period I (09:00)</option>
                            <option value="2">Period II (10:00)</option>
                            <option value="3">Period III (11:00)</option>
                            <option value="4">Period IV (12:00)</option>
                            <option value="5">Period V (01:00)</option>
                            <option value="6">Period VI (02:00)</option>
                            <option value="7">Period VII (03:00)</option>
                            <option value="8">Period VIII (04:00)</option>
                            <option value="9">Period IX (05:00)</option>
                        </select>
                    </InputField>
                </div>
            </motion.div>

            {/* 5. DATA TABLE INTERFACE */}
            <motion.div className="glass-panel p-0 overflow-hidden" variants={itemVariants}>
                <div className="p-8 flex items-center justify-between border-b border-slate-100">
                    <h2 className="text-base font-bold text-slate-800 uppercase tracking-[0.2em] flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        Member Registry
                    </h2>

                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search by name or ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-white/5 border border-white/5 rounded-xl py-2.5 pl-12 pr-4 text-sm w-64 focus:border-indigo-500/30 transition-all outline-none text-slate-300 font-bold"
                            />
                        </div>
                        <button className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 text-slate-400">
                            <Download size={18} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th className="w-16">#</th>
                                <th>Personnel Details</th>
                                <th className="text-center">Sector / Unit</th>
                                <th className="text-center">Status Control</th>
                                <th className="text-center">SMS Notification</th>
                                <th>Intelligence / Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((s, idx) => (
                                <motion.tr
                                    key={s.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.03 }}
                                >
                                    <td className="font-mono text-[10px] text-slate-600">{(idx + 1).toString().padStart(2, '0')}</td>
                                    <td>
                                        <div className="flex items-center gap-4">
                                            <div className="w-11 h-11 rounded-xl bg-indigo-500/10 flex items-center justify-center text-[12px] font-black text-indigo-400">
                                                {s.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-base font-black text-slate-800 tracking-tight">{s.name}</span>
                                                    <span className="bg-indigo-500/5 text-indigo-500 border border-indigo-500/10 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                                                        {s.registerNumber || s.roll}
                                                    </span>
                                                    <button
                                                        onClick={() => {
                                                            setEditingStudent(s);
                                                            setEditFormData({
                                                                name: s.name,
                                                                    roll: s.roll || s.registerNumber,
                                                                    studentClass: s.studentClass || s.class || 'CSE-A',
                                                                    status: s.status || 'Present',
                                                                    parentPhoneNumber: s.parentPhoneNumber || ''
                                                                });
                                                        }}
                                                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-all"
                                                        title="Edit Details"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                </div>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em] mt-1">Institutional Member</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <span className="bg-slate-50 text-slate-500 border border-slate-100 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-widest">
                                            Sector {s.studentClass || s.class || 'CSE-A'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-center gap-3">
                                            <button
                                                onClick={() => handleAttendanceChange(s.id, 'present')}
                                                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[12px] font-black uppercase tracking-wider transition-all
                                                    ${attendanceRecords[s.id]?.status === 'present'
                                                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                                        : 'bg-white/5 text-slate-500 border border-white/5 hover:bg-white/10'}`}
                                            >
                                                <CheckCircle size={16} /> Present
                                            </button>
                                            <button
                                                onClick={() => handleAttendanceChange(s.id, 'absent')}
                                                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[12px] font-black uppercase tracking-wider transition-all
                                                    ${attendanceRecords[s.id]?.status === 'absent'
                                                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                                        : 'bg-white/5 text-slate-500 border border-white/5 hover:bg-white/10'}`}
                                            >
                                                <XCircle size={16} /> Absent
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-center gap-3">
                                            <button
                                                onClick={() => {
                                                    const status = attendanceRecords[s.id]?.status === 'present' ? 'Present' : 'Absent';
                                                    if (window.confirm(`Send status SMS for ${s.name}?`)) {
                                                        if (onSendIndividualSMS) {
                                                            onSendIndividualSMS([{ ...s, status }]);
                                                        } else {
                                                            alert(`SMS protocol initiated for ${s.name}: Status ${status}`);
                                                        }
                                                    }
                                                }}
                                                className="p-2.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl hover:bg-indigo-500 hover:text-white transition-all group"
                                                title="Send Status SMS"
                                            >
                                                <Mail size={16} className="group-hover:scale-110 transition-transform" />
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="System notes..."
                                            className="bg-transparent border-b border-white/5 w-full py-1 text-sm text-slate-400 focus:border-indigo-500/50 outline-none font-medium"
                                        />
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* 6. GLOBAL COMMIT FOOTER */}
            <motion.div
                className="glass-panel p-6 flex flex-col sm:flex-row items-center justify-between gap-6"
                variants={itemVariants}
            >
                <div className="flex items-center gap-4 text-slate-500">
                    <ShieldCheck size={20} className="text-indigo-500" />
                    <div>
                        <p className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-400">Security Verification Required</p>
                        <p className="text-[13px] font-medium">Verify all {stats.total} entries before executing system commit.</p>
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`btn-primary px-10 h-14 text-white gap-4 group ${isSubmitting ? 'opacity-50' : ''}`}
                >
                    {isSubmitting ? (
                        <>
                            <RefreshCw className="animate-spin" size={20} />
                            Synchronizing...
                        </>
                    ) : (
                        <>
                            Commit To Registry <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </motion.div>

            {/* Edit Student Modal */}
            <AnimatePresence>
                {editingStudent && (
                    <motion.div
                        key="modal-backdrop-staff"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl"
                    >
                        <motion.div
                            key="modal-content-staff"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-[#0f172a] border border-white/10 rounded-[32px] p-10 max-w-md w-full shadow-2xl relative overflow-hidden text-left"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                                <Users size={120} />
                            </div>

                            <h2 className="text-3xl font-black text-white tracking-tight mb-2">Edit <span className="text-indigo-500 italic">Registry</span></h2>
                            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-10">Updating personnel ID: {editingStudent.id}</p>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Name of the Student</label>
                                    <input
                                        type="text"
                                        placeholder="Student Name"
                                        value={editFormData.name}
                                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white font-bold outline-none focus:border-indigo-500 transition-all font-sans"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Register Number</label>
                                    <input
                                        type="text"
                                        placeholder="Roll Number"
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
                                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Registry Status</label>
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
                                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Mobile Number</label>
                                    <input
                                        type="text"
                                        placeholder="+1 234 567 890"
                                        value={editFormData.parentPhoneNumber}
                                        onChange={(e) => setEditFormData({ ...editFormData, parentPhoneNumber: e.target.value })}
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white font-mono font-bold outline-none focus:border-indigo-500 transition-all"
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

const StatCard = ({ label, value, total, icon, color, variants, isTotal }) => (
    <motion.div
        className="premium-card group"
        variants={variants}
        whileHover={{ y: -5 }}
    >
        <div className="flex items-start justify-between">
            <div>
                <p className="text-slate-500 text-[12px] font-black uppercase tracking-[0.2em] mb-3">{label}</p>
                <div className="flex items-baseline gap-2">
                    <h3 className="text-4xl font-black text-slate-800">{value}</h3>
                    {!isTotal && <span className="text-slate-400 font-bold text-sm">/ {total}</span>}
                </div>
                {!isTotal && (
                    <div className="mt-4 flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${(value / total) * 100}%` }}
                                style={{ backgroundColor: color }}
                            />
                        </div>
                        <span className="text-[12px] font-mono font-bold text-slate-500">{((value / total) * 100).toFixed(0)}%</span>
                    </div>
                )}
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform duration-500" style={{ color: color + '40' }}>
                {React.cloneElement(icon, { size: 24, style: { color: color } })}
            </div>
        </div>
    </motion.div>
);

const InputField = ({ label, icon, children }) => (
    <div className="space-y-3">
        <label className="text-[13px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
            {icon}
            {label}
        </label>
        <div className="relative">
            {children}
        </div>
    </div>
);

export default StaffAttendanceEntry;

