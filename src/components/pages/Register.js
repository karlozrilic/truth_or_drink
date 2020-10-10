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
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            };
            const res = await axios.post(
                'https://zrilich.pythonanywhere.com/api/v1/login', data, config
            );
            setResult({
                token: res.data
            })
            if (jwt_decode(res.data).error) {
                setClear({
                    isClear: false
                })
            } else {
                setClear({
                    isClear: true
                })
                localStorage.token = res.data
            }
        } else {
            e.preventDefault();
            const email_err = document.getElementById('email-error');
            const pass_err = document.getElementById('password-error');
            if (!EMAIL_REGEX.test(email)) {
                email_err.style.display = "block";
                email_err.textContent = "Invalid email.";
            }
            if (!email) {
                email_err.style.display = "block";
                email_err.textContent = "Please enter your email.";
            }
            if (!password) {
                pass_err.style.display = "block";
                pass_err.textContent = "Please enter your password.";
            }
            if (password != confirm_password) {
                pass_err.style.display = "block";
                pass_err.textContent = "Passwords do not match.";
            }
        }
        

    }

    const { first_name, last_name, email, password } = local;
    const { isClear } = clear;

    if (state.isLoading) {
        const { token } = result;
        if (token === '') {
            return (
                <>
                    <div className="question">
                        <ReactLoading type={"spin"} color={"grey"} />
                        <h6>Logging in...</h6>
                    </div>
                </>
            )
        } else {
            if (!isClear) {
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
                                <Form.Group as={Col} className="left-center p-0" controlId="formBasicEmail">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control value={first_name} onChange={onChangeFirstName} type="email" placeholder="First Name" />
                                    <Form.Text id="email-error" className="text-muted">
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col lg={4} sm={6}>
                                <Form.Group as={Col} className="left-center p-0" controlId="formBasicEmail">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control value={last_name} onChange={onChangeLastName} type="email" placeholder="Last Name" />
                                    <Form.Text id="email-error" className="text-muted">
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group as={Col} className="left-center p-0" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control value={email} onChange={onChangeEmail} type="email" placeholder="Enter email" />
                                    <Form.Text id="email-error" className="text-muted">
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                        </Form.Row>
    
                        <Form.Row>
                            <Col lg={6}>
                                <Form.Group as={Col} className="left-center p-0" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control value={password} onChange={onChangePassword} type="password" placeholder="Password" />
                                    <Form.Text id="password-error" className="text-muted">
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group as={Col} className="left-center p-0" controlId="formBasicPassword">
                                    <Form.Label>Confirm password</Form.Label>
                                    <Form.Control value={password} onChange={onChangeConfirmPassword} type="password" placeholder="Password confirmation" />
                                    <Form.Text id="password-error" className="text-muted">
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        {props.error && <Alert variant="danger">{props.error.error}</Alert>}
                        <Button onClick={registerSubmit} variant="primary" type="submit">
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