import type { GetServerSideProps, NextPage } from 'next';
import type { PartialResource } from 'lib/types';
import Link from 'next/link';
import { Layout } from 'components/Layout';
import { Centered } from 'components/Centered';
import { ImageList } from 'components/ImageList';
import { getAllUploads, toPartialUpload } from 'lib/uploads';

interface Props {
	images: PartialResource[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	const images = await getAllUploads();
	return {
		props: { images: images.map(toPartialUpload) },
	};
};

const Gallery: NextPage<Props> = ({ images }) => (
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
				<ImageList images={images} />
			)}
		</main>
	</Layout>
);

export default Gallery;
