// Network 게시글 컨테이너 컴포넌트

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