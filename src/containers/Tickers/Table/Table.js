import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import './Table.css';

const table = (props) => {

    const tickerdata = props.data.map(ticker => {
        return (
            <tr key={ticker.id}>
                <td>{ticker.rank}</td>
                <td className="tickername" onClick={() => props.modal(ticker)}>{ticker.name}</td>
                <td>{ticker.symbol}</td>
                <td>{ticker.circulating_supply || 'N/A'}</td>
                <td>{ticker.total_supply || 'N/A'}</td>
                <td>{ticker.max_supply || 'N/A'}</td>
            </tr>
        )
    });

    return (
        <Auxiliary>
            <div className="table-responsive">
                <table id="example" className="table table-bordered dark">
                    <thead className="thead-light">
                        <tr>
                            <th onClick={() => props.sort('rank')}>Rank</th>
                            <th onClick={() => props.sort('name')}>Name</th>
                            <th onClick={() => props.sort('symbol')}>Symbol</th>
                            <th onClick={() => props.sort('circulating_supply')}>Circulating Supply ($)</th>
                            <th onClick={() => props.sort('total_supply')}>Total Supply ($)</th>
                            <th onClick={() => props.sort('max_supply')}>Max Supply ($)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickerdata}
                    </tbody>
                </table>
            </div>            
        </Auxiliary>
    );
}

export default table;