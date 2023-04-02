function Drawer({ onClose, onRemove, items = [] }) {
	return (
		<div className="overlay">
			<div className="drawer">
				<h2 className="d-flex justify-between mb-30">
					Cart
					<img onClick={onClose} className="removeBtn cu-p" src="/img/btn-remove.svg" alt="Close" />
				</h2>

				{
					items.length > 0 ? (
						<div>
							<div className="items">
								{
									items.map(item =>
										<div className="cartItem d-flex align-center mb-20">
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
								<button className="greenButton">Make an order <img src="/img/arrow.svg" alt="Arrow" /></button>
							</div>
						</div>
					) : (
						<div className="cartEmpty d-flex align-center justify-center flex-column flex">
							<img className="mb-20" width={120} height={120} src="/img/empty-cart.jpg" alt="Empty Cart" />
							<h2>The basket is empty</h2>
							<p className="opacity-6">Add at least one pair of sneakers to place an order.</p>
							<button onClick={onClose} className="greenButton">
								<img src="/img/arrow.svg" alt="Arrow" />Go back
							</button>
						</div>
					)
				}
			</div>
		</div>
	);
}

export default Drawer;