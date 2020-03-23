import React from 'react'

class Products extends React.Component{
    render(){
        return(
            <div className="uk-flex uk-flex-center">
                <div className="uk-card uk-card-default uk-card-body">
                <img src={require('../images/mf-icon.png')} width="200" height="200" alt=""></img>
                </div>
                <div className="uk-card uk-card-default uk-card-body uk-margin-left">
                <img src={require('../images/mf-icon.png')} width="200" height="200" alt=""></img>
                </div>
                <div className="uk-card uk-card-default uk-card-body uk-margin-left">
                <img src={require('../images/mf-icon.png')} width="200" height="200" alt=""></img>
                </div>
            </div>
        )
    }
}

export default Products