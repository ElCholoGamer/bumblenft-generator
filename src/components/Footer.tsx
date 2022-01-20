import { HTMLProps } from 'react';

export const Footer: React.FC<HTMLProps<HTMLElement>> = props => (
	<footer {...props} className="w-100 text-light text-center p-3">
		<small>Website goes hard, feel free to screenshot</small>
	</footer>
);
