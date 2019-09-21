import React, { Component } from 'react';

class MarketDetailContainer extends Component {

    render() {

        return (
            <div>
                Market Detail id: {this.props.match.params.id}
            </div>
        )
    }
}

export default MarketDetailContainer;