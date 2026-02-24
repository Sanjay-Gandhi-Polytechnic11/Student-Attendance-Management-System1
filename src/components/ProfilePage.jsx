import React from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Mail,
    Shield,
    Briefcase,
    Calendar,
    Activity,
    LogOut,
    Trash2,
    ShieldCheck,
    Cpu
} from 'lucide-react';

const ProfilePage = ({ user, onDeleteAccount }) => {

    const getInitials = (email) => {
        if (!email) return 'ST';
        const parts = email.split('@')[0].split('.');
        if (parts.length >= 2) return (parts[0][0] + parts[1][parts[1].length - 1]).toUpperCase();
        return email.substring(0, 2).toUpperCase();
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
            className="max-w-4xl mx-auto space-y-10 pb-20 mt-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header */}
            <motion.div className="flex flex-col md:flex-row items-center justify-between gap-8 px-2" variants={itemVariants}>
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                        <User className="text-indigo-600" size={32} />
                        Personal <span className="text-indigo-600 italic">Identity</span>
                    </h2>
                    <div className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-2 text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                            <ShieldCheck size={12} className="text-emerald-500" />
                            Verified Clearance
                        </span>
                        <p className="text-[11px] font-medium text-slate-400">View and manage your institutional profile.</p>
                    </div>
                </div>
            </motion.div>

            {/* Profile Overview */}
            <motion.div className="bg-white border border-slate-100 rounded-[40px] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-10 shadow-sm" variants={itemVariants}>
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                    <Cpu size={240} className="text-slate-900" />
                </div>

                <div className="relative">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] bg-indigo-50 border border-indigo-100 flex items-center justify-center shadow-xl z-10">
                        <span className="text-5xl md:text-6xl font-black text-indigo-600 tracking-tighter">
                            {getInitials(user?.email || 'NA')}
                        </span>
                    </div>
                    <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center text-emerald-500 shadow-lg z-20">
                        <Activity size={20} className="animate-pulse" />
                    </div>
                </div>

                <div className="flex-1 space-y-4 text-center md:text-left z-10">
                    <div>
                        <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">{user?.email || 'N/A'}</h3>
                        <p className="text-sm font-bold text-indigo-600 mt-1 uppercase tracking-[0.2em]">{user?.role || 'User'}</p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-8">
                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl">
                            <Briefcase size={14} className="text-slate-400" />
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Active Duty</span>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl">
                            <Calendar size={14} className="text-slate-400" />
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Joined 2024</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Information Details */}
                <motion.div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm" variants={itemVariants}>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100">
                            <Shield size={22} />
                        </div>
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Clearance Info</h3>
                    </div>

                    <div className="space-y-6">
                        <InfoRow icon={<Mail size={16} />} label="Registered Email" value={user?.email || 'Not Available'} />
                        <InfoRow icon={<Shield size={16} />} label="Access Level" value={user?.role || 'Standard'} />
                        <InfoRow icon={<User size={16} />} label="Internal ID" value={user?.id || 'Unknown'} />
                    </div>
                </motion.div>

                {/* Account Actions */}
                <motion.div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm border-rose-100" variants={itemVariants}>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 border border-rose-100">
                            <Trash2 size={22} />
                        </div>
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Account Actions</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="p-5 rounded-2xl bg-rose-50 border border-rose-100">
                            <p className="text-[11px] font-black text-rose-600 uppercase tracking-widest leading-relaxed">
                                Irreversible Deletion
                            </p>
                            <p className="text-[10px] text-slate-500 mt-2 font-medium leading-relaxed">
                                Deleting your account will scrub your identity from the institutional database. This action cannot be reversed, and all associated access logs will be purged.
                            </p>
                            <button
                                onClick={onDeleteAccount}
                                className="w-full mt-6 py-3 bg-white border border-slate-200 text-slate-900 text-[10px] font-black uppercase rounded-xl hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all tracking-widest flex items-center justify-center gap-2"
                            >
                                <Trash2 size={14} /> Terminate Identity
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 border border-white/5">
            {icon}
        </div>
        <div className="flex-1">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</p>
            <p className="text-[13px] font-bold text-slate-200 mt-0.5 tracking-tight truncate">{value}</p>
        </div>
    </div>
);

export default ProfilePage;
