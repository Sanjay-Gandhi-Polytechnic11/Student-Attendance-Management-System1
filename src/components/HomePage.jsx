import React from 'react';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, LayoutGrid, ShieldCheck, Users } from 'lucide-react';
import Navbar from './Navbar';
import SgpLogo from '../assets/logo.png';

const HomePage = ({ onLogin, onRegister, onDashboard, isAuthenticated, hideNavbar = false }) => {
    return (
        <div className={`min-h-screen bg-slate-50 flex flex-col ${hideNavbar ? 'h-full overflow-y-auto' : ''}`}>
            {!hideNavbar && (
                <Navbar 
                    onNavigateToLogin={onLogin} 
                    onNavigateToRegister={onRegister}
                    onNavigateToDashboard={onDashboard}
                    isAuthenticated={isAuthenticated}
                />
            )}

            <div className="flex-1 flex flex-col">
                <main className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 text-center pt-40 pb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto flex flex-col items-center"
                    >
                        <div className="mb-10 flex items-center justify-center w-40 h-40 bg-white rounded-[40px] shadow-2xl border border-white p-4">
                            <img src={SgpLogo} alt="Logo" className="w-full h-full object-contain" />
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-8 leading-tight">
                            Attendance <br/>
                            <span className="text-indigo-600 italic">Management System</span>
                        </h1>
                        
                        <p className="text-xl text-slate-600 mb-14 leading-relaxed max-w-2xl mx-auto font-medium">
                            A streamlined institutional portal for tracking presence, managing schedules, 
                            and empowering the educational journey through data.
                        </p>

                        <div className="flex flex-wrap justify-center gap-6">
                            {isAuthenticated ? (
                                <button 
                                    onClick={onDashboard}
                                    className="btn-primary px-12 h-16 text-sm shadow-indigo-200"
                                >
                                    <LayoutGrid size={22} />
                                    <span>Enter Dashboard</span>
                                </button>
                            ) : (
                                <>
                                    <button 
                                        onClick={onLogin}
                                        className="btn-primary px-12 h-16 text-sm shadow-indigo-200"
                                    >
                                        <LogIn size={22} />
                                        <span>Sign In to Portal</span>
                                    </button>
                                    <button 
                                        onClick={onRegister}
                                        className="bg-white text-slate-900 border-2 border-slate-200 px-12 h-16 rounded-2xl font-black text-sm flex items-center gap-3 hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm"
                                    >
                                        <UserPlus size={22} />
                                        <span>Join Faculty</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </motion.div>

                    {/* Simple Sub-Features */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-32 max-w-5xl w-full border-t border-slate-200 pt-16"
                    >
                        {[
                            { title: "Real-time Sync", desc: "Immediate data synchronization across all nodes." },
                            { title: "Secure Access", desc: "Encrypted institutional authentication protocols." },
                            { title: "Automated Reporting", desc: "Batch export analytics for semester review." }
                        ].map((item, i) => (
                            <div key={i} className="text-left group">
                                <div className="w-8 h-1 bg-indigo-600 mb-6 rounded-full group-hover:w-16 transition-all duration-500" />
                                <h3 className="font-extrabold text-slate-900 text-lg mb-3 tracking-tight">{item.title}</h3>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Team Section */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="mt-32 max-w-5xl w-full border-t border-slate-200 pt-16 pb-12"
                    >
                        <h2 className="text-3xl font-black text-slate-900 mb-12 tracking-tight">Development Team</h2>
                        <div className="flex flex-col items-center gap-4">
                            {[
                                "Dasari Charan Venkat",
                                "Shaik Irshan",
                                "M Shiva Balaji Gouda",
                                "Sidda Reddy",
                                "Harsha Reddy",
                                "Indravaraprasad"
                            ].map((name, i) => (
                                <div key={i} className="flex items-center gap-6 group w-full max-w-md bg-white p-4 rounded-3xl border border-slate-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300">
                                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 flex-shrink-0">
                                        <Users size={20} />
                                    </div>
                                    <span className="font-black text-slate-800 tracking-tight text-sm uppercase">{name}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </main>

                <footer className="py-16 border-t border-slate-100 bg-white">
                    <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-3 bg-slate-50 px-5 py-2.5 rounded-full border border-slate-100">
                            <ShieldCheck size={18} className="text-emerald-500" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">System Status: Operational</span>
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-loose text-center md:text-left">
                            © 2026 AttendFlow Systems <br/> 
                            <span className="text-slate-300 font-medium tracking-tight normal-case">Integrated Education Network Wing</span>
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default HomePage;
