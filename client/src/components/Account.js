import React from 'react';
import { connect } from 'react-redux';
import { fetchAccount } from '../actions';
import { selectAvatar, updateRideAvatar } from '../actions';

/*
	Need to update the rides model so that it also has an avatar property which can show the users avatar

	Steps:
	1. First update the rides model so that it now has an avatar property
	2. Wire up backend so that it can update the avatar property on the ride itself
	3. Set up the action creator which will update the users avatar when the navigate to the home page
	4. Set up user reducer so that it will take in the users current information ie: name, number, and avatar

*/

class Account extends React.Component {
	componentDidMount() {
		this.props.fetchAccount(this.props.auth);
	}

	updateAvatar(image) {
		this.props.selectAvatar(this.props.match.params.id, image, this.props.auth);
		this.props.updateRideAvatar(
			this.props.match.params.id,
			image,
			this.props.auth
		);
	}

	renderList() {
		return this.props.avatar.map((image) => {
			return (
				<div className="card" key={image.image}>
					<div className="image">
						<img
							src={require(`../images/${image.image}`)}
							alt={'Random message'}
						/>
					</div>
					<button
						onClick={() => this.updateAvatar(image.image)}
						className="ui bottom attached positive button"
					>
						<i className="add icon"></i>
						Select
					</button>
				</div>
			);
		});
	}
	render() {
		return (
			<div className="ui items">
				<div className="ui medium dividing header">Account Information</div>
				<div className="item">
					<div className="ui tiny image">
						<img
							src={require(`../images/${this.props.image}`)}
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

				<div className="ui medium dividing header">Choose Your Avatar</div>
				<div className="ui cards">{this.renderList()}</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		user: state.user,
		avatar: state.avatar,
		image: state.selectedImage,
	};
};

export default connect(mapStateToProps, {
	fetchAccount,
	selectAvatar,
	updateRideAvatar,
})(Account);
