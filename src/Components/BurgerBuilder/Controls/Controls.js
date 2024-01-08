// src\Components\BurgerBuilder\Controls\Controls.js
import React from "react";
import { Card, CardBody, CardFooter, CardHeader, Button } from "reactstrap";

const controls = [
    // type==burgerBuilder.js er ingredients array er type string
    { label: "Salad", type: "salad" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" },
];

const BuildControl = (props) => {
    return (
        <div className="d-flex">
            <div
                className="me-auto ml-5"
                style={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                }}
            >
                {props.label}
            </div>
            <button
                className="btn btn-danger btn-sm m-1"
                onClick={props.removed}
            >
                Less
            </button>
            <button
                className="btn btn-success btn-sm m-1"
                onClick={props.added}
            >
                More
            </button>
        </div>
    );
};

const Controls = (props) => {
    return (
        <div className="container ml-md-5" style={{ textAlign: "center" }}>
            <Card
                style={{
                    marginTop: "30px",
                    marginBottom: "30px",
                    textAlign: "center",
                }}
            >
                <CardHeader
                    style={{
                        backgroundColor: "#D70F64",
                        color: "#white",
                    }}
                >
                    <h4>Add Ingredient</h4>
                </CardHeader>

                <CardBody>
                    {controls.map((item) => {
                        return (
                            <BuildControl
                                label={item.label}
                                type={item.type}
                                key={Math.random()}
                                // binding type
                                added={() => props.ingredientAdded(item.type)}
                                removed={() =>
                                    props.ingredientRemoved(item.type)
                                }
                            />
                        );
                    })}
                </CardBody>

                <CardFooter>
                    <h5>
                        Price: <strong>{props.price}</strong> BDT
                    </h5>
                </CardFooter>
                <Button disabled={!props.purchasable} onClick={props.toggleModal}>Order Now</Button>
            </Card>
        </div>
    );
};

export default Controls;
