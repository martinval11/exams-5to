import '@/styles/globals.css';
import '@/styles/pico.min.css';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
	return <Component {...pageProps} />;
};

export default App;
