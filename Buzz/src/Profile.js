import React, { Component } from 'react';
import './Profile.css';
import firebase from 'firebase';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleBuzz = this.handleBuzz.bind(this);
  }

  handleBuzz() {
    firebase.database().ref('profiles/' + this.props.user)
            .update({buzzers: this.props.buzzers + 1});
  }

  render() {
    return (
      <div className="Profile">
        <img className="Profile-image"
             src={this.props.image}
             role="presentation"/>
        <div className="Profile-header">
          <div className="Profile-info">
            <h1>{this.props.name}</h1>
            <h3>{this.props.description}</h3>
          </div>
          <div className="Profile-score">
            <h3>Buzzers</h3>
            {this.props.buzzers}
            <h3>Buzzies</h3>
            {this.props.buzzies}
          </div>
        </div>
        <button style={{borderRadius: '50%'}} onClick={() => this.handleBuzz()}>
          <img src="https://www.goodfreephotos.com/albums/vector-images/cartoon-bee-vector-art.png" role="presentation" style={{height: 60}} />
        </button>
      </div>
    );
  }
}

Profile.propTypes = {
  name: React.PropTypes.string,
  description: React.PropTypes.string,
  image: React.PropTypes.string,
  user: React.PropTypes.string,
  buzzers: React.PropTypes.number,
  buzzies: React.PropTypes.number,
};

export default Profile;
