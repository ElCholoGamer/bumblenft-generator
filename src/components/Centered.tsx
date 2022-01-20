import { HTMLProps } from 'react';

export const Centered: React.FC<HTMLProps<HTMLDivElement>> = ({ children, ...props }) => (
	<div {...props} className="h-100 w-100 d-flex justify-content-center align-items-center">
		<span>{children}</span>
	</div>
);
