import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

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
						<input placeholder="Seaech..." />
					</div>
				</div>

				<div className="d-flex">
					<Card />
				</div>
			</div>
		</div>
	);
}

export default App;
