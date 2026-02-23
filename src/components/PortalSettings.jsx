import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Save,
    Bell,
    Moon,
    Shield,
    Database,
    Mail,
    Smartphone,
    Monitor,
    Globe,
    Clock,
    Calendar,
    Settings,
    Cpu,
    Lock,
    RefreshCw,
    ShieldCheck
} from 'lucide-react';

const PortalSettings = ({ onDeleteAccount, onSyncRegistry }) => {
    const [settings, setSettings] = useState({
        academicYear: '2023-2024',
        semester: 'Even',
        notifications: true,
        darkMode: true,
        autoBackup: false,
        emailAlerts: true,
        smsAlerts: false
    });

    const [isSaving, setIsSaving] = useState(false);

    const handleToggle = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            if (onSyncRegistry) {
                await onSyncRegistry();
                alert('Registry synchronized successfully!');
            }
        } catch (error) {
            console.error("Sync failed:", error);
            alert('Synchronization failed. Please check your connection.');
        } finally {
            setIsSaving(false);
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
            className="max-w-5xl mx-auto space-y-10 pb-20 mt-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* 1. HERO HEADER */}
            <motion.div className="flex flex-col md:flex-row items-center justify-between gap-8 px-2" variants={itemVariants}>
                <div>
                    <h2 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
                        <Cpu className="text-indigo-500" size={32} />
                        Portal <span className="text-indigo-500 italic">Core</span> Configuration
                    </h2>
                    <div className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
                            <ShieldCheck size={12} className="text-indigo-400" />
                            Hardware Verified
                        </span>
                        <p className="text-[11px] font-medium text-slate-400">Manage institutional parameters and security protocols.</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="btn-primary min-w-[220px] h-14 justify-center gap-3 relative overflow-hidden group"
                    >
                        {isSaving ? (
                            <RefreshCw className="animate-spin" size={20} />
                        ) : (
                            <Save size={20} className="group-hover:scale-110 transition-transform" />
                        )}
                        <span className="font-black uppercase tracking-widest text-[12px]">
                            {isSaving ? 'Syncing...' : 'Synchronize Registry'}
                        </span>
                    </button>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Academic Parameters */}
                <motion.div className="glass-panel p-8 group relative overflow-hidden" variants={itemVariants}>
                    <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                        <Calendar size={120} />
                    </div>

                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                            <Calendar size={22} />
                        </div>
                        <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Academic Parameters</h3>
                    </div>

                    <div className="space-y-8">
                        <InputField label="Operational Academic Cycle" icon={<Calendar size={14} />}>
                            <select
                                value={settings.academicYear}
                                onChange={(e) => handleChange('academicYear', e.target.value)}
                                className="custom-input h-14 text-sm font-bold bg-black/40"
                            >
                                <option>2023-2024</option>
                                <option>2024-2025</option>
                                <option>2025-2026</option>
                            </select>
                        </InputField>

                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <Cpu size={14} className="text-slate-600" /> Active Sector Semester
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => handleChange('semester', 'Odd')}
                                    className={`h-12 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${settings.semester === 'Odd'
                                        ? 'bg-indigo-600/20 border-indigo-500 text-white'
                                        : 'bg-white/5 border-white/5 text-slate-500 hover:bg-white/10'
                                        }`}
                                >
                                    Cycle I (Odd)
                                </button>
                                <button
                                    onClick={() => handleChange('semester', 'Even')}
                                    className={`h-12 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${settings.semester === 'Even'
                                        ? 'bg-indigo-600/20 border-indigo-500 text-white'
                                        : 'bg-white/5 border-white/5 text-slate-500 hover:bg-white/10'
                                        }`}
                                >
                                    Cycle II (Even)
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Interface Logic */}
                <motion.div className="glass-panel p-8 group relative overflow-hidden" variants={itemVariants}>
                    <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                        <Monitor size={120} />
                    </div>

                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                            <Monitor size={22} />
                        </div>
                        <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Interface Logic</h3>
                    </div>

                    <div className="space-y-4">
                        <SettingsToggle
                            icon={<Moon size={18} />}
                            label="Dark Interface Protocol"
                            sub="Enable high-contrast neural dark mode"
                            enabled={settings.darkMode}
                            onToggle={() => handleToggle('darkMode')}
                        />
                        <SettingsToggle
                            icon={<Bell size={18} />}
                            label="Neural Notifications"
                            sub="Push real-time biometric alerts"
                            enabled={settings.notifications}
                            onToggle={() => handleToggle('notifications')}
                        />
                    </div>
                </motion.div>

                {/* Communication Topology */}
                <motion.div className="glass-panel p-8 group relative overflow-hidden" variants={itemVariants}>
                    <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                        <Globe size={120} />
                    </div>

                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                            <Globe size={22} />
                        </div>
                        <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Communication Topology</h3>
                    </div>

                    <div className="space-y-4">
                        <SettingsToggle
                            icon={<Mail size={18} />}
                            label="Email Intelligence Digests"
                            sub="Automated reports to central command"
                            enabled={settings.emailAlerts}
                            onToggle={() => handleToggle('emailAlerts')}
                        />
                        <SettingsToggle
                            icon={<Smartphone size={18} />}
                            label="SMS Priority Alerts"
                            sub="Emergency protocol bypass"
                            enabled={settings.smsAlerts}
                            onToggle={() => handleToggle('smsAlerts')}
                        />
                    </div>
                </motion.div>

                {/* 5. DANGER ZONE */}
                <motion.div className="glass-panel p-8 border-rose-500/20 group relative overflow-hidden" variants={itemVariants}>
                    <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                        <Lock size={120} />
                    </div>

                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-400 border border-rose-500/20">
                            <Lock size={22} />
                        </div>
                        <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Danger Zone</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/10 transition-colors">
                            <p className="text-[11px] font-bold text-rose-400 uppercase tracking-widest leading-relaxed">
                                Irreversible Action Required
                            </p>
                            <p className="text-[10px] text-slate-500 mt-2 font-medium">
                                Once you delete your account, there is no going back. All institutional data associated with your identity will be purged.
                            </p>
                            <button
                                onClick={onDeleteAccount}
                                className="w-full mt-6 py-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-black uppercase rounded-xl hover:bg-rose-500 hover:text-white transition-all tracking-widest"
                            >
                                Terminate Identity Permanently
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

const SettingsToggle = ({ icon, label, sub, enabled, onToggle, color = 'bg-indigo-500' }) => (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group/toggle hover:bg-white/[0.08] transition-all">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500 group-hover/toggle:text-indigo-400 transition-colors border border-white/5">
                {icon}
            </div>
            <div>
                <p className="text-[12px] font-bold text-slate-200 tracking-tight">{label}</p>
                <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest mt-0.5">{sub}</p>
            </div>
        </div>
        <Toggle enabled={enabled} onToggle={onToggle} color={color} />
    </div>
);

const Toggle = ({ enabled, onToggle, color = 'bg-indigo-500' }) => (
    <button
        onClick={onToggle}
        className={`w-12 h-6.5 rounded-full relative transition-all duration-300 p-1 ${enabled ? color : 'bg-slate-700/50'
            } border border-white/5`}
    >
        <motion.div
            className="w-4.5 h-4.5 bg-white rounded-full shadow-lg"
            animate={{ x: enabled ? 22 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
    </button>
);

const InputField = ({ label, icon, children }) => (
    <div className="space-y-3">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
            {icon}
            {label}
        </label>
        <div className="relative">
            {children}
        </div>
    </div>
);

export default PortalSettings;
