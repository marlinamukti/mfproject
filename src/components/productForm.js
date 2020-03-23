import React from 'react';
import { connect } from 'react-redux';
// import { fetchThumbDisplay } from '../redux/thumbdisplayAction'
import { fetchColors } from '../redux/colorAction';
import axios from 'axios';

const url = 'https://uwa-app1.akae.xyz/color'

class ProductForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    componentDidMount(){
        this.fetchingColors()
    }

    fetchingColors(){
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `${this.props.user.token}`
            }
        }

        axios.get(url, config)
        .then(response => {
            // console.log(response.data.colors)
            // console.log(response.data)
            this.props.fetchColors(response.data.colors)
        })
        .catch(error => console.log(error.response))
    }

    render(){
        return(
            <div className="uk-flex uk-flex-center">
                <div className="container-product-form">
                    <div className="container-form2">
                        <span>
                        <h3>Product</h3>
                        </span>
                        
                        <div className="container-display-img">
                            <img src={this.props.imgThumbDisplay} width="100" height="100" alt="" id="img-display-product"></img>
                        </div>

                        <label className="uk-form-label" htmlFor="form-horizontal-text">Image</label>
                        <div className="uk-form-controls">
                            <input type="file" multiple={false} name="productImage" onChange={this.onPickImage}></input>
                        </div>  

                        <br></br>

                        <label className="uk-form-label" htmlFor="form-horizontal-text">Name</label>
                        <div className="uk-form-controls">
                            <input type="text" className="uk-input uk-width-1-2"></input>
                        </div>

                        <label className="uk-form-label" htmlFor="form-horizontal-text">Description</label>
                        <div className="uk-form-controls">
                            <input type="text" className="uk-input uk-width-1-2"></input>
                        </div>
                        
                        <label className="uk-form-label" htmlFor="form-horizontal-text">Price</label>
                        <div className="uk-form-controls">
                            <input type="number" className="uk-input uk-width-1-2"></input>
                        </div>
                        
                        <label className="uk-form-label" htmlFor="form-horizontal-text">Category</label>
                        <div className="uk-form-controls">
                            <input type="text" className="uk-input uk-width-1-2"></input>
                        </div>

                        <label className="uk-form-label" htmlFor="form-horizontal-text">Stock</label>
                        <div className="uk-form-controls">
                            <input type="number" className="uk-input uk-width-1-2"></input>
                        </div>
                        
                        <label className="uk-form-label" htmlFor="form-horizontal-text">Color</label>
                        <div className="uk-form-controls">
                            {/* <input type="number" className="uk-input uk-width-1-2"></input> */}
                            <input type="button" className="uk-button uk-width-1-2" data-uk-toggle="target: #divSelectColor"></input>
                            <div id="divSelectColor" className="uk-grid-small uk-child-width-1-3@s uk-flex-left" hidden>
                                {this.props.colors.map( color => 
                                    <ColorItem key={color.id} 
                                        colors={color}
                                    ></ColorItem>
                                )}
                            </div>
                        </div>
                        <button className="uk-button uk-button-primary" onClick={this.onSaveProduct}>Save</button>
                    </div>
                </div>
            </div>
        )
    }
}


class ColorItem extends React.Component{
    render(){
        let {colors} = this.props
        let style = {
            backgroundColor: colors.value,
            width: "20px",
            height: "20px",
            float: "left"
        }
        return(
            <div className="uk-width-auto@m">
                <div className="uk-card uk-card-default">
                    <div style={style}></div>
                    <span style={{width:"100px"}}>{colors.name}</span>
                </div>
            </div>
        )
    }
}
// export default ProductForm;

function mapStateToProps(state){
    return{
        imgThumbDisplay: state.imgThumbDisplay,
        user : state.users,
        colors : state.colors
    }
}

function mapDispatchToProps(dispatch){
    return{
        fetchColors: colors => dispatch(fetchColors(colors))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);