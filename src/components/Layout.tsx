import Head from 'next/head';
import { Children, cloneElement, isValidElement } from 'react';
import { Footer } from './Footer';
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
	const content = Children.map(children, child => {
		if (!isValidElement(child)) return child;

		const { className = '' } = child.props;
		return cloneElement(child, { className: (className + ' flex-grow-1').trim() });
	});

	return (
		<>
			<Head>
				<title>{fullTitle}</title>
				<meta name="description" content={description} />
				<meta name="theme-color" content="#ffffff" />

				<meta property="og:title" content={fullTitle} />
				<meta property="og:description" content={description} />
				<meta property="og:type" content="website" />
				<meta
					property="og:image"
					content={`${process.env.NEXT_PUBLIC_HOST}/api/generate?type=og`}
				/>
				<meta property="og:image:alt" content="A randomly generated Bumble NFT" />

				<link rel="icon" type="image/x-icon" href="/favicon.ico" />
			</Head>

			<div className="d-flex flex-column h-100">
				<Header />
				{content}
				<Footer />
			</div>
		</>
	);
};
