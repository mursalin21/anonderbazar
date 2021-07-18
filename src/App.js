
import React from 'react';
import { observer } from 'mobx-react';
import UserStore from './stores/UserStore';
import LoginFrom from './LoginForm'
import TitleLeft from './TitleLeft'
import SubmitButton from './SubmitButton'
// import Logo from './images/login-background.png'
import './App.css';


class App extends React.Component {

  async componentDidMount() {

    try {
      let res = await fetch('./isLoggedIn', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      let result = await res.json()

      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      }

      else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    }

    catch (e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }
  async doLogout() {

    try {
      let res = await fetch('./logout', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      let result = await res.json()

      if (result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.username = '';
      }

    }

    catch (e) {
      console.log(e);
    }
  }

  render() {

    if (UserStore.loading) {
      return (
        <div className="app" >
          <div className="container">
            Loading, please wait...
          </div>
        </div>
      );
    }

    else {

      if (UserStore.isLoggedIn) {
        return (
          <div className="app" >
            <div className="container">
              Welcome {UserStore.username}

              <SubmitButton
                text={'Log Out'}
                disabled={false}
                onClick={() => this.doLogout()}
              />

            </div>
          </div>
        );
      }
      return (
        <div className="app" >

          <div className="container">

            <TitleLeft />

            <div className="login-container">

              <div className="login-form-title">
                <img id="getting-started-description" src={require('./images/get-you-started.svg').default} alt="short description" />
                <img id="getting-started" src={require('./images/login-title.svg').default} alt="title form getting started" />

              </div>
              <div className="login-form">
                <LoginFrom />
              </div>

            </div>
          </div>

        </div>
      );
    }

  }

}

export default observer(App);
