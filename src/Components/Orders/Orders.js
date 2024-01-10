// src\Components\Orders\Orders.js
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../../redux/actionCreators";

const mapStateToProps = (state) => {
    return {
        orders: state.orders,
        orderLoading: state.orderLoading,
        orderErr: state.orderErr,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: () => dispatch(fetchOrders()),
    };
};

class Orders extends Component {
    componentDidMount() {
        // props cz MapDispatchToProps redux state theke props return kre
        this.props.fetchOrders();
    }
    componentDidUpdate() {
        console.log(this.props);
    }
    render() {
        return (
            <div>
                <p>Orders</p>
            </div>
        );
    }
}

// connect with store
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
