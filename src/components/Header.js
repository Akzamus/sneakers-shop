function Header() {
	return (
		<header className="d-flex justify-between align-center p-40">
			<div className="d-flex align-center">
				<img width={40} height={40} alt="Logo" src="/img/logo.png" />
				<div>
					<h3 className="text-uppercase">My Sneakers</h3>
					<p className="opacity-5">Shop of the best sneakers</p>
				</div>
			</div>
			<ul className="d-flex">
				<li className="mr-30">
					<img width={18} height={18} alt="Cart" src="/img/cart.svg" />
					<span>2035$</span>
				</li>
				<li>
					<img width={18} height={18} alt="User" src="/img/user.svg" />
				</li>
			</ul>
		</header>
	);
}

export default Header;