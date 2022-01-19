import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	return <Component {...pageProps} />;
};

export default App;
