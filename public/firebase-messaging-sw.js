importScripts(
  "https://www.gstatic.com/firebasejs/10.4.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: 'AIzaSyCNjHxcpSeAO7zWYPfELCZDgEsD4cdy53Q',
  authDomain: "ees77exams.firebaseapp.com",
  projectId: "ees77exams",
  storageBucket: "ees77exams.appspot.com",
  messagingSenderId: "452851998356",
  appId: "1:452851998356:web:639c5e39d95a6ad8001e81",
  measurementId: "G-CSKCJ4GBFM",
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo-192x192.png",
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
