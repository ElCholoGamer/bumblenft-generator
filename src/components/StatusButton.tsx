import { Button, Spinner, ButtonProps } from 'react-bootstrap';

export const StatusButton: React.FC<ButtonProps> = ({ children, ...props }) => (
	<Button {...props}>
		{!props.disabled ? (
			children
		) : (
			<Spinner size="sm" role="status" aria-hidden="true" animation="border" />
		)}
	</Button>
);
