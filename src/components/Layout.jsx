import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutGrid,
    Activity,
    FileBarChart,
    ClipboardList,
    Users,
    LogOut,
    ShieldCheck,
    Settings,
    UserCheck,
    BookOpen,
    Trash2,
    User
} from 'lucide-react';
import SgpLogo from '../assets/logo.png';

const Layout = ({ children, activeTab, setActiveTab, logout, user, onDeleteAccount }) => {
    const role = user?.role || 'TEACHER';

    const getInitials = (email) => {
        if (!email) return 'ST';
        const parts = email.split('@')[0].split('.');
        if (parts.length >= 2) return (parts[0][0] + parts[1][parts[1].length - 1]).toUpperCase();
        return email.substring(0, 2).toUpperCase();
    };

    const navItems = {
        ADMIN: [
            { id: 'admin-dashboard', label: 'Admin Terminal', icon: <LayoutGrid size={20} /> },
            { id: 'dashboard', label: 'General Overview', icon: <Activity size={20} /> },
            { id: 'analytics', label: 'Detailed Analytics', icon: <FileBarChart size={20} /> },
            { id: 'reports', label: 'Central Reports', icon: <FileBarChart size={20} /> },
            { id: 'students', label: 'Faculty Registry', icon: <Users size={20} /> },
            { id: 'settings', label: 'Portal Config', icon: <Settings size={20} /> },
            { id: 'profile', label: 'Profile', icon: <User size={20} /> },
        ],
        HOD: [
            { id: 'hod-dashboard', label: 'Dashboard', icon: <LayoutGrid size={20} /> },
            { id: 'dashboard', label: 'Dashboard', icon: <Users size={20} /> },
            { id: 'employees', label: 'Student', icon: <ClipboardList size={20} /> },
            { id: 'attenditics', label: 'Attenditics', icon: <Activity size={20} /> },
            { id: 'reports', label: 'Reports', icon: <FileBarChart size={20} /> },
            { id: 'profile', label: 'Profile', icon: <User size={20} /> },
        ],
        TEACHER: [
            { id: 'staff-dashboard', label: 'Dashboard', icon: <LayoutGrid size={20} /> },
            { id: 'staff-attendance', label: 'Attendance', icon: <UserCheck size={20} /> },
            { id: 'leave', label: 'Leave', icon: <ClipboardList size={20} /> },
            { id: 'reports', label: 'Reports', icon: <FileBarChart size={20} /> },
            { id: 'profile', label: 'Profile', icon: <User size={20} /> },
        ]
    };

    const currentNav = navItems[role] || navItems.TEACHER;

    return (
        <div className="app-container">
            <aside className="sidebar">
                <div style={{ padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {role === 'HOD' ? (
                        <div style={{ width: '48px', height: '48px', background: '#2563eb', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <LayoutGrid size={28} />
                        </div>
                    ) : (
                        <div style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ padding: '10px', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '50%', color: '#3b82f6' }}>
                                <Users size={32} />
                            </div>
                        </div>
                    )}
                </div>

                <nav style={{
                    padding: '24px 0',
                    flex: 1,
                    overflowY: 'auto',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }} className="sidebar-nav">
                    <style>{`
                        .sidebar-nav::-webkit-scrollbar { display: none; }
                    `}</style>
                    <div style={{ padding: '0 24px 16px', fontSize: '10px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                        Main Cluster
                    </div>
                    {currentNav.map(item => (
                        <NavItem
                            key={item.id}
                            icon={item.icon}
                            label={item.label}
                            active={activeTab === item.id}
                            onClick={() => setActiveTab(item.id)}
                        />
                    ))}
                </nav>

                <div style={{
                    padding: '24px',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    background: 'var(--bg-sidebar)',
                    position: 'relative',
                    zIndex: 10
                }}>
                    <button onClick={logout} className="nav-item w-full" style={{ background: 'none', border: 'none', width: '100%', padding: '12px 16px', borderRadius: '12px' }}>
                        <LogOut size={18} />
                        <span style={{ fontSize: '13px', fontWeight: 600 }}>Logout Session</span>
                    </button>

                    <button onClick={onDeleteAccount} className="nav-item danger w-full" style={{ background: 'none', border: 'none', width: '100%', padding: '12px 16px', borderRadius: '12px' }}>
                        <Trash2 size={18} />
                        <span style={{ fontSize: '13px', fontWeight: 600 }}>Delete Account</span>
                    </button>

                    <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                        <div style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 8px #10b981' }}></div>
                        <span style={{ fontSize: '9px', fontWeight: 900, color: '#94a3b8', letterSpacing: '1.5px', textTransform: 'uppercase' }}>System Synchronized</span>
                    </div>
                </div>
            </aside>

            <main className="main-content">

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: -10 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

const NavItem = ({ icon, label, active, onClick }) => (
    <div
        onClick={onClick}
        className={`nav-item ${active ? 'active' : ''}`}
        style={{ margin: '4px 12px', borderRadius: '12px' }}
    >
        <div style={{ color: active ? 'white' : '#64748b' }}>
            {icon}
        </div>
        <span style={{ fontSize: '13px', fontWeight: active ? 800 : 600 }}>{label}</span>
        {active && (
            <motion.div
                layoutId="nav-glow"
                style={{ marginLeft: 'auto', width: '5px', height: '18px', background: 'white', borderRadius: '3px', boxShadow: '0 0 10px white' }}
            />
        )}
    </div>
);

export default Layout;
