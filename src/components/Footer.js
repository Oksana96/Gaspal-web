import React from 'react';
import AppStore from '../img/app-store.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    return (
        <footer className="container-fluid">
            <div className="row text-center">
                <div className="col-md-4 col-xs-12">
                    <p className="text-footer">{t('footer.download')}</p>
                    <a className="white-link" href="http://apple.co/2vaPN7D" target="_blank"><FontAwesomeIcon icon={['fab', "apple"]} />
                    </a>
                    <a className="white-link" href="https://play.google.com/store/apps/details?id=com.gaspalapp.gaspal&amp;pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1" target="_blank"><FontAwesomeIcon icon={['fab', "android"]} />
                    </a>
                </div>
                <div className="col-md-4 d-flex align-items-center justify-content-center">
                    <div>support@gaspalapp.com</div>
                </div>
                <div className="col-md-4 col-xs-12">
                    <p className="text-footer">{t('footer.contact')}</p>
                    <a className="white-link" href="https://www.facebook.com/gaspalFR/" target="_blank"><FontAwesomeIcon icon={['fab', "facebook-f"]} />
                    </a>
                    <a className="white-link" href="https://twitter.com/gaspalfr" target="_blank"><FontAwesomeIcon icon={['fab', "twitter"]} />
                    </a>
                    <a className="white-link" href="https://www.instagram.com/gaspalfr/" target="_blank"><FontAwesomeIcon icon={['fab', "instagram"]} />
                    </a>
                    <a className="white-link" href="https://blog.gaspalapp.com/" target="_blank"> Blog </a>
                </div>
            </div>
        </footer>

    )

}

export default Footer