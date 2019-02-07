import React from 'react';
import Map from './Map';
import List from './List';
import Details from './Details';
import { connect } from 'react-redux'

const WebApp = (props) => {
    return (
        <div className="container-fluid pl-0 pr-0">
            <div className="row no-gutters">
                <div className="col-md-9 col-sm-12">
                    <Map/>
                </div>

                <div className="col-md-3 col-sm-12">
                    {props.displayList ? (
                        <List />
                    ) : (
                            <Details />
                        )}
                </div>
            </div>
        </div>

    )
}


const mapStateToProps = (state) => {
    return {
      displayList: state.displayList
    }
}

export default connect(mapStateToProps)(WebApp)



