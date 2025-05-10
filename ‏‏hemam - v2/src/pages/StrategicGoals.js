import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const StrategicGoals = () => {
  const { supabase } = useApp();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('strategic_goals')
          .select('*')
          .order('displayOrder', { ascending: true });
          
        if (error) throw error;
        
        setGoals(data || []);
      } catch (error) {
        console.error('خطأ في جلب الأهداف الاستراتيجية:', error);
        setError('حدث خطأ أثناء تحميل البيانات');
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, [supabase]);

  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من رغبتك في حذف هذا الهدف الاستراتيجي؟')) {
      try {
        const { error } = await supabase
          .from('strategic_goals')
          .delete()
          .eq('id', id);
          
        if (error) throw error;
        
        setGoals(goals.filter(goal => goal.id !== id));
      } catch (error) {
        console.error('خطأ في حذف الهدف الاستراتيجي:', error);
        alert('حدث خطأ أثناء حذف الهدف الاستراتيجي');
      }
    }
  };

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">الأهداف الاستراتيجية</h1>
        <Link to="/strategic-goals/new" className="btn-primary flex items-center">
          <FaPlus className="mr-2" /> إضافة هدف جديد
        </Link>
      </div>
      
      {goals.length === 0 ? (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">لا توجد أهداف استراتيجية. قم بإضافة هدف جديد للبدء.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map(goal => (
            <div key={goal.id} className="card hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{goal.title}</h2>
              <p className="text-gray-600 mb-4">{goal.description}</p>
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded text-sm ${
                  goal.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                  goal.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                  goal.status === 'NOT_STARTED' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {goal.status === 'COMPLETED' ? 'مكتمل' :
                   goal.status === 'IN_PROGRESS' ? 'قيد التنفيذ' :
                   goal.status === 'NOT_STARTED' ? 'لم يبدأ' : 'غير محدد'}
                </span>
                <div className="flex space-x-2">
                  <Link to={`/strategic-goals/${goal.id}`} className="text-blue-500 hover:text-blue-700">
                    <FaEye />
                  </Link>
                  <Link to={`/strategic-goals/${goal.id}/edit`} className="text-yellow-500 hover:text-yellow-700">
                    <FaEdit />
                  </Link>
                  <button 
                    onClick={() => handleDelete(goal.id)} 
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StrategicGoals;