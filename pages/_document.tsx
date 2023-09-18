import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
	return (
		<Html lang="es">
			<Head>
				<link rel="manifest" href="/manifest.json" />
				<link rel="apple-touch-icon" href="/icon-512x512.png" />
				<meta name="theme-color" content="#fff" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
