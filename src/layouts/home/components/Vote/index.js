import React, { props } from 'react';

export default class Vote extends React.Component {
  constructor(){
    super(props);
    this.state = {
      likeCount: 0,
      dislikeCount: 0
    }
    this.increaseLikeCount = this.increaseLikeCount.bind(this);
    this.increaseDislikeCount = this.increaseDislikeCount.bind(this);
  }

  increaseLikeCount(){
    this.setState({
      likeCount: this.state.likeCount + 1
    })
  }

  increaseDislikeCount(){
    this.setState({
      dislikeCount: this.state.dislikeCount + 1
    })
  }

  render() {
    return(
      <div className="vote">
        <div className="thumbsup-icon">
          <span className="upVote icon-like" onClick={this.increaseLikeCount} />
          <span className="like-count">{this.state.likeCount}</span>
        </div>
        <div className="thumbsdown-icon">
          <span className="downVote icon-dislike" onClick={this.increaseDislikeCount} />
          <span className="dislike-count">{this.state.dislikeCount}</span>
        </div>
      </div>
    )
  }
}
