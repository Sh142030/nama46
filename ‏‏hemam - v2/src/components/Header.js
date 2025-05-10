import React from 'react';
import { useApp } from '../context/AppContext';
import { FaUserCircle, FaBell, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  const { user, logout } = useApp();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary">نظام التخطيط الاستراتيجي والتشغيلي</h1>
        
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="relative">
            <FaBell className="text-gray-600 text-xl cursor-pointer hover:text-primary transition-colors" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </div>
          
          <div className="relative group">
            <div className="flex items-center space-x-2 space-x-reverse cursor-pointer">
              <FaUserCircle className="text-gray-600 text-2xl" />
              <span className="text-gray-700">{user?.full_name || user?.email}</span>
            </div>
            
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaSignOutAlt className="ml-2" />
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;