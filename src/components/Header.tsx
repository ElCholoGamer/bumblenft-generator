import Link from 'next/link';
import Image from 'next/image';
import { Navbar, Nav } from 'react-bootstrap';
import logo from '@public/logo.png';
import githubIcon from '@public/github.svg';

export const Header: React.FC = () => (
	<Navbar bg="dark" variant="dark" className="px-2">
		<Link href="/" passHref>
			<Navbar.Brand>
				<span className="d-inline-block align-top">
					<Image src={logo} alt="BumbleNFT logo" />
				</span>{' '}
				BumbleNFT
				<sup>&reg;</sup> Generator
			</Navbar.Brand>
		</Link>

		<Nav className="ms-auto">
			<Nav.Link className="d-flex" href="https://github.com/ElCholoGamer/bumblenft-generator">
				<span className="d-none d-sm-block mx-2">Check out on GitHub</span>
				<Image src={githubIcon} alt="GitHub Logo" />
			</Nav.Link>
		</Nav>
	</Navbar>
);
