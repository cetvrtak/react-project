import logo from './logo.svg';
import './App.css';

import {useState, useEffect} from "react";
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


function App() {
    const [rowData, setRowData] = useState();
    const [loading, setLoading] = useState(true);

    const [columnDefs, setColumnDefs] = useState([
        {field: 'symbol', sortable: true},
        {field: 'priceChange'},
        {field: 'priceChangePercent'},
        {field: 'weightedAvgPrice'},
        {field: 'prevClosePrice'},
        {field: 'lastPrice'},
        {field: 'lastQty'},
        {field: 'bidPrice'},
        {field: 'bidQty'},
        {field: 'askPrice'},
        {field: 'askQty'},
        {field: 'openPrice'},
        {field: 'highPrice'},
        {field: 'lowPrice'},
        {field: 'volume'},
        {field: 'quoteVolume'},
        {field: 'openTime'},
        {field: 'closeTime'},
        {field: 'firstId'},
        {field: 'lastId'},
        {field: 'count'},
    ]);

    useEffect(() => {
        setLoading(true);
        fetch('https://data.binance.com/api/v3/ticker/24hr')
            .then(result => result.json())
            .then(rowData => {
                setRowData(rowData);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="App">
            <div className="ag-theme-alpine" style={{height: 500}}>
                {loading ? (
                    <div className="loading-animation">
                        <div className="loader"></div>
                        Loading data...
                    </div>
                ) : rowData.length > 0 ? ( // Check if rowData is not empty
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        paginationAutoPageSize={true}
                        pagination={true}
                    />
                ) : (
                    <div>No data available.</div>
                )}
            </div>
        </div>
    );
}

export default App;
