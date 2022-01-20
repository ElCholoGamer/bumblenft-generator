import { HTMLProps } from 'react';

export interface Props extends HTMLProps<HTMLParagraphElement> {
	rarityValue: number | null;
}

export const Rarity: React.FC<Props> = ({ rarityValue, ...props }) => (
	<p {...props}>
		Rarity:{' '}
		<strong>
			{rarityValue === null ? (
				'???'
			) : (
				<>
					{rarityValue} <span className="text-warning">&#9733;</span>
				</>
			)}
		</strong>
	</p>
);
