// src\Components\BurgerBuilder\BurgerBuilder.js
// this file will handle all logic
import React, { Component } from "react";
import Burger from "./Burger/Burger";
import Controls from "./Controls/Controls";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import Summery from "./Summery/Summery";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import {
    addIngredient,
    removeIngredient,
    updatePurchasable,
} from "../../redux/actionCreators";

//  fetch redux states
// props ashbe shob redux theke
const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // actionCreators er addIngredirnt , removeIngredient, updatePurchasable e pass hbe
        addIngredient: (igtype) => dispatch(addIngredient(igtype)),
        removeIngredient: (igtype) => dispatch(removeIngredient(igtype)),
        updatePurchasable: () => dispatch(updatePurchasable()),
    };
};

class BurgerBuilder extends Component {
    state = {
        modalOpen: false,
        onCLickCheckout: false,
    };

    addIngredientHandle = (type) => {
        this.props.addIngredient(type);
        this.props.updatePurchasable();
    };

    removeIngredientHandle = (type) => {
        this.props.removeIngredient(type);
        this.props.updatePurchasable();
    };

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen,
        });
    };

    handleCheckout = () => {
        this.setState({
            onCLickCheckout: true,
        });
    };

    render() {
        // console.log(this.props.ingredients)
        return (
            <div>
                {/* bootstrap: flexing: big screen e side by side, small e upor nich */}
                <div className="d-flex flex-md-row flex-column">
                    <Burger ingredients={this.props.ingredients} />
                    <Controls
                        ingredientAdded={this.addIngredientHandle}
                        ingredientRemoved={this.removeIngredientHandle}
                        price={this.props.totalPrice}
                        toggleModal={this.toggleModal}
                        purchasable={this.props.purchasable}
                    />
                </div>

                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>Your Order Summery</ModalHeader>
                    <ModalBody>
                        {/* toFixed(0) means 0 decimal places */}
                        <h5>
                            Total Price: {this.props.totalPrice.toFixed(0)} BDT
                        </h5>
                        <Summery ingredients={this.props.ingredients} />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            style={{ backgroundColor: "#D70F64" }}
                            onClick={this.handleCheckout}
                        >
                            Continue to Checkout
                        </Button>
                        <Button color="secondary" onClick={this.toggleModal}>
                            Cancel
                        </Button>
                    </ModalFooter>

                    {this.state.onCLickCheckout && (
                        <Navigate to="/checkout" replace={true} />
                    )}
                </Modal>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
