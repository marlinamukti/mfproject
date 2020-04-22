import React from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import { fetchProduct } from '../redux/productAction'

import ProductFormEdit from './ProductFormEdit'

class Products extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            products:[],
            productid:"",
            product:null
        }
    }

    componentDidMount(){
        this.fetchingProducts()
    }

    fetchingProducts(){
        let url = 'https://uwa-app1.akae.xyz/product'
        let config = {
            headers: {
                'Content-Type' : 'application/json',
                // 'Authorization' : `${this.props.user.token}`
            }
        }

        Axios.get(url, config)
        .then(response => {
            // console.log(response.data)
            this.props.fetchProduct(response.data.products)
        })
    }

    getproductid = (id, product) => {
        // console.log('getproductid', product)
        this.setState({
            productid: id,
            product: product
        })
    }

    renderAddProduct(){
        if(this.props.user.isLoggedIn){
            return(
                <button className="uk-button uk-button-small" data-uk-toggle={`target: #modal-product-form`} onClick={() => this.getproductid("", {})}>Add Product</button>
            )
        }
    }

    renderProduct(products){
        let category = this.props.filterBycategory
        console.log('products', this.props.filterBycategory)
        if(category !== "" && category !== undefined){
            products = products.filter(p => {
    
                return p.category.toLowerCase().includes(category)
            })
        }
        console.log(products)
        return(
            <React.Fragment>
                <ProductFormEdit productid={this.state.productid} productedit={this.state.product}></ProductFormEdit>
                <div>{this.renderAddProduct()}</div>
                <div className="uk-card uk-card-default uk-card-body">
                    <div className="uk-grid-small uk-child-width-1-3@s uk-flex-center uk-text-center" data-uk-grid>
                        {products.map(p => <ProductItem key={p.id} product={p} onGetProductId={this.getproductid} user={this.props.user}></ProductItem>)}
                    </div>
                </div>
            </React.Fragment>
        )
    }

    render(){
        return(
            // <div>
            //     <ProductFormEdit productid={this.state.productid} productedit={this.state.product}></ProductFormEdit>
            //     <div>{this.renderAddProduct()}</div>
            //     <div className="uk-card uk-card-default uk-card-body">
            //         <div className="uk-grid-small uk-child-width-1-3@s uk-flex-center uk-text-center" data-uk-grid>
            //             {this.props.products.map(p => <ProductItem key={p.id} product={p} onGetProductId={this.getproductid} user={this.props.user}></ProductItem>)}
            //         </div>
            //     </div>
            // </div>
            <div>
                {this.renderProduct(this.props.products)}
            </div>
            
        )
    }
}

class ProductItem extends React.Component{
    renderImage(){
        const { product } = this.props
        let styleImg = {
            width:"200px",
            margin:"auto",
            display:"block"
        }
        if(this.props.user.isLoggedIn){
            return(
                <img src={product.imgurl} style={styleImg} alt="" data-uk-tooltip={product.name}
                onClick={()=> {
                    this.props.onGetProductId(product.id, product)
                }}
                data-uk-toggle={`target: #modal-product-form`}></img>
            )
        }
        else{
            return(
                <img src={product.imgurl} style={styleImg} alt="" data-uk-tooltip={product.name}></img>
            )
        }
    }

    render(){
        // const { product } = this.props
        // let styleImg = {
        //     width:"200px",
        //     margin:"auto",
        //     display:"block"
        // }
        return(
            <div className="uk-card uk-card-default product-card-container">
                {/* <img src={product.imgurl} style={styleImg} alt="" data-uk-tooltip={product.name}
                onClick={()=> {
                    this.props.onGetProductId(product.id, product)
                }}
                data-uk-toggle={`target: #modal-product-form`}></img> */}
                {this.renderImage()}
            </div>
        )
    }
}

// export default Products
function mapStateToProps(state){
    return{
        user : state.users,
        products: state.products
    }
  }
  
  function mapDispatchToProps(dispatch){
    return{
        fetchProduct: product => dispatch(fetchProduct(product))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Products);