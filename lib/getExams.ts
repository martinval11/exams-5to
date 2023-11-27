import { supabase } from './supabaseClient';
import { EXAMS_TABLE } from '@/keys/keys';

export const getExams = async () => {
  const { data: exams, error } = await supabase.from(EXAMS_TABLE).select('*');

  if (error) {
    throw new Error(error.message);
  }

  const sortedExamsByDate = exams.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return sortedExamsByDate;
};
