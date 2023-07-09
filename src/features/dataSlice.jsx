import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        value: {
            data: {
                cache_time: 0,
                data: []
            },
            appData: {
                cache_time: 0,
                data: []
            },
            array: [
                {
                    heading: 'Date',
                    item: 'date',
                    isActive: true,
                    isFilterActive: false,
                    filterRange: [ 'Date', 0, Number.POSITIVE_INFINITY],
                    isFilteredOut: [],
                    id: 'Date'
                },
                {
                    heading: 'App',
                    item: 'app_name',
                    isActive: true,
                    isFilterActive: false,
                    filterRange: [0, Number.POSITIVE_INFINITY],
                    isFilteredOut: [],
                    id: 'App'
                },{
                    heading: 'Ad Requests',
                    item: 'requests',
                    isActive: true,
                    isFilterActive: false,
                    filterRange: [ 'Ad Requests', 0, Number.POSITIVE_INFINITY],
                    isFilteredOut: [],
                    id: 'Ad Requests'
                },{
                    heading: 'Ad Response',
                    item: 'responses',
                    isActive: false,
                    isFilterActive: false,
                    filterRange: ['Ad Response', 0, Number.POSITIVE_INFINITY],
                    isFilteredOut: [],
                    id: 'Ad Response'
                },{
                    heading: 'Impressions',
                    item: 'impressions',
                    isActive: false,
                    isFilterActive: false,
                    filterRange: [ 'Impressions', 0, Number.POSITIVE_INFINITY],
                    isFilteredOut: [],
                    id: 'Impressions'
                },{
                    heading: 'Clicks',
                    item: 'clicks',
                    isActive: true,
                    isFilterActive: false,
                    filterRange: [ 'Clicks', 0, Number.POSITIVE_INFINITY],
                    isFilteredOut: [],
                    id: 'Clicks'
                },
                {
                    heading: 'Revenue',
                    item: 'revenue',
                    isActive: true,
                    isFilterActive: false,
                    filterRange: ['Revenue', 0, Number.POSITIVE_INFINITY],
                    isFilteredOut: [],
                    id: 'Revenue'
                },{
                    heading: 'Fill Rate',
                    item: 'fill_rate',
                    isActive: true,
                    isFilterActive: false,
                    filterRange: ['Fill Rate', 0, Number.POSITIVE_INFINITY],
                    isFilteredOut: [],
                    id: 'Fill Rate'
                },{
                    heading: 'CTR',
                    item: 'ctr',
                    isActive: true,
                    isFilterActive: false,
                    filterRange: ['CTR', 0, Number.POSITIVE_INFINITY],
                    isFilteredOut: [],
                    id: 'CTR'
                },
              ],
            rowsToFilter: [],
        }
    },
    reducers: {
        updateArray: (state, action) => {
            state.value.array = action.payload;
        },
        updateData: (state, action) => {
            state.value.data = action.payload
        },
        updateAppData: (state, action) => {
            state.value.appData = action.payload
        },
        updateFilterState: (state, action) => {
            state.value.array.map((child, i) => {
                if (child.heading === action.payload) {
                    child.isFilterActive = !state.value.array[i].isFilterActive
                } else {
                    child.isFilterActive = false
                }
            })
        },
        updateFilterRange: (state, action) => {
            state.value.array.map(child => {
                if(child.filterRange[0] === action.payload[0]) {
                    return (child.filterRange[1] = action.payload[1], child.filterRange[2] = action.payload[2])
                }
            })
        },
        filterElementOut: (state, action) => {
            state.value.rowsToFilter = []
            state.value.array.map((child, i) => {
                if(child.heading === action.payload.element) {
                    child.isFilteredOut = action.payload.array
                    state.value.rowsToFilter = state.value.rowsToFilter.concat(action.payload.array)
                }
            })
        }
    }
})

export const {updateArray, updateData, updateAppData, updateFilterState, updateFilterRange, filterElementOut} = dataSlice.actions
export default dataSlice.reducer