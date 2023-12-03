import { Metadata, Viewport } from 'next';
import ExamsDashboard from './components/Exams/ExamsDashboard';
import { getExams } from '@/lib/getExams';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Exámenes 5ºA - Panel de Control',
  icons: {
    shortcut: '/icon-512x512.png',
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const Dashboard = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  if (!token) {
    redirect('/login');
  }
  const exams = await getExams();

  return <ExamsDashboard examsDB={exams} />;
};

export default Dashboard;
