import React, { useState } from 'react';
import { Map, LayoutDashboard, Scale, Bell, User, LogOut, ChevronDown, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const AppHeader: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (route: string) => {
    if (route === '/projects' && (path === '/projects' || path === '/')) return true;
    return path.startsWith(route);
  };

  const navItemClass = (active: boolean) => 
    `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
      active ? 'text-slate-900 bg-slate-100' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
    }`;

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-white border-b border-slate-200 z-50 flex items-center justify-between px-4 md:px-6">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <button className="md:hidden text-slate-500" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
           {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight hidden sm:block">DEALOS</span>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-2 bg-white p-1 rounded-lg">
        <Link to="/map" className={navItemClass(isActive('/map'))}>
          <Map className="w-4 h-4 mr-2" />
          Map
        </Link>
        <Link to="/projects" className={navItemClass(isActive('/projects'))}>
          <LayoutDashboard className="w-4 h-4 mr-2" />
          My Projects
        </Link>
        <Link to="/legal" className={navItemClass(isActive('/legal'))}>
          <Scale className="w-4 h-4 mr-2" />
          Legal Review
        </Link>
      </nav>

      {/* User Actions */}
      <div className="flex items-center space-x-4">
        <button className="text-slate-400 hover:text-slate-600 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
        </button>
        
        <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

        <button className="flex items-center space-x-2 text-sm font-medium text-slate-700 hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
            <User className="w-4 h-4" />
          </div>
          <span className="hidden sm:block">John Doe</span>
          <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-lg md:hidden flex flex-col p-4 space-y-2 z-40">
           <Link to="/map" className={navItemClass(isActive('/map'))} onClick={() => setMobileMenuOpen(false)}>
              <Map className="w-4 h-4 mr-2" /> Map
           </Link>
           <Link to="/projects" className={navItemClass(isActive('/projects'))} onClick={() => setMobileMenuOpen(false)}>
              <LayoutDashboard className="w-4 h-4 mr-2" /> My Projects
           </Link>
           <Link to="/legal" className={navItemClass(isActive('/legal'))} onClick={() => setMobileMenuOpen(false)}>
              <Scale className="w-4 h-4 mr-2" /> Legal Review
           </Link>
        </div>
      )}
    </header>
  );
};
