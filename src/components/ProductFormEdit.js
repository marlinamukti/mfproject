import React from 'react'

import ProductForm from './productForm'

class ProductFormEdit extends React.Component{
    componentDidMount(){
        // console.log("masuk sini")
    }

    render(){
        return(
            <div id="modal-product-form" className="uk-modal-full" data-uk-modal>
                <div className="uk-modal-dialog uk-margin-auto-vertical">
                    <button className="uk-modal-close-full uk-close-large" type="button" data-uk-close></button>
                    <div>
                        <ProductForm productid={this.props.productid} productedit={this.props.productedit}></ProductForm>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductFormEdit