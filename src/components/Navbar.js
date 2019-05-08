import React from 'react';
import Logo from '../img/logo.png';
import {NavLink} from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const Navbar = () => {
    const { t } = useTranslation();
    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark navbar-style ">
            <NavLink to= '/' className="navbar-brand" >
              <img src={Logo} width="14%"  className="d-inline-block align-top mr-2" alt=""/>
              Gaspal
            </NavLink>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav ml-auto ">
                    <NavLink to ='/' className="nav-item nav-link ">{t('navbar.home')} <span class="sr-only">(current)</span></NavLink>
                    <NavLink to = '/web-app' className="nav-item nav-link" >{t('navbar.web')}</NavLink>
                    <a className="nav-item nav-link" href="/#application-mobile">{t('navbar.mobile')}</a>
                </div>
            </div>
        </nav>

</div>
    )
}


export default Navbar