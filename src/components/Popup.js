import React, { Component } from 'react';
import { connect } from 'react-redux'

class Popup extends Component {

    handleClick = (code) => {
        this.props.changeCarburant(code);
        this.props.closePopup()
    }



    render() {
        return (
            <div className='popup'>
                <div className='popup_inner text-center'>
                    <p className='popup-title mt-3'>Choisissez votre type de carburant</p>
                    <div className="popup-carburant text-center">
                        <button type="button" className = "popup-btn mb-3 bth" onClick={() => {this.handleClick('diesel')}}>Diesel</button> <br/>
                        <button type="button" className = "popup-btn mb-3 bth" onClick={() => {this.handleClick('unleaded_95')}}>SP95</button> <br/>
                        <button type="button" className = "popup-btn mb-3 bth" onClick={() => {this.handleClick('unleaded_98')}}>SP98</button> <br/>
                        <button type="button" className = "popup-btn mb-3 bth" onClick={() => {this.handleClick('ethanol_10')}}>Bioethanol E10</button><br/>
                        <button type="button" className = "popup-btn mb-3 bth" onClick={() => {this.handleClick('ethanol_85')}}>E85</button><br/>
                        <button type="button" className = "popup-btn mb-4 bth" onClick={() => {this.handleClick('gpl')}}>GPL</button><br/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeCarburant: (carbu) => { dispatch({ type: 'CHANGE_CARBU', carbu: carbu }) }
    }
}

export default connect(null, mapDispatchToProps)(Popup)