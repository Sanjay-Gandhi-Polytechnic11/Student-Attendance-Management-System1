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
                    <h2 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
                        <User className="text-indigo-500" size={32} />
                        Personal <span className="text-indigo-500 italic">Identity</span>
                    </h2>
                    <div className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
                            <ShieldCheck size={12} className="text-emerald-400" />
                            Verified Clearance
                        </span>
                        <p className="text-[11px] font-medium text-slate-400">View and manage your institutional profile.</p>
                    </div>
                </div>
            </motion.div>

            {/* Profile Overview */}
            <motion.div className="glass-panel p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-10" variants={itemVariants}>
                <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
                    <Cpu size={240} className="text-indigo-500" />
                </div>

                <div className="relative">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] bg-gradient-to-br from-indigo-500/20 to-purple-500/10 border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-md z-10">
                        <span className="text-5xl md:text-6xl font-black text-indigo-400 tracking-tighter">
                            {getInitials(user?.email || 'NA')}
                        </span>
                    </div>
                    <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-emerald-500/20 border border-emerald-500/40 rounded-xl flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)] z-20">
                        <Activity size={20} className="animate-pulse" />
                    </div>
                </div>

                <div className="flex-1 space-y-4 text-center md:text-left z-10">
                    <div>
                        <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">{user?.email || 'N/A'}</h3>
                        <p className="text-sm font-bold text-indigo-400 mt-1 uppercase tracking-[0.2em]">{user?.role || 'User'}</p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-8">
                        <div className="flex items-center gap-2 bg-white/5 border border-white/5 px-4 py-2 rounded-xl">
                            <Briefcase size={14} className="text-slate-400" />
                            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Active Duty</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 border border-white/5 px-4 py-2 rounded-xl">
                            <Calendar size={14} className="text-slate-400" />
                            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Joined 2024</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Information Details */}
                <motion.div className="glass-panel p-8" variants={itemVariants}>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-500/20">
                            <Shield size={22} />
                        </div>
                        <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Clearance Info</h3>
                    </div>

                    <div className="space-y-6">
                        <InfoRow icon={<Mail size={16} />} label="Registered Email" value={user?.email || 'Not Available'} />
                        <InfoRow icon={<Shield size={16} />} label="Access Level" value={user?.role || 'Standard'} />
                        <InfoRow icon={<User size={16} />} label="Internal ID" value={user?.id || 'Unknown'} />
                    </div>
                </motion.div>

                {/* Account Actions */}
                <motion.div className="glass-panel p-8 border-rose-500/20" variants={itemVariants}>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-400 border border-rose-500/20">
                            <Trash2 size={22} />
                        </div>
                        <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Account Actions</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/10">
                            <p className="text-[11px] font-bold text-rose-400 uppercase tracking-widest leading-relaxed">
                                Irreversible Deletion
                            </p>
                            <p className="text-[10px] text-slate-400 mt-2 font-medium leading-relaxed">
                                Deleting your account will scrub your identity from the institutional database. This action cannot be reversed, and all associated access logs will be purged.
                            </p>
                            <button
                                onClick={onDeleteAccount}
                                className="w-full mt-6 py-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-black uppercase rounded-xl hover:bg-rose-500 hover:text-white transition-all tracking-widest flex items-center justify-center gap-2"
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
