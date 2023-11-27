import ExamsRoot from '@/components/ExamsRoot';
import { getExams } from '@/lib/getExams';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exámenes 5ºA',
	viewport: {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
  },
};

const Home = async () => {
  const exams = await getExams();

  return <ExamsRoot examsDB={exams} />;
};

export default Home;
