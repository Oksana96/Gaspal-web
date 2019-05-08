import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

class Popup extends Component {

    handleClick = (code) => {
        this.props.changeCarburant(code);
        this.props.closePopup()
    }



    render() {
        const { t } = this.props;
        return (
            <div className='popup'>
                <div className='popup_inner text-center'>
                    <p className='popup-title mt-3'>{t('popup.type')}</p>
                    <div className="popup-carburant text-center">
                        <button type="button" className = "popup-btn mb-3 bth" onClick={() => {this.handleClick('diesel')}}>{t('popup.diesel')}</button> <br/>
                        <button type="button" className = "popup-btn mb-3 bth" onClick={() => {this.handleClick('unleaded_95')}}>{t('popup.SP95')}</button> <br/>
                        <button type="button" className = "popup-btn mb-3 bth" onClick={() => {this.handleClick('unleaded_98')}}>{t('popup.SP98')}</button> <br/>
                        <button type="button" className = "popup-btn mb-3 bth" onClick={() => {this.handleClick('ethanol_10')}}>{t('popup.E10')}</button><br/>
                        <button type="button" className = "popup-btn mb-3 bth" onClick={() => {this.handleClick('ethanol_85')}}>{t('popup.E85')}</button><br/>
                        <button type="button" className = "popup-btn mb-4 bth" onClick={() => {this.handleClick('gpl')}}>{t('popup.GPL')}</button><br/>
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

export default connect(null, mapDispatchToProps)(withTranslation()(Popup))