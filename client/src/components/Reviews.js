import React from 'react';
import { connect } from 'react-redux';
import { fetchReviews } from '../actions';
class Reviews extends React.Component {
	componentDidMount() {
		this.props.fetchReviews(this.props.auth);
	}

	renderList() {
		return this.props.reviews.map((reviewList) => {
			return (
				<div className="ui segment" key={reviewList._id}>
					<div className="left floated left aligned column">
						<i className="large id badge icon"></i>
						{reviewList.driverName}
					</div>
					{reviewList.reviews.map((review) => {
						return (
							<div className="ui segment" key={review._id}>
								<div className="left floated left aligned eight wide column">
									<img
										className="ui avatar image"
										src={require(`../images/small/${review.reviewerAvatar}`)}
										alt="This is an avatar"
									/>
									{review.reviewerName}
								</div>
								<div className="right floated left aligned eight wide column">
									{review.comment}
								</div>
							</div>
						);
					})}
				</div>
			);
		});
	}
	render() {
		return <div className="ui segments">{this.renderList()}</div>;
	}
}

const mapStateToProps = (state) => {
	return { auth: state.auth, reviews: Object.values(state.reviews) };
};
export default connect(mapStateToProps, { fetchReviews })(Reviews);
