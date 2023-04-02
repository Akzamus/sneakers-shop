import React from "react";
import axios from "axios";
import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

function App() {
	const [items, setItems] = React.useState([]);
	const [cartItems, setCartItems] = React.useState([]);
	const [cartOpened, setCartOpened] = React.useState(false);
	const [searchValue, setSearchValue] = React.useState('');

	const onAddToCart = async (item) => {
		try {
			await axios.post('http://localhost:5000/cart', { id: item.id });
			setCartItems(prev => [...prev, item]);
		} catch (error) {
			console.error(error);
		}
	};

	const onRemoveItem = async (id) => {
		try {
			await axios.delete(`http://localhost:5000/cart/${id}`);
			setCartItems(prev => prev.filter(item => item.id !== id));
		} catch (error) {
			console.error(error);
		}
	}

	const onChangeSearchInput = (event) => {
		setSearchValue(event.target.value)
	}

	React.useEffect(() => {
		axios.get('http://localhost:5000/sneakers')
			.then(res => setItems(res.data));

		axios.get('http://localhost:5000/cart')
			.then(res => setCartItems(res.data))
	}, []);

	return (
		<div className="wrapper clear">
			{cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
			<Header onClickCart={() => setCartOpened(true)} />

			<div className="content p-40">

				<div className="d-flex align-center justify-between mb-40">
					<h1>{searchValue ? `Search by request: "${searchValue}"` : 'All sneakers'}</h1>
					<div className="search-block d-flex">
						<img src="/img/search.svg" alt="Search" />
						<input value={searchValue} onChange={onChangeSearchInput} placeholder="Seaech..." />
					</div>
				</div>

				<div className="d-flex flex-wrap">
					{
						items
							.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
							.map(item =>
								<Card
									key={item.id}
									id={item.id}
									title={item.title}
									price={item.price}
									imageUrl={item.imageUrl}
									onFavorite={() => console.log('Added to bookmarks')}
									onPlus={onAddToCart}
								/>
							)
					}
				</div>
			</div>
		</div>
	);
}

export default App;
