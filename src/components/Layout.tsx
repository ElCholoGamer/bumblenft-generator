import Head from 'next/head';
import { Header } from './Header';

export interface Props {
	title?: string;
	siteTitle?: string;
	description?: string;
}

export const Layout: React.FC<Props> = ({
	siteTitle = 'BumbleNFT\u00AE Generator',
	title,
	description = 'the',
	children,
}) => {
	const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

	return (
		<>
			<Head>
				<title>{fullTitle}</title>
				<meta name="description" content={description} />

				<meta property="og:title" content={fullTitle} />
				<meta property="og:description" content={description} />
				<meta property="og:type" content="website" />
				<meta property="og:image" content={`${process.env.NEXT_PUBLIC_HOST}/api/og-image`} />
				<meta property="og:image:alt" content="A randomly generated Bumble NFT" />

				<link rel="icon" type="image/x-icon" href="/favicon.ico" />
			</Head>

			<Header />
			{children}
		</>
	);
};
