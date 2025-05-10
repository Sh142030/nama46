import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { FaChartLine, FaProjectDiagram, FaTasks, FaClipboardCheck, FaUsers, FaBuilding } from 'react-icons/fa';

const Dashboard = () => {
  const { supabase, user } = useApp();
  const [stats, setStats] = useState({
    strategicGoals: 0,
    initiatives: 0,
    activities: 0,
    kpis: 0,
    departments: 0,
    users: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // جلب إحصائيات من قاعدة البيانات
        const [
          { count: strategicGoalsCount },
          { count: initiativesCount },
          { count: activitiesCount },
          { count: kpisCount },
          { count: departmentsCount },
          { count: usersCount }
        ] = await Promise.all([
          supabase.from('strategic_goals').select('id', { count: 'exact', head: true }),
          supabase.from('initiatives').select('id', { count: 'exact', head: true }),
          supabase.from('activities').select('id', { count: 'exact', head: true }),
          supabase.from('kpis').select('id', { count: 'exact', head: true }),
          supabase.from('departments').select('id', { count: 'exact', head: true }),
          supabase.from('users').select('id', { count: 'exact', head: true })
        ]);

        setStats({
          strategicGoals: strategicGoalsCount || 0,
          initiatives: initiativesCount || 0,
          activities: activitiesCount || 0,
          kpis: kpisCount || 0,
          departments: departmentsCount || 0,
          users: usersCount || 0
        });
      } catch (error) {
        console.error('خطأ في جلب الإحصائيات:', error);
        setError('حدث خطأ أثناء تحميل البيانات');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [supabase]);

  const StatCard = ({ title, value, icon, color, link }) => (
    <Link to={link} className="block">
      <div className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border-r-4 ${color}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
            <p className="text-3xl font-bold mt-2">{value}</p>
          </div>
          <div className={`text-3xl ${color.replace('border-', 'text-')}`}>
            {icon}
          </div>
        </div>
      </div>
    </Link>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-4" role="alert">
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">لوحة المعلومات</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="الأهداف الاستراتيجية" 
          value={stats.strategicGoals} 
          icon={<FaChartLine />} 
          color="border-blue-500" 
          link="/strategic-goals" 
        />
        
        <StatCard 
          title="المبادرات والبرامج" 
          value={stats.initiatives} 
          icon={<FaProjectDiagram />} 
          color="border-green-500" 
          link="/initiatives" 
        />
        
        <StatCard 
          title="الأنشطة التشغيلية" 
          value={stats.activities} 
          icon={<FaTasks />} 
          color="border-purple-500" 
          link="/activities" 
        />
        
        <StatCard 
          title="مؤشرات الأداء" 
          value={stats.kpis} 
          icon={<FaClipboardCheck />} 
          color="border-yellow-500" 
          link="/kpis" 
        />
        
        <StatCard 
          title="الإدارات" 
          value={stats.departments} 
          icon={<FaBuilding />} 
          color="border-red-500" 
          link="/departments" 
        />
        
        <StatCard 
          title="المستخدمون" 
          value={stats.users} 
          icon={<FaUsers />} 
          color="border-indigo-500" 
          link="/users" 
        />
      </div>

      <div className="mt-12 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">مرحباً بك في نظام التخطيط الاستراتيجي والتشغيلي</h2>
        <p className="text-gray-600">
          هذا النظام يساعدك على إدارة الخطط الاستراتيجية والتشغيلية بكفاءة عالية. يمكنك متابعة الأهداف الاستراتيجية، المبادرات، الأنشطة التشغيلية، ومؤشرات الأداء من خلال هذه المنصة.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link to="/strategic-goals" className="btn-primary">
            استعراض الأهداف الاستراتيجية
          </Link>
          <Link to="/reports" className="btn-secondary">
            التقارير
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;