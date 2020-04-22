import React from 'react';

import { BrowserRouter as Router,
Route,
// eslint-disable-next-line 
Redirect,
Link,
Switch } from 'react-router-dom';

import axios from 'axios';
import { connect } from 'react-redux';
import { setUser } from '../redux/userAction'

import '../css/App.css';
import '../../node_modules/uikit/dist/css/uikit.min.css';

import Login from './login'
import Products from './Products'
import ManagePage from './ManagePage'

// eslint-disable-next-line
import initialState from '../redux/initialState'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      image:[],
      color:"black",
      displayColorPicker: false
    }
  }

  componentDidMount(){
    // this.uploadFile()
  }

  

  

  onSaveProduct = () =>{
    // let data = new FormData();
    // let file = this.state.image[0];
    // let url = 'https://uwa-app1.akae.xyz/upload'

    // data.append('file', file);
    // data.append('name', file.name)
    // axios.post(url, data, {
    //   headers: {
    //     'Authorization' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNGE0YmFlMTRmODdlMTM4Y2JlM2U3MyIsInVzZXJuYW1lIjoiYW5kaXRhMSIsImVtYWlsIjoiYW5kaXRha2Flc2FyMUBnbWFpbC5jb20iLCJpYXQiOjE1ODIzNTA4OTksImV4cCI6MTU4MjQzNzI5OX0.7A1ICPp3wjw6_PSGahRSnjaY0aGQAfId_v8m0Azviiw'
    //   }
    // })
    // .then(res => {
    //   console.log(res.data)
    //     this.setState({
    //           imgThumbDisplay: require(res.data.thumb_url)
    //         })
    //   })
    // .catch(er => console.log(er))
    //  this.uploadFile()
  }

  onLogout = () => {
    const url = 'https://uwa-app1.akae.xyz/auth/login'
    const body = {
      username: 'andita1',
      password: 'andita101'
    }

    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    axios.post(url, body, config)
    .then(response => {
        // console.log(response)
        // console.log(response.data)
        this.props.setUser(response.data)
    })
    .catch(error => console.log(error.response))
  }

  render(){
    return (
      <div className="App">
        <div className="uk-section">

        {this.props.user.isLoggedIn ? 
          <div className="header-login">
            <span data-uk-icon="sign-out" data-uk-toggle="target: #modal-confirm-logout">Log out</span>
          </div> : 
          <div className="header-login">
            <span data-uk-icon="sign-in" data-uk-toggle="target: #modal-login">Log in or Create account</span>
          </div>
        }
        
        <Login onClickLogin={this.onClickLogin}></Login>
        <div id="modal-confirm-logout" data-uk-modal>
          <div className="uk-modal-dialog uk-modal-body">
              <h2 className="uk-modal-title">Yakin mau logout?</h2>
              <p>Jika anda logout maka dunia persilatan akan didenda</p>
              <p className="uk-text-right">
                  <button className="uk-button uk-button-default uk-modal-close">Cancel</button>
                  <button className="uk-button uk-button-primary uk-modal-close" onClick={() => this.onLogout()}>Logout</button>
              </p>
          </div>
        </div>

        <div className="header-container">
          <div id="header-img-container">
            <img width="356" height="166" x="0" y="0" transform="" 
              preserveAspectRatio="xMidYMid slice" data-type="image"
              src={require('../images/mf-logo.png')} alt="">
            </img>
          </div>
        </div>

        <Router>
          <div className="menubar-container">
          
            <nav className="uk-navbar-container bg-white" data-uk-navbar="boundary-align: true; align: center;">
              <div className="uk-navbar-center">
                <ul className="uk-navbar-nav">
                  <li><Link to="/flower_bouquet">Flower Bouquet</Link></li>
                  <li>
                      <Link to="/headband">Headband</Link>
                      <div className="uk-navbar-dropdown">
                          <ul className="uk-nav uk-navbar-dropdown-nav">
                              <li><Link to="/nylon_headband">Nylon Headband</Link></li>
                              <li><Link to="/lace_headband">Lace Headband</Link></li>
                              <li><Link to="/flower_crown">Flower Crown</Link></li>
                              <li><Link to="/animal_ears">Animal Ears</Link></li>
                          </ul>
                      </div>
                  </li>
                  <li><Link to="/testimonials">Testimonials</Link></li>
                  {this.props.user.isLoggedIn ?
                    <li><Link to="/manage">Manage</Link></li> :
                    null
                  }
                </ul>
              </div>
            </nav>
          </div>

          <div className="container-container">

            <Switch>
            {this.props.user.isLoggedIn ?
              <Route path="/manage">
                <ManagePage></ManagePage>
              </Route> : null
            }

              <Route path="/">
                <Products></Products>
              </Route>
              <Route path="/flower_bouquet">
              </Route>
              <Route path="/nylon_headband">
                <Products></Products>
              </Route>
              <Route path="/lace_headband">
                <Products></Products>
              </Route>
                {/* <Route path="/flower_crown" filterBycategory="flower crown" render={(props) => <Products {...props} ></Products>}/> */}
                {/* <Route path="flower_crown" component={() => <Products filterBycategory={`flower crown`} />} /> */}
                <Route path="/flower_crown" render={(props) => <Products {...props} filterBycategory={`flower crown`} />} />

              <Route path="/animal_ears">
                <Products></Products>
              </Route>
            </Switch>

          </div>
          </Router>
        </div>
      </div>
    );
  }
}


// export default App
function mapStateToProps(state){
  return{
      user : state.users,
      products : state.products
  }
}

function mapDispatchToProps(dispatch){
  return{
      setUser: user => dispatch(setUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
