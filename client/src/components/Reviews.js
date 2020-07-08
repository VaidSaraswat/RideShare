import React from 'react';
import { connect } from 'react-redux';
import { fetchReviews } from '../actions';
class Reviews extends React.Component {
	componentDidMount() {
		this.props.fetchReviews(this.props.auth);
	}

	renderList() {
		return (
			<div>
				<h4 className="ui dividing header">Reviews</h4>
				{this.props.reviews.map((reviewList) => {
					return (
						<div
							className="ui comments"
							key={reviewList._id}
							style={{ paddingLeft: '1vw' }}
						>
							<div className="comment">
								<a className="avatar" href="localhost:3000">
									<img
										src={require(`../images/small/joe.jpg`)}
										alt="This is an avatar"
									></img>
								</a>
								<div className="content">
									<a className="author" href="localhost:3000">
										{reviewList.driverName}
									</a>
								</div>
							</div>
							<div className="ui comments" style={{ paddingLeft: '4vw' }}>
								<h4 className="ui dividing header">Comments</h4>
								{reviewList.reviews.map((review) => {
									return (
										<div className="comment" key={review._id}>
											<a className="avatar" href="localhost:3000">
												<img
													src={require(`../images/small/${review.reviewerAvatar}`)}
													alt="This is an avatar"
												/>
											</a>
											<div className="content">
												<div className="author">{review.reviewerName}</div>
												<div className="text">{review.comment}</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		);
	}
	render() {
		return <div className="ui segments">{this.renderList()}</div>;
	}
}

const mapStateToProps = (state) => {
	return { auth: state.auth, reviews: Object.values(state.reviews) };
};
export default connect(mapStateToProps, { fetchReviews })(Reviews);
