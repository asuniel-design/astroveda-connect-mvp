import { supabase } from '../supabase';

export const saveSoulProfile = async (userId, birthData) => {
  const { data, error } = await supabase
    .from('profiles')
    .upsert({ 
      id: userId, 
      dob: birthData.dob, 
      time: birthData.time, 
      lat: birthData.lat, 
      lng: birthData.lng,
      last_sync: new Date().toISOString()
    });

  if (error) throw error;
  return data;
};

export const getSoulProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) return null;
  return data;
};
