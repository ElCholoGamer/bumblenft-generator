import { HTMLProps } from 'react';

export const Footer: React.FC<HTMLProps<HTMLElement>> = props => (
	<footer {...props} className="w-100 text-light text-center p-3">
		<small>Copyright &copy; {new Date().getFullYear()} Sugoma Inc. All Rights Reserved</small>
	</footer>
);
