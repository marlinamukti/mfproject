import React from 'react';
import axios from 'axios';

// eslint-disable-next-line 
import { connect } from 'react-redux';
import { setUser } from '../redux/userAction'

const url = 'https://uwa-app1.akae.xyz/auth/login'
class Login extends React.Component{
    

    onClickLogin = () =>{
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
        return(
            <div id="modal-login" className="uk-modal-full" data-uk-modal>
                <div className="uk-modal-dialog uk-margin-auto-vertical">
                    <button className="uk-modal-close-full uk-close-large" type="button" data-uk-close></button>
                    <h2 className="uk-modal-title">Login</h2>
                    <div className="uk-grid-collapse uk-child-width-1-2@s uk-flex-middle" data-uk-grid>
                        <div className="uk-padding-large" data-uk-height-viewport>
                                <input type="text" className="uk-input" placeholder="Username"></input>
                                <input type="password" className="uk-input" placeholder="Password"></input>
                                <button className="uk-button  uk-modal-close" onClick={this.onClickLogin}>Login</button>
                        </div>
                    </div>
                </div>
            </div>    
        )
    }
}

// export default Login
function mapStateToProps(state){
    return{
        user : state.users
    }
}

function mapDispatchToProps(dispatch){
    return{
        setUser: user => dispatch(setUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);