import React, { Component } from 'react';

class Wishlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: this.props.location.query,
            accessable: false
        }

    }
    componentDidMount() {
        if (this.props.location.query !== undefined) {
            if (this.props.location.query.pass === "administer") {
                this.setState({
                    accessable: true
                })
            }
        }
    }
    render() {
        return (
            <div>
                {this.state.accessable ? (
                    <div>
                        <h1>Wishlist</h1>
                        アクセス可能
                        </div>
                ) : (
                        <div>アクセスできません</div>
                    )}
            </div>

        );
    }
}

export default Wishlist;