import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

// import ProductForm from './productForm';
import ColorPage from './ColorPage';
import ProductView from './ProductView'

class ManagePage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            image:[],
            color:"black",
            displayColorPicker: false,
            imgThumbDisplay: require('../images/mf-icon.png')
        }
    }

    render(){
        return(
            <div>
                <Router>
                    <div className="uk-container uk-text-center manage-menu">
                        <Link to="/manage-color">
                            <span className="uk-label uk-label-success">Color</span>
                        </Link>
                        {/* <Link to="manage-products">
                            <span className="uk-label uk-label-success">Products</span>
                        </Link> */}
                        <Link to="manage-products-view">
                            <span className="uk-label uk-label-success">Product View</span>
                        </Link>
                    </div>
                    
                    <Switch>
                        <Route path="/manage-color">
                            <ColorPage></ColorPage>
                        </Route>
                        {/* <Route path="/manage-products">
                            <ProductForm></ProductForm>
                        </Route> */}
                        <Route path="/manage-products-view">
                            <ProductView></ProductView>
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default ManagePage;