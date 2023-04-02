import React from 'react';
import styles from './Card.module.scss'

function Card({ id, title, price, imageUrl, onPlus, onFavorite }) {
	const [isAdded, setIsAdded] = React.useState(false);

	const onClickPlus = () => {
		onPlus({ id, title, price, imageUrl });
		setIsAdded(!isAdded);
	}

	return (
		<div className={styles.card}>
			<div className={styles.favorite} onClick={onFavorite}>
				<img src="/img/heart.svg" alt="Heart" />
			</div>
			<img width={133} height={112} src={imageUrl} alt="Sneakers" />
			<h5>{title}</h5>

			<div className="d-flex justify-between align-center">
				<div className="d-flex flex-column">
					<span>Price:</span>
					<b>{price}$</b>
				</div>

				<img
					className={styles.plus}
					onClick={onClickPlus}
					src={`/img/btn-${isAdded ? 'checked' : 'plus'}.svg`} alt="Plus"
				/>
			</div>
		</div>
	);
}

export default Card;