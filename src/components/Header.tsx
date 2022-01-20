import Link from 'next/link';
import Image from 'next/image';
import { Navbar, Nav } from 'react-bootstrap';
import logo from '@public/logo.png';
import githubIcon from '@public/github.svg';

export const Header: React.FC = () => (
	<Navbar variant="dark" className="px-2" expand="md">
		<Link href="/" passHref>
			<Navbar.Brand>
				<span className="d-inline-block align-top">
					<Image src={logo} alt="BumbleNFT logo" />
				</span>{' '}
				BumbleNFT
				<sup>&reg;</sup> Generator
			</Navbar.Brand>
		</Link>

		<Navbar.Toggle />

		<Navbar.Collapse>
			<Nav>
				<Link href="/gallery" passHref>
					<Nav.Link>Gallery</Nav.Link>
				</Link>
			</Nav>

			<a
				className="d-flex ms-auto text-secondary"
				href="https://github.com/ElCholoGamer/bumblenft-generator"
			>
				<span className="d-none d-sm-block">Check out on GitHub</span>
				<span className="mx-2">
					<Image src={githubIcon} alt="GitHub Logo" />
				</span>
			</a>
		</Navbar.Collapse>
	</Navbar>
);
