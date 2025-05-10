import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaBullseye, 
  FaProjectDiagram, 
  FaTasks, 
  FaChartLine, 
  FaSitemap, 
  FaFileAlt 
} from 'react-icons/fa';

const Sidebar = () => {
  const navItems = [
    { path: '/', name: 'لوحة المعلومات', icon: <FaHome /> },
    { path: '/strategic-goals', name: 'الأهداف الاستراتيجية', icon: <FaBullseye /> },
    { path: '/initiatives', name: 'المبادرات والبرامج', icon: <FaProjectDiagram /> },
    { path: '/operational-activities', name: 'الأنشطة التشغيلية', icon: <FaTasks /> },
    { path: '/kpis', name: 'مؤشرات الأداء', icon: <FaChartLine /> },
    { path: '/departments', name: 'الإدارات والهيكل التنظيمي', icon: <FaSitemap /> },
    { path: '/reports', name: 'التقارير', icon: <FaFileAlt /> },
  ];

  return (
    <aside className="bg-primary-dark text-white w-64 flex-shrink-0 hidden md:block">
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold">نظام همم</h2>
      </div>
      
      <nav className="mt-8">
        <ul>
          {navItems.map((item) => (
            <li key={item.path} className="mb-2">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center py-3 px-4 ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-300 hover:bg-primary hover:text-white'
                  } transition-colors`
                }
              >
                <span className="ml-3">{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;