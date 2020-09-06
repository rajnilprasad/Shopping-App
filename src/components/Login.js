import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';
import MusicApp from './app/index';

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([require('./assets/bg.jpg')]);

    await Promise.all([...imageAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return <MusicApp />;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default Login;















// import React, { Component, Fragment } from "react";
// import withContext from "../withContext";
// import { Redirect } from "react-router-dom";

// class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: "",
//       password: ""
//     };
//   }
//   handleChange = e =>
//     this.setState({ [e.target.name]: e.target.value, error: "" });

//   login = () => {
//     const { username, password } = this.state;
//     if (!username || !password) {
//       return this.setState({ error: "Fill all fields!" });
//     }
//     let loggedIn = this.props.context.login(username, password);
//     if (!loggedIn) {
//       this.setState({ error: "Invalid Credentails" });
//     }
//   };

//   render() {
//     return !this.props.context.user ? (
//       <Fragment>
//         <div className="hero is-primary ">
//           <div className="hero-body container">
//             <h4 className="title">Login</h4>
//           </div>
//         </div>
//         <br />
//         <br />
//         <div className="columns is-mobile is-centered">
//           <div className="column is-one-third">
//             <div className="field">
//               <label className="label">User Name: </label>
//               <input
//                 className="input"
//                 type="text"
//                 name="username"
//                 onChange={this.handleChange}
//               />
//             </div>
//             <div className="field">
//               <label className="label">Password: </label>
//               <input
//                 className="input"
//                 type="password"
//                 name="password"
//                 onChange={this.handleChange}
//               />
//             </div>
//             {this.state.error && (
//               <div className="has-text-danger">{this.state.error}</div>
//             )}
//             <div className="field is-clearfix">
//               <button
//                 className="button is-primary is-outlined is-pulled-right"
//                 onClick={this.login}
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       </Fragment>
//     ) : (
//       <Redirect to="/products" />
//     );
//   }
// }

// export default withContext(Login);
