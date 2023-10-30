import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
	return (
		<Html lang='es'>
			<Head>
				<link
					rel='icon'
					href='/icon-512x512.png'
				/>

				<link
					rel='manifest'
					href='/manifest.json'
				/>
				<link
					rel='apple-touch-icon'
					href='/icon-512x512.png'
				/>
				<meta
					name='theme-color'
					content='#fff'
				/>

				<meta
					name='description'
					content='Verifica los exámenes que tienes que hacer y no te olvides de ninguno'
				/>

				<meta
					property='og:url'
					content='https://examenes-5to.vercel.app'
				/>
				<meta
					property='og:type'
					content='website'
				/>
				<meta
					property='og:title'
					content='Exámenes 5ºA'
				/>
				<meta
					property='og:description'
					content='Verifica los exámenes que tienes que hacer y no te olvides de ninguno'
				/>
				<meta
					property='og:image'
					content='/icon-512x512.png'
				/>

				<meta
					name='twitter:card'
					content='summary_large_image'
				/>
				<meta
					property='twitter:domain'
					content='examenes-5to.vercel.app'
				/>
				<meta
					property='twitter:url'
					content='https://examenes-5to.vercel.app'
				/>
				<meta
					name='twitter:title'
					content='Exámenes 5ºA'
				/>
				<meta
					name='twitter:description'
					content='Verifica los exámenes que tienes que hacer y no te olvides de ninguno'
				/>
				<meta
					name='twitter:image'
					content='/icon-512x512.png'
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
