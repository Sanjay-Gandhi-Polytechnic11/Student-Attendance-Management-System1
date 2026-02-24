import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Plus,
    Grid3X3,
    Clock
} from 'lucide-react';
import Layout from './components/Layout';
import AttendancePanel from './components/AttendancePanel';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AdminDashboard from './components/AdminDashboard';
import HodDashboard from './components/HodDashboard';
import StaffDashboard from './components/StaffDashboard';
import StudentDashboard from './components/StudentDashboard';
import ReportPage from './components/ReportPage';
import PortalSettings from './components/PortalSettings';
import MemberDirectory from './components/MemberDirectory';
import StaffAttendanceEntry from './components/StaffAttendanceEntry';
import SchedulePage from './components/SchedulePage';
import LeaveGateway from './components/LeaveGateway';
import ProfilePage from './components/ProfilePage';
import { api } from './api';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authView, setAuthView] = useState('login');
    const [userRole, setUserRole] = useState('Teacher');
    const [currentUser, setCurrentUser] = useState(null);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [students, setStudents] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [directoryActive, setDirectoryActive] = useState(false);

    // Initial fetch from backend
    useEffect(() => {
        loadStudents();
        loadUsers();
    }, []);

    const handleRefreshDirectory = async () => {
        setIsLoading(true);
        await loadStudents();
        setDirectoryActive(true);
    };

    const loadStudents = async () => {
        try {
            const data = await api.getStudents();
            setStudents(data);
        } catch (error) {
            console.error("Failed to load students:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadUsers = async () => {
        try {
            const data = await api.getUsers();
            setUsers(data);
        } catch (error) {
            console.error("Failed to load users:", error);
        }
    };

    // Search logic with animation trigger
    useEffect(() => {
        if (searchQuery.length > 0) {
            setIsSearching(true);
            const timer = setTimeout(() => setIsSearching(false), 800);
            return () => clearTimeout(timer);
        }
    }, [searchQuery]);

    const handleStatusChange = async (id, newStatus) => {
        const time = newStatus === 'Absent' ? '-' : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        try {
            await api.updateStudentStatus(id, newStatus, time);
            setStudents(prev => prev.map(s =>
                s.id === id ? { ...s, status: newStatus, time } : s
            ));

            if (newStatus === 'Present') {
                alert('The Student is Present');
            } else if (newStatus === 'Absent') {
                alert('The Student Is Absent');
            }
        } catch (error) {
            alert('Error updating status: ' + error.message);
        }
    };

    const handleLoginSuccess = (user) => {
        setCurrentUser(user);
        setIsAuthenticated(true);

        if (user.role === 'ADMIN') {
            setUserRole('Admin');
            setActiveTab('admin-dashboard');
        } else if (user.role === 'HOD') {
            setUserRole('HOD');
            setActiveTab('hod-dashboard');
        } else if (user.role === 'STUDENT') {
            setUserRole('Student');
            setActiveTab('student-dashboard');
        } else {
            setUserRole('Teacher');
            setActiveTab('staff-dashboard');
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setAuthView('login');
        setCurrentUser(null);
    };

    const handleDeleteAccount = async () => {
        if (!currentUser || !currentUser.id) {
            alert('Unable to delete account: User information not found.');
            return;
        }

        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                await api.deleteAccount(currentUser.id);
                alert('Your account has been successfully deleted.');
                logout();
            } catch (error) {
                console.error('Delete account error:', error);
                alert('Failed to delete account: ' + error.message);
            }
        }
    };

    const handleUpdateStudent = async (id, updatedData) => {
        try {
            // Find current student to check if status changed
            const currentStudent = students.find(s => s.id === id);

            // If status changed, we should also update the timestamp
            if (updatedData.status && currentStudent && updatedData.status !== currentStudent.status) {
                updatedData.time = updatedData.status === 'Absent' ? '-' : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }

            const updatedStudent = await api.updateStudent(id, updatedData);
            setStudents(prev => prev.map(s =>
                s.id === id ? updatedStudent : s
            ));
            alert('Student registry updated successfully');
        } catch (error) {
            alert('Error updating student: ' + error.message);
        }
    };

    const handleSendSms = async () => {
        try {
            await api.sendSmsToParents(students);
            alert('SMS notifications sent to parents for ' + students.length + ' students.');
        } catch (error) {
            alert('Failed to send SMS: ' + error.message);
        }
    };

    if (!isAuthenticated) {
        return authView === 'login' ? (
            <LoginPage
                onLogin={handleLoginSuccess}
                onSwitchToRegister={() => setAuthView('register')}
            />
        ) : (
            <RegisterPage
                onRegister={handleLoginSuccess}
                onSwitchToLogin={() => setAuthView('login')}
            />
        );
    }

    return (
        <Layout
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            logout={logout}
            user={currentUser}
            onDeleteAccount={handleDeleteAccount}
        >
            {activeTab === 'admin-dashboard' && <AdminDashboard users={users} students={students} />}
            {activeTab === 'hod-dashboard' && <HodDashboard onNavigate={(tab) => setActiveTab(tab)} students={students} onSendSMS={handleSendSms} />}
            {activeTab === 'staff-dashboard' && <StaffDashboard onNavigateToAttendance={(tab) => setActiveTab(tab)} students={students} onSendSMS={handleSendSms} />}
            {activeTab === 'student-dashboard' && <StudentDashboard user={currentUser} students={students} />}

            {(activeTab === 'dashboard' || activeTab === 'analytics') && <Dashboard students={students} searchQuery={searchQuery} isSearching={isSearching} onSendSMS={handleSendSms} />}
            {activeTab === 'reports' && <ReportPage records={students} />}
            {(activeTab === 'attendance' || activeTab === 'quick-mark' || activeTab === 'attenditics') && (
                <div className="max-w-5xl mx-auto">
                    <AttendancePanel
                        students={students}
                        onStatusChange={handleStatusChange}
                        onUpdateStudent={handleUpdateStudent}
                    />
                </div>
            )}
            {activeTab === 'staff-attendance' && (
                <StaffAttendanceEntry
                    students={students}
                    onStatusChange={handleStatusChange}
                    onUpdateStudent={handleUpdateStudent}
                />
            )}

            {activeTab === 'leave' && <LeaveGateway user={currentUser} />}

            {(activeTab === 'settings' || activeTab === 'portal-settings') && <PortalSettings onDeleteAccount={handleDeleteAccount} onSyncRegistry={handleRefreshDirectory} />}
            {activeTab === 'profile' && <ProfilePage user={currentUser} onDeleteAccount={handleDeleteAccount} />}

            {activeTab === 'schedule' && <SchedulePage />}

            {['students', 'admissions', 'staff-management', 'employees'].includes(activeTab) && (
                directoryActive ? (
                    <MemberDirectory students={students} searchQuery={searchQuery} />
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="h-[60vh] flex flex-col items-center justify-center glass-panel border-white/5 relative overflow-hidden group px-8 text-center"
                    >
                        <div className="absolute inset-0 bg-radial-at-c from-indigo-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <div className="relative mb-10">
                            <div className="w-24 h-24 bg-white/5 rounded-[32px] border border-white/5 flex items-center justify-center text-indigo-500 shadow-2xl group-hover:scale-110 transition-transform duration-700">
                                <Grid3X3 size={40} className="group-hover:rotate-12 transition-transform duration-700" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-500">
                                <Clock size={16} />
                            </div>
                        </div>

                        <h3 className="text-3xl font-black text-white tracking-tight">Registry Node <span className="text-indigo-500 italic">Inactive</span></h3>
                        <p className="text-slate-400 font-medium text-sm mt-4 max-w-sm leading-relaxed uppercase tracking-wider text-[11px]">
                            Connection to SGPB Institutional Persistence Layer required to synchronize member records.
                        </p>

                        <div className="flex flex-col items-center gap-6 mt-12">
                            <button
                                onClick={handleRefreshDirectory}
                                disabled={isLoading}
                                className="btn-primary px-12 h-14 flex items-center gap-4 group relative overflow-hidden"
                            >
                                <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                                <span className="text-[12px] font-black tracking-widest uppercase">
                                    {isLoading ? 'Synchronizing Protocols...' : 'Initialize Connection'}
                                </span>
                            </button>

                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                                <span className="text-[9px] font-black text-rose-500/70 uppercase tracking-[0.2em]">Secondary Server Offline</span>
                            </div>
                        </div>
                    </motion.div>
                )
            )}
        </Layout>
    );
}

export default App;
