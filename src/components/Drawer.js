import axios from 'axios';
import React from 'react'
import AppContext from '../context';
import Info from "./info";

function Drawer({ onClose, onRemove, items = [] }) {
	const { cartItems, setCartItems } = React.useContext(AppContext);
	const [orderId, setOrderId] = React.useState(null);
	const [isOrderComplete, setIsOrderComplete] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);

	const onClickOrder = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.post('http://localhost:5000/orders', { items: cartItems });
			await axios.delete('http://localhost:5000/cart')
			setOrderId(data.id);
			setIsOrderComplete(true);
			setCartItems([]);
		} catch (error) {
			alert('Error when creating an order :(');
		}
		setIsLoading(false);
	}

	return (
		<div className="overlay">
			<div className="drawer">
				<h2 className="d-flex justify-between mb-30">
					Cart
					<img onClick={onClose} className="removeBtn cu-p" src="/img/btn-remove.svg" alt="Close" />
				</h2>

				{
					items.length > 0 ? (
						<div className="d-flex  flex-column flex">
							<div className="items">
								{
									items.map(item =>
										<div key={item.id} className="cartItem d-flex align-center mb-20">
											<div style={{ backgroundImage: `url(${item.imageUrl})` }} className="cartItemImg" />

											<div className="mr-20 flex">
												<p className="mb-5">{item.title}</p>
												<b>{item.price}$</b>
											</div>

											<img onClick={() => onRemove(item.id)} className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
										</div>
									)
								}
							</div>

							<div className="cartTotalBlock">
								<ul>
									<li>
										<span>Total:</span>
										<div></div>
										<b>300$</b>
									</li>
									<li>
										<span>Tax 5%:</span>
										<div></div>
										<b>15$</b>
									</li>
								</ul>
								<button disabled={isLoading} onClick={onClickOrder} className="greenButton">
									Make an order
									<img src="/img/arrow.svg" alt="Arrow" />
								</button>
							</div>
						</div>
					) : (
						<Info
							title={isOrderComplete ? 'The order has been placed!' : 'The basket is empty'}
							description={
								isOrderComplete ?
									`Your order #${orderId} will be delivered to courier delivery soon` :
									'Add at least one pair of sneakers to place an order'
							}
							image={isOrderComplete ? '/img/complete-order.jpg' : '/img/empty-cart.jpg'}
						/>
					)
				}
			</div>
		</div>
	);
}

export default Drawer;