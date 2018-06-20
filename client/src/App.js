import React, {Component} from 'react';
import {Route,Redirect,withRouter,Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import './App.sass';
import {fetchAuthUser} from './actions';
import {getCurrentUser} from './selectors';

import Login from './components/Login';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword';
import Profile from './containers/ProfilePage';
import AlbumPage from './containers/AlbumPage';
import UserPage from './containers/UserPage';
import Logout from './containers/Logout';
import Spinner from './components/UI/Spinner';
import Error from './components/UI/Error';
import ResultsPage from './containers/ResultsPage';
import NewPassword from './containers/NewPassword';
import PageNotFound from './components/PageNotFound';

import AuthAlbum from './hoc/AuthAlbum';
import UserAlbum from './hoc/UserAlbum';

class App extends Component {
  componentDidMount() {
    this.props.onFetchAuthUser();
  }
  render() {
    let content = (
      <Switch>
        <Route exact path="/" component={Profile}/>
        <Route path="/albums/:albumId" component={AuthAlbum(AlbumPage)}/>
        <Route path="/users/:id" component={UserPage}/>
        <Route path="/search" component={ResultsPage}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/user/:userId/albums/:albumId" component={UserAlbum(AlbumPage)}/>
        <Route path="/auth" render={() => <Redirect to="/"/>}/>
        <Route exact path="/" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route path="/*" component={PageNotFound}/>
      </Switch>
    );
    if(this.props.user === null) {
      content = <Spinner color="blue" center fullHeight/>
    }
    if(this.props.user === false) {
      content = (
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route path="/resetPassword" component={ResetPassword}/>
          <Route path="/resetPasswordSuccess/:token" component={NewPassword}/>
          <Route path="/*" component={PageNotFound}/>
        </Switch>
      )
    }
    return (
      <div>
        {this.props.error
          ? <Error>{this.props.error}</Error>
          : null
        }
        {content}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: getCurrentUser(state),
  error: state.error.get('error')
});

const mapDispatchToProps = dispatch => ({
  onFetchAuthUser: () => dispatch(fetchAuthUser())
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));