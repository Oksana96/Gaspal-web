import getColor from '../helpers/station-color'

const initState = {
    stations: [],
    displayList: true,
    stationSelected: null,
    latitude: null,
    longitude: null
}



const gaspalReducer = (state = initState, action) => {






    if (action.type === 'CHANGE_CARBU') {
        return {
            ...state,
            carbu: action.carbu,
        }
    }

    if (action.type === 'ADD_STATIONS') {
        let validStations = action.addstations.filter(station => {
            return (station.fuels.find(fuel => {
                return fuel.code_name === state.carbu
            }) !== undefined);
        });
        const prices = validStations.map(station => {
            return station.fuels.find(fuel => { return fuel.code_name === state.carbu }).price
        })

        validStations = validStations.map(station => {
            const fuel = station.fuels.find(fuel => { return fuel.code_name === state.carbu })
            return {
                ...station,
                color: getColor(prices, fuel.price), 
                currentFuel: fuel
            }
        })

        validStations.sort(function(a, b) { 
            return a.currentFuel.price- b.currentFuel.price;
            })


        return {
            ...state,
            stations: validStations,
        }
    }

    if (action.type === 'CHANGE_COLUMN') {
        return {
            ...state,
            displayList: action.display
        }
    }

    if (action.type === 'SELECTED_STATION') {
        return {
            ...state,
            stationSelected: action.station
        }

    }

    if (action.type === 'SET_COORDINATES') {
        return {
            ...state,
            latitude: action.latitude,
            longitude: action.longitude

        }
    }





    return state
}

export default gaspalReducer