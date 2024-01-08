// src\Components\BurgerBuilder\BurgerBuilder.js
// this file will handle all logic
import React, { Component } from "react";
import Burger from "./Burger/Burger";
import Controls from "./Controls/Controls";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import Summery from "./Summery/Summery";

const INGREDIENT_PRICES = {
    // variable name state.ingrdient.type er sathe match hote hbe
    salad: 20,
    cheese: 40,
    meat: 90,
};

export default class BurgerBuilder extends Component {
    state = {
        // ingredients er "type" hbe ingrdients.js er switch-case er case name
        ingredients: [
            // amount means ei type koyta count thakbe, amount joto thakbe, totobar call korte hbe
            //  soja kothay c++: map[type] = amount
            { type: "salad", amount: 0 },
            { type: "cheese", amount: 0 },
            { type: "meat", amount: 0 },
        ],
        totalPrice: 20,
        modalOpen: false,
        purchasable: false,
    };

    updatePurchasable = (ingredients) => {
        const sum = ingredients.reduce((sum, element) => {
            return sum + element.amount;
        }, 0); // sum=0, initial value

        this.setState({ purchasable: sum > 0 });
    };

    addIngredientHandle = (type) => {
        // copy of state.ingredients
        const ingredients = [...this.state.ingredients];

        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        // count of amount
        for (let item of ingredients) {
            if (item.type === type) item.amount++;
        }

        // update state with copied state
        this.setState({ ingredients: ingredients, totalPrice: newPrice });
        this.updatePurchasable(ingredients);
    };

    removeIngredientHandle = (type) => {
        // copy of state.ingredients
        const ingredients = [...this.state.ingredients];

        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

        // count of amount
        for (let item of ingredients) {
            if (item.type === type) {
                if (item.amount <= 0) return;
                item.amount--;
            }
        }

        // update state with copied state
        this.setState({ ingredients: ingredients, totalPrice: newPrice });
        this.updatePurchasable(ingredients);
    };

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen,
        });
    };

    render() {
        return (
            <div>
                {/* bootstrap: flexing: big screen e side by side, small e upor nich */}
                <div className="d-flex flex-md-row flex-column">
                    <Burger ingredients={this.state.ingredients} />
                    <Controls
                        ingredientAdded={this.addIngredientHandle}
                        ingredientRemoved={this.removeIngredientHandle}
                        price={this.state.totalPrice}
                        toggleModal={this.toggleModal}
                        purchasable={this.state.purchasable}
                    />
                </div>

                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>Your Order Summery</ModalHeader>
                    <ModalBody>
                        {/* toFixed(0) means 0 decimal places */}
                        <h5>
                            Total Price: {this.state.totalPrice.toFixed(0)} BDT
                        </h5>
                        <Summery ingredients={this.state.ingredients} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.toggleModal}>
                            Continue to Checkout
                        </Button>
                        <Button color="secondary" onClick={this.toggleModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
