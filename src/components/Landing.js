import React, { Component } from 'react';
import Tick from '../img/tick.svg';
import iPhone from '../img/iphone-landing.png';
import Autour from '../img/autour.svg';
import Budget from '../img/budjet.svg';
import Carburant from '../img/carburant.png';
import Itineraire from '../img/itinéraire.svg';
import Like from '../img/like.svg';
import List from '../img/list.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import * as geo from '../helpers/mapbox-geocoder';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import axios from 'axios';
import { withTranslation, Trans } from 'react-i18next';
import AppStore from '../img/app-store.svg';



geo.setAccessToken(process.env.REACT_APP_MAPBOX_ACCESS_TOKEN)

const renderSuggestion = suggestion => (
    <div>
        {suggestion.place_name}
    </div>
);

class Landing extends Component {
    state = {
        value: '',
        suggestions: [],
        posts: []
    };

    getSuggestionValue = suggestion => {
        return suggestion.place_name
    };

    getSuggestions = ({ value }) => {
        const params = new Map([
            ["autocomplete", true],
            ["country", 'fr,es,it'],
            ["limit", 3]
        ]);

        clearTimeout(this.delayTimer);
        this.delayTimer = setTimeout(() => {
            geo.geocode('mapbox.places', value, params, (err, geoData) => {
                this.setState({
                    suggestions: geoData.features
                })
            })
        }, 1000); // Will do the ajax stuff after 1000 ms, or 1 s    

    };

    handleClick = (e) => {
        e.preventDefault();
        this.props.history.push('/web-app')
    }

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };


    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionSelected = (event, { suggestion }) => {
        const latitude = suggestion.center[1];
        const longitude = suggestion.center[0];
        this.props.setCoordinates(latitude, longitude)
    }

    componentDidMount() {
        axios.get('https://blog.gaspalapp.com/ghost/api/v0.1/posts/?include=tags&formats=plaintext&client_id=ghost-frontend&client_secret=9609ca3af594')
            .then(res => {
                this.setState({
                    posts: res.data.posts.slice(0, 3)
                })
            })
    }

    render() {
        const { t } = this.props;
        const { suggestions, value } = this.state
        const inputProps = {
            placeholder: t('landing.address'),
            value,
            onChange: this.onChange,
            className: 'form-control mr-sm-2'
        };

        console.log(this.state);

        return (
            <div>
                <div className="container-fluid landing-background">
                    <div className="container h-100">
                        <div className="row h-100 mb-5">
                            <div className="col-md-6 h-100 d-flex flex-column justify-content-center">
                                <h1 className="landing-title">
                                    {t('landing.h1')}
                                </h1>
                                <h2 className="landing-subtitle mt-2">
                                    {t('landing.subtitle')}

                                </h2>
                                <div className="landing-mobile-display">
                                    <div className="d-flex align-items-center mt-3">
                                        <img src={Tick} height="18" alt="" />

                                        <div className="landing-tick">
                                            <Trans i18nKey="landing.tick1">
                                                Disponible en <b>France, Espagne et Italie</b>;
                                            </Trans>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center mt-3">
                                        <img src={Tick} height="18" alt="" />
                                        <div className="landing-tick">
                                            <Trans i18nKey="landing.tick2">
                                                <b>Application mobile:</b> trouvez les stations les moins chères et naviguez vers elles;
                                            </Trans>
                                        </div>

                                    </div>
                                    <div className="d-flex align-items-center mt-3">
                                        <img src={Tick} height="18" alt="" />
                                        <div className="landing-tick">
                                            <Trans i18nKey="landing.tick3">
                                                <b>Application Web:</b> entrez le nom de votre ville dans le champ ci-dessous pour rechercher les stations les moins chères.
                                            </Trans>
                                        </div>
                                    </div>
                                    <div className="landing-search d-flex justify-content-center">
                                        <form class="form-inline my-2 my-lg-0">
                                            <Autosuggest
                                                suggestions={suggestions}
                                                onSuggestionsFetchRequested={this.getSuggestions}
                                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                                getSuggestionValue={this.getSuggestionValue}
                                                renderSuggestion={renderSuggestion}
                                                inputProps={inputProps}
                                                onSuggestionSelected={this.onSuggestionSelected}
                                            />
                                            <NavLink to='/web-app' className="btn btn-outline-light my-2 my-sm-0" onClick={this.handleClick}>
                                                <FontAwesomeIcon icon="search" />
                                            </NavLink>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 h-100 ">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="landing-phone text-center mt-3">
                                                <img src={iPhone} height={450} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 ">
                                            <div className="d-flex justify-content-center mt-3">
                                                <a href="http://apple.co/2vaPN7D" target="_blank"><img className="mt-1" src={AppStore} height="60px" width="160px" alt="download AppStore" /></a>
                                                <a href="https://play.google.com/store/apps/details?id=com.gaspalapp.gaspal&amp;pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1" target="_blank"><img alt="Disponible sur Google Play" src="https://play.google.com/intl/en_us/badges/images/generic/fr_badge_web_generic.png" height="70px" width="180px" /></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

                {/* <div className="container">
                    <div className="row">
                        <h3 className="ml-auto mr-auto mt-5 mb-5 title">{t('landing.news')}</h3>
                    </div>
                    <div className="row">
                        {this.state.posts.map(post => {
                            return (
                                <div className="col-md-4 col-sm-12">
                                    <a className="blog-post" href={("https://blog.gaspalapp.com" + post.url)} target="_blank">
                                        <div className="card" style={{ width: "18rem" }}>
                                            <img className="card-img-top" src={(post.feature_image.includes('https')) ? (post.feature_image) : ("https://blog.gaspalapp.com" + post.feature_image)} alt="Card  cap" />
                                            <div className="card-body">
                                                <p className="card-text blog-text">{post.title}</p>
                                            </div>
                                        </div>

                                    </a>

                                </div>
                            )
                        })}

                    </div>


                </div> */}


                <div id='application-mobile' className="container feature-container">
                    <div className="row mt-5">
                        <div className="col-md-4 mb-2">
                            <div className="d-flex mt-4">
                                <img src={Carburant} height={20} className="mt-1 mr-2" alt="" />
                                <div className="d-flex flex-column">
                                    <div className="feature-title">
                                        {t('landing.feature1')}
                                    </div>
                                    <div className="feature-subtitle">
                                        {t('landing.feature1_sub')}
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="col-md-4 mb-2">
                            <div className="d-flex mt-4">
                                <img src={Autour} height={28} className="mt-1 mr-2" alt="" />
                                <div className="d-flex flex-column">
                                    <div className="feature-title">
                                        {t('landing.feature2')}
                                    </div>
                                    <div className="feature-subtitle">
                                        {t('landing.feature2_sub')}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-2">
                            <div className="d-flex mt-4">
                                <img src={List} height={23} className="mt-1 mr-2" alt="" />
                                <div className="d-flex flex-column">
                                    <div className="feature-title">
                                        {t('landing.feature3')}
                                    </div>
                                    <div className="feature-subtitle">
                                        {t('landing.feature3_sub')}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row mt-5 mb-5">
                        <div className="col-md-4 mb-2">
                            <div className="d-flex mt-4">
                                <img src={Itineraire} height={28} className="mt-1 mr-2" alt="" />
                                <div className="d-flex flex-column">
                                    <div className="feature-title">
                                        {t('landing.feature4')}
                                    </div>
                                    <div className="feature-subtitle">
                                        {t('landing.feature4_sub')}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-2">
                            <div className="d-flex mt-4">
                                <img src={Budget} height={28} className="mt-1 mr-2" alt="" />
                                <div className="d-flex flex-column">
                                    <div className="feature-title">
                                        {t('landing.feature5')}
                                    </div>
                                    <div className="feature-subtitle">
                                        {t('landing.feature5_sub')}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="d-flex mt-4">
                                <img src={Like} height={28} className="mt-1 mr-2" alt="" />
                                <div className="d-flex flex-column">
                                    <div className="feature-title">
                                        {t('landing.feature6')}
                                    </div>
                                    <div className="feature-subtitle">
                                        {t('landing.feature6_sub')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        setCoordinates: (latitude, longitude) => { dispatch({ type: 'SET_COORDINATES', latitude: latitude, longitude: longitude }) }
    }
}

export default connect(null, mapDispatchToProps)(withTranslation()(Landing))