import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { Layout } from 'components/Layout';

const NotFound: NextPage = () => {
	const router = useRouter();

	return (
		<Layout title="Not found">
			<main className="p-4">
				<h2 className="my-5">Page not found :(</h2>

				<Link href="/" passHref>
					<Button>Home</Button>
				</Link>

				<Button className="mx-4" onClick={() => router.back()} variant="outline-primary">
					Go back
				</Button>
			</main>
		</Layout>
	);
};

export default NotFound;
