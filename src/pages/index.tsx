import type { NextPage } from 'next';
import { MouseEventHandler, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import { Layout } from 'components/Layout';
import { Rarity } from 'components/Rarity';

const Home: NextPage = () => {
	const [data, setData] = useState({
		upload: { permalink: '/api/generate?type=placeholder' },
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
				<Rarity rarityValue={rarity} />

				{/*eslint-disable-next-line @next/next/no-img-element*/}
				<img
					className="my-1 rounded"
					onLoad={handleLoad}
					onError={handleLoad}
					src={data.upload.permalink}
					alt=""
				/>
				<br />

				<Button className="mt-4" variant="primary" disabled={loading} onClick={handleClick}>
					{!loading ? (
						'Do it'
					) : (
						<Spinner
							as="span"
							variant="light"
							size="sm"
							role="status"
							aria-hidden="true"
							animation="border"
						/>
					)}
				</Button>
			</main>
		</Layout>
	);
};

export default Home;
