import Head from 'next/head';
import { Header } from './Header';

export interface Props {
	title: string;
	description?: string;
}

export const Layout: React.FC<Props> = ({ title, description = 'the', children }) => (
	<>
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />

			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:type" content="website" />
			<meta property="og:image" content={`${process.env.NEXT_PUBLIC_HOST}/api/generate?type=og`} />
			<meta property="og:image:alt" content="A randomly generated Bumble NFT" />

			<link rel="icon" href="/favicon.ico" />
		</Head>

		<Header />
		{children}
	</>
);
