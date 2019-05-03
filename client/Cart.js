import React, { Component } from 'react';
import { connect } from 'react-redux';

class Cart extends Component {

    constructor() {
        super();
        this.state = {
            pendingOrder: {}
        }
    }

    findPendingOrder () {
        this.setState({pendingOrder: this.props.orders.find(order => order.status === 'pending')})
    }
    render () {
        return (
            <div>
                {(this.props.orders.status === 'pending') ? <div>Order found - {this.state.pendingOrder.id} </div> : 'No items in your cart'}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders,
        user: state.user
    }
}

export default connect(mapStateToProps)(Cart)
