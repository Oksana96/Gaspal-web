import React from 'react';
import { connect } from 'react-redux'

const List = (props) => {
    const { stations, carbu } = props;

    const chooseStationInList = (station) => {
        props.setSelectedStation(station)  
        props.changeColumn()
    }

    return (
        <div className="list-container">
            <div className="text-center mt-2 mb-2 list-title">Listes des stations</div>
            <hr />

            {stations.map(station => {
                const fuel = station.fuels.find(fuel => { return fuel.code_name === carbu })

                return (
                    <div onClick={() => { chooseStationInList(station) }} className="d-flex justify-content-between mb-2 ml-3 mr-3 list-station" >
                        <div className="d-flex flex-row">
                            <div className="mt-auto mb-auto"><img src={station.brand.logo} width='24px' height="24px" style={{ objectFit: 'contain', backgroundColor: 'white', backgroundSize: '20px 20px' }} alt="" /></div>
                            <div className="d-flex flex-column ml-2">
                                <div className="list-name">{station.brand.name}</div>
                                <div className="list-address">{station.address}</div>
                            </div>
                        </div>

                        <div style={{ color: station.color, fontSize: '18px' }}>{fuel.price}</div>


                    </div>

                )

            })}

        </div>
    )


}


const mapStateToProps = (state) => {
    return {
        stations: state.stations,
        carbu: state.carbu
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeColumn: () => { dispatch({ type: 'CHANGE_COLUMN', display: false }) },
        setSelectedStation: (station) => { dispatch({ type: 'SELECTED_STATION', station: station }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
