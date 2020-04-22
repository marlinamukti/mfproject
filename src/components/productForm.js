import React from 'react';
import { connect } from 'react-redux';
// import { fetchThumbDisplay } from '../redux/thumbdisplayAction'
import { fetchColors } from '../redux/colorAction';
import { setThumbdisplay } from '../redux/thumbdisplayAction'
import { addProduct, editProduct, deleteProduct } from '../redux/productAction'
import axios from 'axios';

const imgdefault = require('../images/mf-icon.png')


class ProductForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            imgThumbDisplay: imgdefault,
            productid:"",
            name:"",
            description:"",
            price:"",
            category:"",
            stock:"",
            colors: [],
            categories:["", "Flower Crown", "Nylon Headband", "Flower Bouquet"]
        }
    }

    componentDidMount(){
        this.fetchingColors()
    }

    componentDidUpdate(prevProps){
        if(this.props.productid !== prevProps.productid){
            // console.log('productform', this.props.productedit)
            // console.log(this.props.productedit.colors)
            // let colorvalue = []
            // this.props.productedit.colors.forEach(c => 
            //     colorvalue.push( {value:c} )
            // )
            if(this.props.productid !== ""){
                // console.log('productid',this.props.productid)
                this.setState({
                    productid: this.props.productid,
                    imgThumbDisplay:this.props.productedit.imgurl,
                    name: this.props.productedit.name,
                    description: this.props.productedit.description,
                    price: this.props.productedit.price,
                    category: this.props.productedit.category,
                    stock: this.props.productedit.stock,
                    colors: this.props.productedit.colors
                })
            }
            else{
                this.clearFields()
            }
            // this.props.setThumbdisplay(this.props.productedit.imgurl)
        }
    }

    uploadFile(par){
        let data = new FormData();
        let file = par;
        let url = 'https://uwa-app1.akae.xyz/upload'
    
        data.append('file', file);
        data.append('name', file.name)
        axios.post(url, data, {
          headers: {
            'Authorization' : this.props.user.token
          }
        })
        .then(res => {
            // console.log(res.data)
            // console.log('url',res.data.mediaImage.thumb_url)
            this.props.setThumbdisplay(res.data.mediaImage.thumb_url)
            this.setState({
                imgThumbDisplay: res.data.mediaImage.thumb_url
            })
        })
        .catch(er => console.log(er))
      }

    onPickImage = (event) => {
        // console.log(event.target.files[0])
        let {target} = event
        let newImage = []
        newImage.push(target.files[0])
        // this.setState({
        //   image: newImage
        // })
        
        this.uploadFile(event.target.files[0])
    }

    onChangeName = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    onChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    onChangePrice = (event) => {
        this.setState({
            price: event.target.value
        })
    }

    onChangeCategory = (event) => {
        this.setState({
            category: event.target.value
        })
    }

    onChangeStock = (event) => {
        this.setState({
            stock: event.target.value
        })
    }
    
    fetchingColors(){
        const url = 'https://uwa-app1.akae.xyz/color'
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

    onPickColor = (color) => {
        let colorCopy = [...this.state.colors]
        let index = -1
        index = colorCopy.findIndex(c => c.value === color.value)

        if(index === -1){
            colorCopy.push({value: color.value, name: color.name})
        }
        
        this.setState({
            colors: colorCopy
        })
    }

    onSelectCategory = (event) =>{
        console.log(event.target.value)
        this.setState({
            category: event.target.value
        })
    }

    deleteSelectedColor = (color) => {
        let colorCopy = [...this.state.colors]
        let index = colorCopy.findIndex(c => c.value === color.value)
        colorCopy.splice(index,1)
        this.setState({
            colors: colorCopy
        })
    }

    clearFields(){
        this.setState({
            imgThumbDisplay: imgdefault,
            productid:"",
            name:"",
            description:"",
            price:"",
            category:"",
            stock:"",
            colors: []
        })
    }

    onSaveProduct = () => {
        let url = 'https://uwa-app1.akae.xyz/product'
        
        // console.log(this.state.category)

        let body = {
            name: this.state.name,
            imgurl: this.state.imgThumbDisplay,
            description: this.state.description,
            price: this.state.price,
            category: this.state.category,
            stock: this.state.stock,
            colors: this.state.colors

        }
        let config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `${this.props.user.token}`
            }
        }

        //create new
        if(this.state.productid === ""){
            axios.post(url, body, config)
            .then(response => {
                console.log(response)
                this.props.addProduct(response.data.product)
                this.clearFields()
            })
            .catch(error => console.log(error.response))
        }
        else{ //update data product
            axios.put(`${url}/${this.state.productid}`, body, config)
            .then(response => {
                console.log(response)
                this.props.editProduct(response.data.product)
            })
            .catch(error => console.log(error.response))
        }
        
    }

    onDeleteProduct = () =>{
        let url = 'https://uwa-app1.akae.xyz/product'
        url = `${url}/${this.state.productid}`

        let config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `${this.props.user.token}`
            }
        }

        axios.delete(url, config)
        .then(response => {
            console.log(response)
            this.props.deleteProduct(response.data.product.id)
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
                            <img src={this.state.imgThumbDisplay} alt="" id="img-display-product"></img>
                        </div>

                        <label className="uk-form-label" htmlFor="form-horizontal-text">Image</label>
                        <div className="uk-form-controls">
                            <input type="file" multiple={false} name="productImage" onChange={this.onPickImage}></input>
                        </div>  

                        <br></br>

                        <label className="uk-form-label" htmlFor="form-horizontal-text">Name</label>
                        <div className="uk-form-controls">
                            <input type="text" className="uk-input uk-width-1-2" value={this.state.name}
                            onChange={this.onChangeName}></input>
                        </div>

                        <label className="uk-form-label" htmlFor="form-horizontal-text">Description</label>
                        <div className="uk-form-controls">
                            <input type="text" className="uk-input uk-width-1-2" value={this.state.description}
                            onChange={this.onChangeDesc}></input>
                        </div>
                        
                        <label className="uk-form-label" htmlFor="form-horizontal-text">Price</label>
                        <div className="uk-form-controls">
                            <input type="number" className="uk-input uk-width-1-2" value={this.state.price}
                            onChange={this.onChangePrice}></input>
                        </div>
                        
                        <label className="uk-form-label" htmlFor="form-horizontal-text">Category</label>
                        <div className="uk-form-controls">
                            <select className="uk-select uk-width-1-2"  onChange={this.onSelectCategory} value={this.state.category}>
                                {this.state.categories.map(c => <option key={c}>{c}</option>)}
                            </select>
                            {/* <input type="text" className="uk-input uk-width-1-2" value={this.state.category}
                            onChange={this.onChangeCategory}></input> */}
                        </div>

                        <label className="uk-form-label" htmlFor="form-horizontal-text">Stock</label>
                        <div className="uk-form-controls">
                            <input type="number" className="uk-input uk-width-1-2" value={this.state.stock}
                            onChange={this.onChangeStock}></input>
                        </div>
                        
                        <label className="uk-form-label" htmlFor="form-horizontal-text">Color</label>
                        <div className="uk-form-controls">
                            <div id="divButtonColor" className="uk-grid-small uk-width-1-2" 
                            data-uk-grid>
                                {this.state.colors.map( (c, i) => 
                                    <ColorSelected key={i} colors={c}
                                    deleteSelectedColor={() => this.deleteSelectedColor(c)}
                                    ></ColorSelected>
                                )}
                            </div>
                            <input type="button" className="uk-button uk-button-small" value="Select Color" data-uk-toggle="target: #divSelectColor"></input>
                            <div id="divSelectColor" className="uk-grid-small uk-width-1-2" hidden data-uk-grid>
                                {this.props.colors.map( color => 
                                    <ColorItem key={color.id} 
                                        colors={color}
                                        onPickColor={() => this.onPickColor(color)}
                                    ></ColorItem>
                                )}
                                
                            </div>
                        </div>
                        {this.state.productid === "" ? 
                            <button className="uk-button uk-button-primary" onClick={this.onSaveProduct}>Save</button> :
                            <div>
                                <button className="uk-button uk-button-secondary uk-modal-close" onClick={this.onSaveProduct}>Update</button>
                                <button className="uk-button uk-button-danger uk-modal-close" onClick={this.onDeleteProduct}>Delete This Product</button>
                            </div>}
                    </div>
                </div>
            </div>
        )
    }
}


class ColorItem extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            style_container: {
                display: "table-cell",
                verticalAlign: "middle",
                cursor: "pointer"
            }
        }
    }
    stylingColor = () => {
        this.setState({
            style_container: {
                display: "table-cell",
                verticalAlign: "middle",
                cursor: "pointer",
                color: this.props.colors.value
            }
        })
    }

    stylingLeave = () => {
        this.setState({
            style_container: {
                display: "table-cell",
                verticalAlign: "middle",
                cursor: "pointer"
            }
        })
    }
    render(){
        let {colors} = this.props

        let style_color = {
            backgroundColor: colors.value,
            width: "20px",
            height: "20px",
            float: "left",
            display: "inline-block"
        }
        let style_colorname = {
            display: "inline-block",
            marginLeft: "10px",
            fontSize: "10pt",
            verticalAlign: "top"
        }
        return(
            <div className="uk-width-1-3@m">
                <div className="uk-card uk-card-default">
                    <div style={this.state.style_container}
                    data-uk-tooltip={`Select this color: ${colors.name}`}
                    onMouseOver={this.stylingColor}
                    onMouseLeave={this.stylingLeave}
                    onClick={this.props.onPickColor}
                    >
                        <div style={style_color}></div>
                        <div style={style_colorname}>{colors.name}</div>
                    </div>
                </div>
            </div>
        )
    }
}


class ColorSelected extends React.Component{
    constructor(props){
        super(props)
        this.state={
            style: {
                backgroundColor:this.props.colors.value, 
                width: "20px", 
                height:"20px"
            },
            delbutton:""
        }
    }
    showColor = () => {
        this.setState({
            style: {
                backgroundColor:this.props.colors.value, 
                width: "20px", 
                height:"20px"
            },
            delbutton:""
        })
    }

    hideColor = () => {
        this.setState({
            style: {
                backgroundColor:"black",
                color: "red",
                width: "20px", 
                height:"20px",
                textAlign:"center",
                verticalAlign:"middle",
                fontSize:"9pt",
                cursor: "pointer"
            },
            delbutton:"❌"
        })
    }
    render(){
        let {colors} = this.props
        return(
            <div className="uk-card uk-width-1-6@m">
                <div style={{width:"auto", height:"auto"}}
                onMouseOver={this.hideColor}
                onMouseLeave={this.showColor}>
                    <div style={this.state.style}
                    data-uk-tooltip={colors.name}
                    onClick = {this.props.deleteSelectedColor}>
                        {this.state.delbutton}
                    </div>
                </div>
                
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        imgThumbDisplay: state.imgThumbDisplay,
        user : state.users,
        colors : state.colors,
        product: state.products
    }
}

function mapDispatchToProps(dispatch){
    return{
        fetchColors: colors => dispatch(fetchColors(colors)),
        setThumbdisplay: thumbdisplay => dispatch(setThumbdisplay(thumbdisplay)),
        addProduct: products => dispatch(addProduct(products)),
        editProduct: products => dispatch(editProduct(products)),
        deleteProduct: productid => dispatch(deleteProduct(productid))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);