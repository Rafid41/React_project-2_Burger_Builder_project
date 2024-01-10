// src\Components\Orders\Checkout\Checkout.js
import React, { Component } from "react";
import { Button } from "reactstrap";
// import { HistoryRouterProps as history } from "react-router-dom";


class Checkout extends Component {
    state = {
        values: {
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash On Dlivery",
        },
    };

    goBack = () => {
        // router_property, router history
        this.props.history.goBack("/");
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
        console.log(this.state.values);
    };

    render() {
        return (
            <div>
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

export default Checkout;
