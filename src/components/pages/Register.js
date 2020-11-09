import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Form, Button, Alert, Col } from 'react-bootstrap';
import jwt_decode from "jwt-decode";
import { Redirect } from 'react-router-dom';
import ReactLoading from 'react-loading';

const TITLE = "Register";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function Register(props) {

    const [local, setLocal] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: ""
    });
    const [result, setResult] = useState({
        token: ""
    });
    const [state, setState] = useState({
        isLoading: false
    });
    const [clear, setClear] = useState({
        isClear: false
    });

    useEffect(() => {
        document.title = TITLE;
    }, []);

    const onChangeFirstName = event => {
        setLocal({
            first_name: event.target.value,
            last_name: local.last_name,
            email: local.email,
            password: local.password,
            confirm_password: local.confirm_password
        });
    };

    const onChangeLastName = event => {
        setLocal({
            first_name: local.first_name,
            last_name: event.target.value,
            email: local.email,
            password: local.password,
            confirm_password: local.confirm_password
        });
    };

    const onChangeEmail = event => {
        setLocal({
            first_name: local.first_name,
            last_name: local.last_name,
            email: event.target.value,
            password: local.password,
            confirm_password: local.confirm_password
        });
    };

    const onChangePassword = event => {
        setLocal({
            first_name: local.first_name,
            last_name: local.last_name,
            email: local.email,
            password: event.target.value,
            confirm_password: local.confirm_password
        });
    };

    const onChangeConfirmPassword = event => {
        setLocal({
            first_name: local.first_name,
            last_name: local.last_name,
            email: local.email,
            password: local.password,
            confirm_password: event.target.value
        });
    };
      
    const registerSubmit = async (e) => {
        const { first_name, last_name, email, password, confirm_password } = local;

        if (first_name && last_name && email && EMAIL_REGEX.test(email) && password && confirm_password && password == confirm_password) {
            setState({
                isLoading: true
            })
    
            const data = {
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "password": password
            }
            const config = {
                method: "POST",
                headers: {"Content-Type": "application/json"}
            };
            const res = await axios.post(
                "http://zrilich.pythonanywhere.com/api/v1/register", data, config
            );
            
            setResult({
                token: res.data
            });
            if (jwt_decode(res.data).error) {
                setClear({
                    isClear: false
                });
            } else {
                setClear({
                    isClear: true
                });
                localStorage.token = res.data
            }
        } else {
            e.preventDefault();
            const first_name_input = document.getElementById("first_name_input");
            const last_name_input = document.getElementById("last_name_input");
            const email_input = document.getElementById("email_input");
            const password_input = document.getElementById("password_input");
            const confirm_pass_input = document.getElementById("confirm_password_input");
            const first_name_err = document.getElementById("first_name_error");
            const last_name_err = document.getElementById("last_name_error");
            const email_err = document.getElementById("email_error");
            const pass_err = document.getElementById("password_error");
            const confirm_pass_err = document.getElementById("confirm_password_error");

            if (!first_name) {
                first_name_err.style.display = "block";
                first_name_err.textContent = "Please enter your first name.";
                first_name_input.classList.add("is-invalid");
            } else {
                first_name_err.style.display = "none";
                first_name_err.textContent = "";
                first_name_input.classList.remove("is-invalid");
                first_name_input.classList.add("is-valid");
            }
            if (!last_name) {
                last_name_err.style.display = "block";
                last_name_err.textContent = "Please enter your last name.";
                last_name_input.classList.add("is-invalid");
            } else {
                last_name_err.style.display = "none";
                last_name_err.textContent = "";
                last_name_input.classList.remove("is-invalid");
                last_name_input.classList.add("is-valid");
            }
            if (!email) {
                email_err.style.display = "block";
                email_err.textContent = "Please enter your email.";
                email_input.classList.add("is-invalid");
            } else {
                if (!EMAIL_REGEX.test(email)) {
                    email_err.style.display = "block";
                    email_err.textContent = "Invalid email.";
                    email_input.classList.add("is-invalid");
                } else {
                    email_err.style.display = "none";
                    email_err.textContent = "";
                    email_input.classList.remove("is-invalid");
                    email_input.classList.add("is-valid");
                }
            }
            if (!password) {
                pass_err.style.display = "block";
                pass_err.textContent = "Please enter your password.";
                password_input.classList.add("is-invalid");
            } else {
                pass_err.style.display = "none";
                pass_err.textContent = "";
                password_input.classList.remove("is-invalid");
                password_input.classList.add("is-valid");
            }
            if (!confirm_password) {
                confirm_pass_err.style.display = "block";
                confirm_pass_err.textContent = "Please enter your password again.";
                confirm_pass_input.classList.add("is-invalid");
            } else {
                if (confirm_password != password) {
                    confirm_pass_err.style.display = "block";
                    confirm_pass_err.textContent = "Passwords do not match.";
                    confirm_pass_input.classList.add("is-invalid");
                } else {
                    confirm_pass_err.style.display = "none";
                    confirm_pass_err.textContent = "";
                    confirm_pass_input.classList.remove("is-invalid");
                    confirm_pass_input.classList.add("is-valid");
                }
            }
        }
        

    }

    if (state.isLoading) {
        const { token } = result;
        if (token === '') {
            return (
                <>
                    <div className="question">
                        <ReactLoading type={"spin"} color={"grey"} />
                        <h6>Registering...</h6>
                    </div>
                </>
            )
        } else {
            if (!clear.isClear) {
                return <Register error={jwt_decode(token)} />
            } else {
                return (
                    <>
                        <Redirect push to="/dashboard/user-info" />
                    </>
                )
            }
        }
        
    } else {
        return (
            <>
                <div className="registerForm">
                    <h1 className="pb-3">Register</h1>
                    <Form className="text-center register-forma">
                        <Form.Row>
                            <Col lg={4} sm={6}>
                                <Form.Group as={Col} className="left-center p-0 left-text">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control id="first_name_input" value={local.first_name} onChange={onChangeFirstName} type="email" placeholder="First Name" />
                                    <Form.Text id="first_name_error" className="text-muted form-error-text">
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col lg={4} sm={6}>
                                <Form.Group as={Col} className="left-center p-0 left-text">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control id="last_name_input" value={local.last_name} onChange={onChangeLastName} type="email" placeholder="Last Name" />
                                    <Form.Text id="last_name_error" className="text-muted form-error-text">
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Col} className="left-center p-0 left-text">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control id="email_input" value={local.email} onChange={onChangeEmail} type="email" placeholder="Enter email" />
                                    <Form.Text id="email_error" className="text-muted form-error-text">
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                        </Form.Row>
    
                        <Form.Row>
                            <Col lg={6}>
                                <Form.Group as={Col} className="left-center p-0 left-text">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control id="password_input" value={local.password} onChange={onChangePassword} type="password" placeholder="Password" />
                                    <Form.Text id="password_error" className="text-muted form-error-text">
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group as={Col} className="left-center p-0 left-text">
                                    <Form.Label>Confirm password</Form.Label>
                                    <Form.Control id="confirm_password_input" value={local.confirm_password} onChange={onChangeConfirmPassword} type="password" placeholder="Password confirmation" />
                                    <Form.Text id="confirm_password_error" className="text-muted form-error-text">
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        {props.error && <Alert variant="danger">{props.error.error}</Alert>}
                        <Button onClick={registerSubmit} variant="outline-primary" type="submit">
                            Register
                        </Button>
                        <p>If you already own an account login <Alert.Link href='/login'>here</Alert.Link>.</p>
                    </Form>
                </div>
            </>
        )
    }
    

}

export default Register