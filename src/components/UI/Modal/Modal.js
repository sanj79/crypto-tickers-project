import React from 'react';
import './Modal.css';

const modal = (props) => {

    return (
        <div className="Modal" >
            <div className="Modal-dialog">
                <div className="Modal-content">
                    <h3>{props.data.name}</h3>
                    <hr />
                    <div className="clearfix">
                        <ul className="ticker-list">
                            <li>Symbol: <span className="float-right detail-span">{props.data.symbol}</span></li>
                            <li>Rank: <span className="float-right detail-span">{props.data.rank}</span></li>
                            <li>Circulating Supply: <span className="float-right detail-span">{props.data.circulating_supply || 'NA'}</span></li>
                            <li>Max Supply: <span className="float-right detail-span">{props.data.quotes.USD.max_supply || 'NA'}</span></li>
                            <li>Total Supply: <span className="float-right detail-span">{props.data.total_supply || 'NA'}</span></li>
                            <li>Last Updated: <span className="float-right detail-span">{Date(props.data.last_updated) || 'NA'}</span></li>
                            <li>Market Cap: <span className="float-right detail-span">{props.data.quotes.USD.market_cap || 'NA'}</span></li>
                            <li>Percent Change(1h): <span className="float-right detail-span">{props.data.quotes.USD.percent_change_1h || 'NA'}</span></li>
                            <li>Percent Change(7d): <span className="float-right detail-span">{props.data.quotes.USD.percent_change_7d || 'NA'}</span></li>
                            <li>Percent Change(7d): <span className="float-right detail-span">{props.data.quotes.USD.percent_change_24h || 'NA'}</span></li>
                            <li>Volume(24h): <span className="float-right detail-span">{props.data.quotes.USD.volume_24h || 'NA'}</span></li>
                        </ul>
                    </div>
                    <div >
                        <button className="btn btn-info float-right" onClick={() => props.hideModal()}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default modal;