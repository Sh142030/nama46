import { supabase } from './supabaseClient';

export const getStrategicGoals = async () => {
  try {
    const { data, error } = await supabase
      .from('strategic_goals')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('خطأ في جلب الأهداف الاستراتيجية:', error.message);
    return { success: false, error: error.message };
  }
};

export const getStrategicGoalById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('strategic_goals')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('خطأ في جلب الهدف الاستراتيجي:', error.message);
    return { success: false, error: error.message };
  }
};

export const createStrategicGoal = async (goal) => {
  try {
    const { data, error } = await supabase
      .from('strategic_goals')
      .insert([goal])
      .select();

    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('خطأ في إنشاء هدف استراتيجي:', error.message);
    return { success: false, error: error.message };
  }
};

export const updateStrategicGoal = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from('strategic_goals')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('خطأ في تحديث الهدف الاستراتيجي:', error.message);
    return { success: false, error: error.message };
  }
};

export const deleteStrategicGoal = async (id) => {
  try {
    const { error } = await supabase
      .from('strategic_goals')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('خطأ في حذف الهدف الاستراتيجي:', error.message);
    return { success: false, error: error.message };
  }
};