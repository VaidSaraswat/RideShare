import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Auth from './Auth';
class Header extends React.Component {
	render() {
		if (this.props.auth.isSignedIn) {
			return (
				<div className="ui menu">
					<Link to="/rides" className="header item">
						RideShare
					</Link>
					<Link to="/addride" className="header item">
						Add Ride
					</Link>
					<Link to="/addreview" className="header item">
						Add Review
					</Link>
					<Link to="/drivers" className="header item">
						Drivers
					</Link>
					<Link
						to={`/myprofile/${this.props.auth.userId}`}
						className="header item"
					>
						My Account
					</Link>
					<div className="right menu">
						<Auth />
					</div>
				</div>
			);
		} else {
			return null;
		}
	}
}

const mapStateToProps = (state) => {
	return { auth: state.auth };
};

export default connect(mapStateToProps)(Header);
