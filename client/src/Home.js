import React, { Component } from 'react';
//import { BrowserRouter, Route, Link } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userdata: []
        }
    }
    componentDidMount() {
        fetch('/userdata')
            .then(res => res.json())
            .then(data => this.setState({ userdata: data }))
    }
    render() {
        return (
            <div>
                <h1>Home page!</h1>

                <div>{this.state.userdata.username}</div>
                <div>{this.state.userdata.userId}</div>
                <div>{this.state.userdata.displayName}</div>
                <div>{this.state.userdata.picture}</div>
                <div>{this.state.userdata.worktime}</div>
                <div>{this.state.userdata.administer}</div>
            </div>
        );
    }
}

export default Home;