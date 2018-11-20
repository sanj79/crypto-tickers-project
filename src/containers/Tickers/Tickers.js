import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Auxiliary from '../../hoc/Auxiliary';
import Table from './Table/Table';
import './Tickers.css';
import axios from 'axios';
import Modal from './../../components/UI/Modal/Modal';


class Tickers extends Component {

    state = {
        tickerdata: [],
        metadata: [],
        start: 1,
        page: 1,
        showModal: false,
        selectedTicker: {}
    }

    componentDidMount() {
        this.getRecords();
        setInterval(this.getRecords, 1000 * 60);
    }

    // Fetch Initial Records
    getRecords = () => {
        axios.get('https://api.coinmarketcap.com/v2/ticker/', {
            params: {
                start: this.state.start > 100 ? this.state.start : null
            }
        }).then(response => {
            this.setState({
                tickerdata: Object.values(response.data.data),
                metadata: response.data.metadata
            });
        });
    };

    // Fetch Records on using Pagination (Next/Previous)
    fetchRecordsByPagination = (direction) => {
        console.log(this.props);
        let page = this.state.page;
        let startFrom = this.state.start;
        if (direction === 'prev') {
            startFrom = startFrom - 100
            page = page - 1;
        } else {
            startFrom = startFrom + 100;
            page = page + 1;
        }
        axios.get('https://api.coinmarketcap.com/v2/ticker/', {
            params: {
                start: startFrom
            }
        }).then(response => {
            this.setState({
                tickerdata: Object.values(response.data.data),
                metadata: response.data.metadata,
                page: page,
                start: startFrom
            });
            this.props.history.push({ pathname: '/crypto' + page })
        });
    }

    sortBy = (parameter) => {
        let data = this.state.tickerdata;
        data.sort((a,b) => (a[parameter] > b[parameter]) ? 1 : ((b[parameter] > a[parameter]) ? -1 : 0));
        localStorage.setItem('Sort By', parameter);
        this.setState({tickerdata: data});
    }

    setModalData = (currentTicker) => {
        this.setState({showModal: true, selectedTicker: currentTicker});        
    }

    modalHandler = () => {
        this.setState({showModal:false})
    }

    render() {
        const table = () => <Table className="clearfix" modal={this.setModalData} sort={this.sortBy} data={this.state.tickerdata} />;
        return (
            <Auxiliary>
                <div className="clearfix metainfo">
                    <p className="stats">Cryptocurrencies: <span className="count">{this.state.metadata.num_cryptocurrencies}</span></p>
                    <p className="stats">Last Updated: <span className="count">{Date(this.state.metadata.timestamp)}</span></p>
                </div>
                <div className="clearfix pagination float-right">
                    {this.state.start > 100 ?
                        (
                            <button className="btn btn-info float-right action-btn" onClick={() => this.fetchRecordsByPagination('prev')} >Previous 100</button>
                        ) : null

                    }
                    <button className="btn btn-success float-right action-btn" onClick={() => this.fetchRecordsByPagination('next')} >Next 100</button>
                </div>
                <Route path="/" exact component={table} />
                <Route path="/tickers/page/:id" exact component={table} />
                {this.state.showModal ? <Modal hideModal={this.modalHandler} data={this.state.selectedTicker} /> : null }                
            </Auxiliary>
        );
    }
}

export default withRouter(Tickers);