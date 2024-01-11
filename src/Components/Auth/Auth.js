import React, { Component } from "react";
import { Formik } from "formik";

class Auth extends Component {
    render() {
        return (
            <div>
                <Formik
                    initialValues={
                        // j field gulo thakbe auth page e
                        {
                            email: "",
                            password: "",
                            passwordConfirm: "",
                        }
                    }
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                    // for validation, built in props
                    // validation check failed hole r shamne agabe na
                    validate={(values) => {
                        const errors = {};
                        // empty kina
                        if (!values.email) {
                            errors.email = "Required";
                        }
                        // email adds invalid kina
                        else if (
                            !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(
                                values.email
                            )
                        ) {
                            errors.email = "Invalid email address";
                        }

                        //password
                        if (!values.password) {
                            errors.password = "Required";
                        } else if (values.password.length < 4) {
                            errors.password =
                                "Password must be at least 4 characters!";
                        }

                        // pass confirm
                        if (!values.passwordConfirm) {
                            errors.passwordConfirm = "Required";
                        } else if (values.password !== values.passwordConfirm) {
                            errors.passwordConfirm =
                                "Password field does not match";
                        }
                        //console.log("Errors",errors);
                        return errors;
                    }}
                >
                    {/* ei fn er vitor form render kora hbe */}
                    {/* handleChange built in formik fn, er maddhome field er value auto form e upate hy */}
                    {/* handleSubmit o built in fn */}
                    {/* errors => to show errors under field input */}
                    {({ values, handleChange, handleSubmit, errors }) => (
                        <div
                            style={{
                                border: "1px grey solid",
                                padding: "30px",
                                borderRadius: "7px",
                            }}
                        >
                            <form onSubmit={handleSubmit}>
                                {/* field "name" will be same as initialValues field_names */}
                                <input
                                    name="email"
                                    placeholder="Enter Your Email"
                                    className="form-control"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <span style={{ color: "red" }}>
                                    {errors.email}
                                </span>

                                <br />

                                <input
                                    name="password"
                                    placeholder="Password"
                                    className="form-control"
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                <span style={{ color: "red" }}>
                                    {errors.password}
                                </span>

                                <br />

                                <input
                                    name="passwordConfirm"
                                    placeholder="Confirm Password"
                                    className="form-control"
                                    value={values.passwordConfirm}
                                    onChange={handleChange}
                                />
                                <span style={{ color: "red" }}>
                                    {errors.passwordConfirm}
                                </span>

                                <br />
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                >
                                    Sign Up
                                </button>
                            </form>
                        </div>
                    )}
                </Formik>
            </div>
        );
    }
}

export default Auth;
