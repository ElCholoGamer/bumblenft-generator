import type { AppProps } from 'next/app';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as gtag from 'lib/gtag';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	const router = useRouter();

	useEffect(() => {
		const handleRouteChange = (url: string) => gtag.pageview(url);

		router.events.on('routeChangeComplete', handleRouteChange);
		return () => router.events.off('routeChangeComplete', handleRouteChange);
	}, [router.events]);

	return (
		<>
			<Script
				strategy="afterInteractive"
				src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
			/>
			<Script
				id="gtag-init"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', '${gtag.GA_TRACKING_ID}', {
							page_path: window.location.pathname,
						});
					`,
				}}
			/>
			<Component {...pageProps} />
		</>
	);
};

export default App;
