// src\Components\Orders\Checkout\Checkout.js
import React, { Component } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import Spinner from "../../Spinner/Spinner";
import { resetIngredients } from "../../../redux/actionCreators";
// import { HistoryRouterProps as history } from "react-router-dom";
import { connect } from "react-redux";

// axios will be used to upload to database
import axios from "axios";
import { Link } from "react-router-dom";

// data from redux
const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        resetIngredients: () => dispatch(resetIngredients()),
    };
};

class Checkout extends Component {
    state = {
        values: {
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash On Delivery",
        },
        // for spinner
        isLoading: false,
        isModalOpen: false,
        modalMsg: "",
    };

    // goBack = () => {
    //     //error here
    //     // router_property, router history
    //     //  this.props.history.goBack("/");
    //     const { history } = this.props;
    //     history.push("/");
    // };

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
        // show spinner
        this.setState({ isLoading: true });

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
                "https://burger-builder-c4947-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
                order
            )
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Order Placed Successfully!",
                    });

                    this.props.resetIngredients();
                } else {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Something went wrong! Order Again!",
                    });
                }
            })
            .catch((err) => {
                this.setState({
                    isLoading: false,
                    isModalOpen: true,
                    modalMsg: "Something went wrong! Order Again!",
                });
            });

        console.log(order);
    };

    render() {
        let form = (
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
                        // direct checkout page e gele, mane url box diye direct gele place order desable thakbe
                        // mane ingredient add na thakle desabled
                        disabled={!this.props.purchasable}
                    >
                        Place Order
                    </Button>
                    <Link to="/">
                        <Button
                            color="secondary"
                            className="ml-1"
                            // onClick={this.goBack}
                        >
                            Cancel
                        </Button>
                    </Link>
                </form>
            </div>
        );

        // show spinner or not
        return (
            <div>
                {this.state.isLoading ? <Spinner /> : form}

                <Modal
                    isOpen={this.state.isModalOpen}
                    //onClick={this.goBack}
                >
                    <ModalBody>
                        <p>{this.state.modalMsg}</p>
                        <p>
                            <Link to="/">
                                <Button color="primary" className="ml-auto">Ok</Button>
                            </Link>
                        </p>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
// export default Checkout;
// export default withRouter(connect(mapStateToProps)(Checkout));
