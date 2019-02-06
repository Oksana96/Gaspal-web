import React, { Component } from 'react';
import Background from '../img/background.svg';
import BackgroundFeatures from '../img/road-transp.svg';
import iphoneFeature from '../img/phone-feature.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import * as geo from '../helpers/mapbox-geocoder';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import axios from 'axios';


geo.setAccessToken(process.env.REACT_APP_MAPBOX_ACCESS_TOKEN)

const renderSuggestion = suggestion => (
    <div>
        {suggestion.place_name}
    </div>
);

const backgroundStyle = {
    backgroundImage: `url(${Background})`,
    height: '90vh',
    width: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative'
}

const backgroundFeatures = {
    backgroundImage: `url(${BackgroundFeatures})`,
    backgroundPosition: 'left bottom',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    position: 'relative'

}

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
            ["country", 'fr,es'],
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
        const { suggestions, value } = this.state
        const inputProps = {
            placeholder: 'Adresse',
            value,
            onChange: this.onChange,
            className: 'form-control mr-sm-2'
        };

        console.log(this.state);

        return (
            <div>
                <div className="container-fluid" style={backgroundStyle}>
                    <div className="container h-100">
                        <div className="row h-100">
                            <div className="col-md-6 h-100 d-flex flex-column justify-content-center">
                                <h1 className="landing-title">
                                    Economisez votre argent avec Gaspal
                        </h1>
                                <h2 className="landing-subtitle mt-2">
                                    Trouvez les stations-service les moins chères autour de vous.
                         </h2>
                                <div className="landing-search mt-4">
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
                            <div className="col-md-6 h-100 justify-content-center align-items-center d-flex flex-column ">
                                <div className="landing-phone">
                                    
                         </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="container">
                    <div className="row">
                        <h3 className="ml-auto mr-auto mt-5 mb-5 title">Nos nouvelles</h3>
                    </div>
                    <div className="row">
                        {this.state.posts.map(post => {
                            return (
                                <div className="col-md-4 col-sm-12">
                                    <a  className = "blog-post" href={"https://blog.gaspalapp.com" + post.url}>
                                        <div className="card" style={{ width: "18rem" }}>
                                            <img className="card-img-top" src={"https://blog.gaspalapp.com" + post.feature_image} alt="Card  cap" />
                                            <div className="card-body">
                                                <p className="card-text blog-text">{post.title}</p>
                                            </div>
                                        </div>

                                    </a>

                                </div>
                            )
                        })}

                    </div>


                </div>











                <div id= 'application-mobile' className="container-fluid">
                    <div className="row">
                        <h3 className="ml-auto mr-auto mt-5 mb-1 title">Application mobile</h3>
                    </div>
                    <div style={backgroundFeatures} className="row mt-5">
                        <div className="col-md-1"></div>


                        <div className="col-md-5 d-flex justify-content-between flex-column pl-5">
                            <div>
                                <div className="feature-title mt-4">
                                    Choisissez votre type de carburant
                                </div>
                                <div className="feature-subtitle">
                                    Gaspal permet de voir le prix du diesel, sans plomb 95, sans plomb 98, E85, E10 ainsi que GPL.
                                </div>
                            </div>

                            <div>
                                <div className="feature-iphone mt-4">
                                    <img src={iphoneFeature} alt="" />
                                </div>
                            </div>

                        </div>
                        <div className="col-md-1"></div>

                        <div className="col-md-5 d-flex justify-content-between flex-column pr-5" >

                            <div>
                                <div className="feature-title mt-4">
                                    Trouvez la station d’essence la moins chère à côté de vous
                            </div>
                                <div className="feature-subtitle">
                                    Gaspal permet de voir le prix du diesel, sans plomb 95, sans plomb 98, E85, E10 ainsi que GPL.
                            </div>
                            </div>



                            <div>
                                <div className="feature-title mt-4">
                                    Choisissez la répresentation des stations la plus comfortable
        </div>
                                <div className="feature-subtitle">
                                    Les stations sont réprésentées soit sur une carte, soit sous forme d’une liste.
        </div>
                            </div>
                            <div>
                                <div className="feature-title mt-4">
                                    Faites un itinéraire jusqu’à la station choisie
        </div>
                                <div className="feature-subtitle">
                                    Les stations sont réprésentées soit sur une carte, soit sous forme d’une liste.
        </div>
                            </div>
                            <div className="mb-5">
                                <div className="feature-title mt-4">
                                    Consultez vos dépense
        </div>
                                <div className="feature-subtitle">
                                    L’argent que vous avez dépensé peut être ajout dans notre outil de suivi budgétaire afin de vous aider à gérer votre budget.
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

export default connect(null, mapDispatchToProps)(Landing)