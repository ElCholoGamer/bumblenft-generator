import type { GetServerSideProps, NextPage } from 'next';
import type { PartialResource } from 'lib/types';
import { useState } from 'react';
import Link from 'next/link';
import { getAllUploads } from 'lib/uploads';
import { toPartialUpload } from 'lib/common/uploads';
import { Layout } from 'components/Layout';
import { Centered } from 'components/Centered';
import { ImageList } from 'components/ImageList';
import axios from 'axios';
import { StatusButton } from 'components/StatusButton';

interface Props {
	initialImages: PartialResource[];
	nextCursor?: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	const { resources, nextCursor } = await getAllUploads();
	return {
		props: {
			initialImages: resources.map(toPartialUpload),
			nextCursor,
		},
	};
};

const Gallery: NextPage<Props> = ({ initialImages, nextCursor }) => {
	const [images, setImages] = useState(initialImages);
	const [cursor, setCursor] = useState(nextCursor);
	const [loading, setLoading] = useState(false);

	const handleClick = () => {
		setLoading(true);

		let url = '/api/uploads';
		if (cursor) url += `?cursor=${cursor}`;

		axios
			.get(url)
			.then(({ data }) => {
				setImages(prev => [...prev, ...data.resources]);
				setCursor(data.nextCursor);
			})
			.catch(console.error)
			.finally(() => setLoading(false));
	};

	return (
		<Layout title="Gallery">
			<main className="p-3">
				{!images.length ? (
					<Centered>
						No NFTs have been generated yet.{' '}
						<Link href="/">
							<a>Generate one now!</a>
						</Link>
					</Centered>
				) : (
					<>
						<ImageList images={images} />
						{cursor && (
							<StatusButton className="mx-auto d-block" onClick={handleClick} disabled={loading}>
								Load more
							</StatusButton>
						)}
					</>
				)}
			</main>
		</Layout>
	);
};

export default Gallery;
