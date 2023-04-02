import { Link } from 'react-router-dom';

function Header(props) {
	return (
		<header className="d-flex justify-between align-center p-40">
			<Link to="/">
				<div className="d-flex align-center">
					<img width={40} height={40} alt="Logo" src="/img/logo.png" />
					<div>
						<h3 className="text-uppercase">My Sneakers</h3>
						<p className="opacity-5">Shop of the best sneakers</p>
					</div>
				</div>
			</Link>

			<ul className="d-flex">
				<li onClick={props.onClickCart} className="mr-30 cu-p">
					<img width={18} height={18} alt="Cart" src="/img/cart.svg" />
					<span>2035$</span>
				</li>
				<li>
					<Link to="/favorites">
						<img width={18} height={18} alt="Favorites" src="/img/heart.svg" />
					</Link>
				</li>
				<li>
					<img width={18} height={18} alt="User" src="/img/user.svg" />
				</li>
			</ul>
		</header>
	);
}

export default Header;