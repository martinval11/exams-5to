import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
	apiKey: 'AIzaSyCNjHxcpSeAO7zWYPfELCZDgEsD4cdy53Q',
	authDomain: 'ees77exams.firebaseapp.com',
	projectId: 'ees77exams',
	storageBucket: 'ees77exams.appspot.com',
	messagingSenderId: '452851998356',
	appId: '1:452851998356:web:639c5e39d95a6ad8001e81',
	measurementId: 'G-CSKCJ4GBFM',
};

const app = initializeApp(firebaseConfig);
const analytics =
	app.name && typeof window !== 'undefined' ? getAnalytics(app) : null;
export const messaging =
	app.name && typeof navigator !== 'undefined' ? getMessaging(app) : null;
