import React from 'react';
import { motion } from 'framer-motion';
import { LogIn, LayoutGrid, Home } from 'lucide-react';
import SgpLogo from '../assets/logo.png';

const Navbar = ({ onNavigateToLogin, onNavigateToRegister, onNavigateToDashboard, isAuthenticated }) => {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-100 py-4"
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <div 
                    className="flex items-center gap-3 cursor-pointer group" 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
                        <Home size={20} />
                    </div>
                    <span className="text-xl font-black tracking-tight text-slate-800">
                        Attend<span className="text-indigo-600">Flow</span>
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <button 
                            onClick={onNavigateToDashboard}
                            className="btn-primary px-6 py-3 text-[12px]"
                        >
                            <LayoutGrid size={16} />
                            <span>Dashboard Access</span>
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button 
                                onClick={onNavigateToLogin}
                                className="text-[13px] font-bold text-slate-700 hover:text-indigo-600 px-4 py-2 transition-colors uppercase tracking-[0.05em]"
                            >
                                Sign In
                            </button>
                            <button 
                                onClick={onNavigateToRegister}
                                className="btn-primary px-6 py-3 text-[12px]"
                            >
                                <LogIn size={16} />
                                <span>Get Started</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
