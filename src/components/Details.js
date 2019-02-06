import React from 'react';
import { connect } from 'react-redux'

const Details = (props) => {


    const diesel = props.stationSelected.fuels.find(fuel => { return fuel.code_name === 'diesel' });
    const e95 = props.stationSelected.fuels.find(fuel => { return fuel.code_name === 'unleaded_95' });
    const e98 = props.stationSelected.fuels.find(fuel => { return fuel.code_name === 'unleaded_98' });
    const e85 = props.stationSelected.fuels.find(fuel => { return fuel.code_name === 'ethanol_85' });
    const e10 = props.stationSelected.fuels.find(fuel => { return fuel.code_name === 'ethanol_10' });
    const gpl = props.stationSelected.fuels.find(fuel => { return fuel.code_name === 'gpl' })
    const codeName = props.stationSelected.currentFuel.code_name;

    return (
        <div className="details-container">
            <div className="list-title text-center mt-2">Détails de la station</div>
            <hr />
            <div className="d-flex flex-row align-items-center ml-3 mr-3" >
                <img src={props.stationSelected.brand.logo} width='80px' height="80px" style={{ objectFit: 'contain' }} alt="" />
                <div className="d-flex flex-column ml-3 mr-2">
                    <div className="details-brand-name">{props.stationSelected.brand.name}</div>
                    <div className="details-address">{props.stationSelected.address}, {props.stationSelected.city}</div>
                </div>
            </div>
            <div className="details-info text-center mt-3">Prix de l'essence</div>
            <table className="table ml-2">

                <tbody>
                    <tr>
                        <td>Diesel - B7</td>
                        <td style={ diesel.code_name === codeName ? { color: props.stationSelected.color } : {}} className="font-weight-bold">{diesel.price}</td>
                    </tr>
                    {e95 ? (
                        <tr>
                            <td>Sans plomb 95 - E5</td>
                            <td style={ e95.code_name === codeName ? { color: props.stationSelected.color } : {}} className="font-weight-bold">
                                    {e95.price}
                            </td>
                        </tr>
                    ) : null}
                    {e98 ? (
                        <tr>
                            <td>Sans plomb 98 - E5</td>
                            <td style={ e98.code_name === codeName ? { color: props.stationSelected.color } : {}} className="font-weight-bold">{e98.price}</td>
                        </tr>
                    ) : null}

                    {e85 ? (
                        <tr>
                            <td>Superéthanol - E85</td>
                            <td style={ e85.code_name === codeName ? { color: props.stationSelected.color } : {}} className="font-weight-bold">{e85.price}</td>
                        </tr>
                    ) : null}

                    {e10 ? (
                        <tr>
                            <td>E10</td>
                            <td style={ e10.code_name === codeName ? { color: props.stationSelected.color } : {}} className="font-weight-bold">{e10.price}</td>
                        </tr>
                    ) : null}

                    {gpl ? (
                        <tr>
                            <td>GPL - LGP</td>
                            <td style={ gpl.code_name === codeName ? { color: props.stationSelected.color } : {}} className="font-weight-bold">{gpl.price}</td>
                        </tr>
                    ) : null}
                </tbody>
            </table>

            <div onClick={props.changeColumn} className="details-retour mt-4 text-center">Retourner à la liste des stations</div>


        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        stationSelected: state.stationSelected,
        stations: state.stations

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeColumn: () => { dispatch({ type: 'CHANGE_COLUMN', display: true }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)