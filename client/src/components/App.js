import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import RidesList from './RidesList';
import AddReview from './AddReview';
import Reviews from './Reviews';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Account from './Account';
import RideCreate from './RideCreate';
import RideDelete from './RideDelete';
import RideEdit from './RideEdit';
import history from '../history';

const App = () => {
	return (
		<div className="ui container">
			<Router history={history}>
				<Header />
				<Switch>
					<Route path="/" exact component={LoginForm}></Route>
					<Route path="/register" exact component={RegisterForm}></Route>
					<Route path="/addride" exact component={RideCreate}></Route>
					<Route path="/addreview" exact component={AddReview}></Route>
					<Route path="/reviews" exact component={Reviews}></Route>
					<Route path="/myprofile/:id" exact component={Account}></Route>
					<Route path="/rides" exact component={RidesList}></Route>
					<Route path="/rides/delete/:id" exact component={RideDelete}></Route>
					<Route path="/rides/edit/:id" exact component={RideEdit}></Route>
				</Switch>
			</Router>
		</div>
	);
};

export default App;
