import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

const sneakers = [
	{ title: 'Men\'s sneakers Nike Blazer Mid Suede', price: '300', image: '1.jpg' },
	{ title: 'Men\'s sneakers Nike Air Max 270', price: '350', image: '2.jpg' }
]

function App() {
	return (
		<div className="wrapper clear">
			<Drawer />
			<Header />

			<div className="content p-40">

				<div className="d-flex align-center justify-between mb-40">
					<h1>All sneakers</h1>
					<div className="search-block d-flex">
						<img src="/img/search.svg" alt="Search" />
						<input place holder="Seaech..." />
					</div>
				</div>

				<div className="d-flex">
					{
						sneakers.map(s =>
							<Card
								title={s.title}
								price={s.price}
								imageUrl={s.image}
							/>
						)
					}
				</div>
			</div>
		</div>
	);
}

export default App;
