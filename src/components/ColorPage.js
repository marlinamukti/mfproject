import React from 'react';
import reactCSS from 'reactcss';
import { connect } from 'react-redux';
import { SketchPicker } from 'react-color';
import { fetchColors } from '../redux/colorAction';
import axios from 'axios';

const url = 'https://uwa-app1.akae.xyz/color'

class ColorPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            image:[],
            colorId: "",
            colorValue:"black",
            colorName:"",
            editmode: false,
            displayColorPicker: false,
            imgThumbDisplay: require('../images/mf-icon.png')
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
            let colors = response.data.colors.sort((a, b) => {
                if (a.value < b.value) { return -1; }
                if (a.value > b.value) { return 1; }
                return 0;
            })
            this.props.fetchColors(colors)
        })
        .catch(error => console.log(error.response))
    }

    showColorPicker = () =>{
        this.setState({
            displayColorPicker: !this.state.displayColorPicker
        })
    }

    closeColorPicker = () => {
        this.setState({ 
            displayColorPicker: false 
        })
    }

    handleChangeColor = (color) => {
        this.setState({ 
            colorValue: color.hex
        })
        // console.log(this.state.colorValue)
    };

    onChangeColorname = (event) => {
        this.setState({
            colorName: event.target.value
        })
    }

    onSaveColor = () => {
        let body = {
            name: this.state.colorName,
            value: this.state.colorValue
        }
        let config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `${this.props.user.token}`
            }
        }

        if(this.state.editmode){
            // console.log(this.props.user.token)
            axios.put(`${url}/${this.state.colorId}`, body, config)
            .then(response => {
                this.fetchingColors()
                this.onClearField()
            })
            .catch(error => console.log(error.response))
        }
        else{
            axios.post(url, body, config)
            .then(response => {
                this.fetchingColors()
                this.onClearField()
            })
            .catch(error => console.log(error.response))
        }
    }

    onClickColor = (color) => {
        this.setState({
            colorId: color.id,
            colorName: color.name,
            colorValue: color.value,
            editmode: true
        })
    }

    onDeleteColor = (color) => {
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `${this.props.user.token}`
            }
        }

        axios.delete(`${url}/${color.id}`, config)
        .then(response => {
            this.fetchingColors()
        })
        .catch(error => console.log(error.response))
    }

    onClearField = () => {
        this.setState({
            colorId: "",
            colorName: "",
            colorValue: "black",
            editmode: false
        })
    }

    render(){
        const styles = reactCSS({
        'default': {
            color: {
                width: '36px',
                height: '14px',
                borderRadius: '2px',
                // background: `rgba(${ this.state.colorValue.r }, ${ this.state.colorValue.g }, ${ this.state.colorValue.b }, ${ this.state.colorValue.a })`,
                background: this.state.colorValue
            },
            swatch: {
                padding: '5px',
                background: 'gray',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'table-cell',
                cursor: 'pointer'
            },
            popover: {
                position: 'absolute',
                zIndex: '2'
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
        }})
        return(
            <div className="container-color-page">

                <div className="uk-flex uk-flex-middle">
                    <div className="uk-card uk-card-default uk-card-body">
                        <div className="container-color-form" data-uk-parallax="border-color: red">
                            <div className="container-form2">
                                <span>
                                    <h3>Color</h3>
                                </span>
                                <div id="choose-color-line">
                                <span className="display-table-cell">Choose Color</span>&nbsp;&nbsp;&nbsp;
                                <div style={ styles.swatch } onClick={ this.showColorPicker }>
                                    <div style={ styles.color } />
                                </div>
                                </div>
                                {this.state.displayColorPicker ? <div style={ styles.popover }>
                                    <div style={ styles.cover } onClick={ this.closeColorPicker }/>
                                    <SketchPicker color={ this.state.colorValue } onChange={ this.handleChangeColor } />
                                    </div>: null
                                }
                                <label>Name
                                <input type="text" className="uk-input" value={this.state.colorName} onChange={this.onChangeColorname}></input>
                                </label>
                                <button className="uk-button uk-button-primary uk-button-small" onClick={() => this.onSaveColor()}>
                                    {this.state.editmode ? "Update" : "Save"}
                                </button>
                                {this.state.editmode ? 
                                    <button className="uk-button uk-button-secondary uk-button-small" onClick={() => this.onClearField()}>
                                        <span role="img" aria-label="cross mark">❌</span>
                                    </button> : null
                                }
                                
                            </div>
                        </div>
                    </div>
                    <div className="uk-card uk-card-default uk-card-body uk-margin-left">
                        <div className="container-color-list">
                            <span>
                                <h3>Color List</h3>
                            </span>
                            <div className="uk-grid-small uk-child-width-1-5@s uk-flex-center uk-text-center" data-uk-grid>
                                {this.props.colors.map( color => 
                                    <ColorItem key={color.id} 
                                        colors={color}
                                        onClikColor={() => this.onClickColor(color)}
                                        onDeleteColor={() => this.onDeleteColor(color)}
                                    ></ColorItem>
                                )}
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}

class ColorItem extends React.Component{
    render(){
        const {colors} = this.props
        let bgcolor = {
            backgroundColor : colors.value
        }
        return(
            <div data-uk-toggle={"target: #my-id-"+colors.id+"; mode: hover"}>
                <div className="uk-card uk-card-default color-card-container">
                    <div className="color-card-pallete" style={bgcolor} 
                    onClick={this.props.onClikColor}
                    data-uk-tooltip="Edit this color"></div>
                    <span>{colors.name}</span>
                    <div>
                        <button className="button-nina-9" id={`my-id-${colors.id}`} hidden
                        onClick={this.props.onDeleteColor} data-uk-tooltip="Delete this color">delete</button>
                    </div>
                </div>
            </div>
        )
    }
}

// export default ColorPage;

function mapStateToProps(state){
    return{
        user : state.users,
        colors : state.colors
    }
  }
  
  function mapDispatchToProps(dispatch){
    return{
        fetchColors: colors => dispatch(fetchColors(colors))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ColorPage);

