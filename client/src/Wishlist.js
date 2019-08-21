import React, { Component } from 'react';

class Wishlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: this.props.location.query,
            accessable: false,
            memberlist: [],
            allshiftdata: []
        }

    }
    componentDidMount() {
        //アクセス判定
        if (this.props.location.query !== undefined) {
            if (this.props.location.query.pass === "administer") {
                this.setState({
                    accessable: true
                })
                //全ユーザー取得
                fetch('/testmemberlist')
                    //fetch('/memberlist')
                    .then(res => res.json())
                    .then(list => {
                        this.setState({ memberlist: list })
                        //全シフト情報取得
                        fetch('/testallshiftdata')
                            //fetch('/allshiftdata')
                            .then(res => res.json())
                            .then(data => this.setState({ allshiftdata: data }))
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