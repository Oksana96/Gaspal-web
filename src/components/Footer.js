import React from 'react';
import AppStore from '../img/app-store.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Footer = () => {
    return (
        <footer className="container-fluid">
            <div className="row text-center">
                <div className="col-md-6 col-xs-12">
                    <p className="text-footer">Téléchargez maintenant</p>
                    <div id="images">
                        <a href="http://apple.co/2vaPN7D"><img className="center" src={AppStore} height="60px" width="160px" alt ="download AppStore"/></a>
                            <a href="https://play.google.com/store/apps/details?id=com.gaspalapp.gaspal&amp;pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"><img className="center" alt="Disponible sur Google Play" src="https://play.google.com/intl/en_us/badges/images/generic/fr_badge_web_generic.png" height="70px" width="180px"/></a>
						</div>
						</div>
                        <div className="col-md-6 col-xs-12">
                            <p className="text-footer">Contactez-nous !</p>
                            <a className="white-link" href="https://www.facebook.com/gaspalFR/"><FontAwesomeIcon icon={['fab',"facebook-f"]} />
                            </a>
                            <a className="white-link" href="https://twitter.com/gaspalfr"><FontAwesomeIcon icon={['fab', "twitter"]} />
                            </a>
                            <a className="white-link" href="https://www.instagram.com/gaspalfr/"><FontAwesomeIcon icon={['fab', "instagram"]} />
                            </a>
                            
                            <a className="white-link" href="mailto:gaspalfr@gmail.com"><FontAwesomeIcon icon="envelope" />
                            </a>
                            <a className="white-link" href="https://blog.gaspalapp.com/"> Blog </a>
                        </div>
                    </div>
			</footer>

                )
            
            }
            
export default Footer