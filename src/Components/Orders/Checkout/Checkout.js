// src\Components\Orders\Checkout\Checkout.js
import React, { Component } from "react";
import { Button } from "reactstrap";
// import { HistoryRouterProps as history } from "react-router-dom";
import { connect } from "react-redux";

// axios will be used to upload to database
import axios from "axios";

// data from redux
const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
    };
};

class Checkout extends Component {
    state = {
        values: {
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash On Delivery",
        },
    };

    goBack = () => {
        //error here
        // router_property, router history
        // this.props.history.goBack("/");
    };

    InputChangeHandler = (e) => {
        this.setState({
            values: {
                ...this.state.values,
                // get all field values
                [e.target.name]: e.target.value,
            },
        });
    };

    submitHandler = () => {
        //  ei object darabase(firebase) e jabe
        const order = {
            ingredients: this.props.ingredients,
            customer: this.state.values,
            price: this.props.totalPrice,
            orderTime: new Date(),
        };
        // axios.post(link + '/key_name.json', target_obeject_name) ekhane key_name=orders
        axios
            .post(
                "https://burger-builder-c4947-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",order
            )
            .then((response) => console.log(response))
            .catch((err) => console.log(err));

        console.log(order);
    };

    render() {
        return (
            <div>
                <h4
                    style={{
                        border: "1px solid grey",
                        boxShadow: "1px 1px #888888",
                        borderShadow: "5px",
                        padding: "20px",
                    }}
                >
                    Payment: {this.props.totalPrice} BDT
                </h4>
                <form
                    style={{
                        border: "1px solid grey",
                        boxShadow: "1px 1px #888888",
                        borderShadow: "5px",
                        padding: "20px",
                    }}
                >
                    <textarea
                        name="deliveryAddress"
                        value={this.state.values.deliveryAddress}
                        className="form-control"
                        placeholder="Your Address"
                        onChange={(e) => this.InputChangeHandler(e)}
                    ></textarea>
                    <br />

                    <input
                        name="phone"
                        className="form-control"
                        value={this.state.values.phone}
                        placeholder="Your Phone Number"
                        onChange={(e) => this.InputChangeHandler(e)}
                    />
                    <br />
                    <select
                        name="paymentType"
                        className="form-control"
                        value={this.state.values.paymentType}
                        onChange={(e) => this.InputChangeHandler(e)}
                    >
                        <option value="Cash On Delivery">
                            Cash On Delivery
                        </option>
                        <option value="Bkash">Bkash</option>
                    </select>
                    <br />
                    <Button
                        style={{ backgroundColor: "#D70F64" }}
                        className="mr-auto"
                        onClick={this.submitHandler}
                    >
                        Place Order
                    </Button>
                    <Button
                        color="secondary"
                        className="ml-1"
                        onClick={this.goBack}
                    >
                        Cancel
                    </Button>
                </form>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Checkout);
// export default Checkout;
