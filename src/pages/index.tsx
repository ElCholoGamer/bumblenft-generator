import type { NextPage } from 'next';
import Image from 'next/image';
import { MouseEventHandler, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import { Layout } from 'components/Layout';
import { Rarity } from 'components/Rarity';
import { ImageSizes } from 'lib/common/constants';
import placeholder from '@public/placeholder.png';

const Home: NextPage = () => {
	const [data, setData] = useState({
		upload: { permalink: placeholder },
		rarity: null,
	});
	const [rarity, setRarity] = useState<number | null>(null);
	const [loading, setLoading] = useState(false);

	const handleLoad = () => {
		setLoading(false);
		setRarity(data.rarity);
	};

	const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
		setLoading(true);

		axios
			.get('/api/generate')
			.then(res => setData(res.data))
			.catch(err => {
				console.error(err);
				setLoading(false);
			});
	};

	return (
		<Layout>
			<main className="text-center p-2">
				<Rarity className="fs-4" rarityValue={rarity} />

				<div className="my-2 mw-100">
					<Image
						className="rounded bg-white"
						onLoad={handleLoad}
						onError={handleLoad}
						src={data.upload.permalink}
						{...ImageSizes.NORMAL}
						alt="A randomly generated Bumble NFT"
					/>
				</div>

				<Button className="mt-4" disabled={loading} onClick={handleClick}>
					{!loading ? (
						'Do it'
					) : (
						<Spinner size="sm" role="status" aria-hidden="true" animation="border" />
					)}
				</Button>
			</main>
		</Layout>
	);
};

export default Home;
