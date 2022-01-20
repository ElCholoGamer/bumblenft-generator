import { PartialResource } from 'lib/types';
import styles from 'styles/Gallery.module.css';

export interface Props {
	images: PartialResource[];
}

export const ImageList: React.FC<Props> = ({ images }) => (
	<ul className={`${styles.container} list-unstyled`}>
		{images.map(image => (
			<li key={image.id} className="m-2">
				<a href={image.permalink}>
					{/*eslint-disable-next-line @next/next/no-img-element*/}
					<img className={`${styles.galleryImage} rounded`} src={image.permalink} alt="" />
				</a>
			</li>
		))}
		<li></li>
	</ul>
);
