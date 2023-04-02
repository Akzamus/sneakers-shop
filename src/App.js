import React from "react";
import axios from "axios";
import { Route } from 'react-router-dom';
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";

function App() {
	const [items, setItems] = React.useState([]);
	const [favorites, setFavorites] = React.useState([]);
	const [cartItems, setCartItems] = React.useState([]);
	const [cartOpened, setCartOpened] = React.useState(false);
	const [searchValue, setSearchValue] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(true);

	const isItemAdded = (id) => {
		return cartItems.some(i => Number(i.id) === Number(id))
	}

	const onAddToCart = async (item) => {
		try {
			if (cartItems.find(i => Number(i.id) === Number(item.id))) {
				await axios.delete(`http://localhost:5000/cart/${item.id}`);
				setCartItems(prev => prev.filter(i => Number(i.id) !== Number(item.id)));
			} else {
				const { data } = await axios.post('http://localhost:5000/cart', { id: item.id });
				setCartItems(prev => [...prev, data]);
			}
		} catch (error) {
			alert(`Couldn't add to cart`);
		}
	};

	const onAddToFavorite = async (item) => {
		console.log("Component mounted");
		try {
			if (favorites.find(i => Number(i.id) === Number(item.id))) {
				await axios.delete(`http://localhost:5000/favorites/${item.id}`);
				setFavorites(prev => prev.filter(i => Number(i.id) !== Number(item.id)));
			} else {
				const { data } = await axios.post('http://localhost:5000/favorites', { id: item.id });
				setFavorites(prev => [...prev, data])
			}
		} catch (error) {
			alert(`Couldn't add to favorites`);
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
		async function fetchData() {
			setIsLoading(true);
			const cartResponse = await axios.get('http://localhost:5000/cart');
			const favoritesResponse = await axios.get('http://localhost:5000/favorites');
			const itemsResponse = await axios.get('http://localhost:5000/sneakers');

			setCartItems(cartResponse.data)
			setFavorites(favoritesResponse.data)
			setItems(itemsResponse.data)
			setIsLoading(false);
		}

		fetchData();
	}, []);

	return (
		<AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems }}>
			<div className="wrapper clear">
				{cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
				<Header onClickCart={() => setCartOpened(true)} />

				<Route path="/" exact>
					<Home
						items={items}
						cartItems={cartItems}
						searchValue={searchValue}
						setSearchValue={setSearchValue}
						onChangeSearchInput={onChangeSearchInput}
						onAddToFavorite={onAddToFavorite}
						onAddToCart={onAddToCart}
						isLoading={isLoading}
					/>
				</Route>

				<Route path="/favorites" exact>
					<Favorites />
				</Route>
			</div>
		</AppContext.Provider>
	);
}

export default App;
