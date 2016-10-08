import React, { Component } from 'react';
import './App.css';
import './Profile.css';
import Profile from './Profile';
import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyA43dU7TUYNx0DstgVb2MIGiduBd5WSHjg",
  authDomain: "buzz-56edd.firebaseapp.com",
  databaseURL: "https://buzz-56edd.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "522027421649"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {profiles: null, name: '', description: '', image: ''};
    this.componentDidMount = this.componentDidMount.bind(this);
    this.createProfile = this.createProfile.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  componentDidMount() {
    firebase.database().ref('profiles/')
            .on('value', (snapshot) => {
              this.setState({profiles: snapshot.val()});
            });
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleDescriptionChange(event) {
    this.setState({description: event.target.value});
  }

  handleImageChange(event) {
    this.setState({image: event.target.value});
  }

  createProfile(name, description, image) {
    var profileData = {
      name: name,
      description: description,
      image: image,
      buzzers: 0,
      buzzies: 0,
    };
    var id = firebase.database().ref().child('/profiles').push().key;
    var updates = {};
    updates['/profiles/' + id] = profileData;
    firebase.database().ref().update(updates);
    this.setState({name: '', description: '', image: ''});
  }

  render() {
    return (
      <div className="App">
        <button className="App-button"
                onClick={() => this.createProfile(
                    this.state.name, this.state.description, this.state.image)}>
          +
        </button>
        <div className="App-form">
          <span>
            Name
            <input
                type="text"
                value={this.state.name}
                onChange={this.handleNameChange}
            /><br />
          </span>
          <span>
            About
            <input
                type="text"
                value={this.state.description}
                onChange={this.handleDescriptionChange}
            /><br />
          </span>
          <span>
            Image
            <input
                type="text"
                value={this.state.image}
                onChange={this.handleImageChange}
            /><br />
          </span>
        </div>
        <div className="App-header">
          <img src="https://www.goodfreephotos.com/albums/vector-images/cartoon-bee-vector-art.png" className="App-logo" alt="logo" />
          <h2>Welcome to Buzz</h2>
        </div>
        <div className="App-background">
          <div className="App-body">
            {this.state.profiles &&
             Object.keys(this.state.profiles).map((profile, index) => (
               <Profile key={index}
                        user={profile}
                        name={this.state.profiles[profile].name}
                        description={this.state.profiles[profile].description}
                        image={this.state.profiles[profile].image}
                        buzzies={this.state.profiles[profile].buzzies}
                        buzzers={this.state.profiles[profile].buzzers}
               />
             ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
