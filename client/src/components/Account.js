import React from 'react';
import { connect } from 'react-redux';
import { fetchAccount } from '../actions';

class Account extends React.Component {
	componentDidMount() {
		this.props.fetchAccount(this.props.auth);
	}
	render() {
		return (
			<div className="ui items">
				<div className="ui medium dividing header">Account Information</div>
				<div className="item">
					<div className="ui tiny image">
						<img
							src={require('../images/christian.jpg')}
							alt={'Random message'}
						/>
					</div>
					<div className="content">
						<div className="content">
							<h4 className="ui header">Username: {this.props.user.name}</h4>
							<h4 className="ui header">
								Phone Number: {this.props.user.number}
							</h4>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { auth: state.auth, user: state.user };
};

export default connect(mapStateToProps, { fetchAccount })(Account);
