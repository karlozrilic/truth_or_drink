import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Form, Button, Alert, Fade } from 'react-bootstrap';
import jwt_decode from "jwt-decode";
import { Redirect } from 'react-router-dom';
import ReactLoading from 'react-loading';

const TITLE = "Login";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function Login(props) {

    const [local, setLocal] = useState({
        email: '',
        password: '',
        isChecked: false,
    });
    const [result, setResult] = useState({
        token: ''
    });
    const [state, setState] = useState({
        isLoading: false
    });
    const [clear, setClear] = useState({
        isClear: false
    });
    const [show, setShow] = useState(false);

    useEffect(() => {
        document.title = TITLE;
        if (localStorage.checkbox && localStorage.email !== '' && !props.error) {
            setLocal({
                email: localStorage.email,
                password: localStorage.password,
                isChecked: true
            });
        }
        if (props.error) {
            setShow(true);
        }
    }, []);

    const onChangeEmail = event => {
        setLocal({
            email: event.target.value,
            password: local.password,
            isChecked: local.isChecked,
        });
    }

    const onChangePassword = event => {
        setLocal({
            email: local.email,
            password: event.target.value,
            isChecked: local.isChecked,
        });
    }
 
    const onChangeCheckbox = event => {
        setLocal({
            email: local.email,
            password: local.password,
            isChecked: event.target.checked,
        });
    }
      

    const loginSubmit = async (e) => {
        const { email, password, isChecked } = local;

        if (email && EMAIL_REGEX.test(email) && password) {
            setState({
                isLoading: true
            })
    
            //const { token } = result;
            //axios.defaults.headers.common['Authorization'] = "neki token";
            const data = {
                "email": email,
                "password": password,
            }
            const config = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            };
            const res = await axios.post(
                "https://zrilich.pythonanywhere.com/api/v1/login", data, config
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
                if (isChecked && email !== "") {
                    localStorage.email = email
                    localStorage.password = password
                    localStorage.checkbox = isChecked
                }
                localStorage.token = res.data
            }
        } else {
            e.preventDefault();
            const email_input = document.getElementById("email_input");
            const password_input = document.getElementById("password_input");
            const email_err = document.getElementById("email-error");
            const pass_err = document.getElementById("password-error");
            
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
        }
        

    }

    const { email, password, isChecked } = local;
    const { isClear } = clear;

    if (state.isLoading) {
        const { token } = result;
        if (token === "") {
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
                return <Login error={jwt_decode(token)} />
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
                <div className="loginForm">
                    <h1 className="pb-3">Login</h1>
                        <Form className="text-center login-forma">
                        <Form.Group className="left-text" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control id="email_input" value={email} onChange={onChangeEmail} type="email" placeholder="Enter email" />
                            <Form.Text id="email-error" className="text-muted form-error-text">
                            </Form.Text>
                        </Form.Group>
    
                        <Form.Group className="left-text" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control id="password_input" value={password} onChange={onChangePassword} type="password" placeholder="Password" />
                            <Form.Text id="password-error" className="text-muted form-error-text">
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="left-text" controlId="formBasicCheckbox">
                            <Form.Check /*checked={isChecked}*/ onChange={onChangeCheckbox} type="checkbox" label="Remember me" />
                        </Form.Group>
                        {show && <Alert variant="danger" onClose={() => setShow(false)} dismissible transition={Fade}>{props.error.error}</Alert>}
                        <Button onClick={loginSubmit} variant="primary" type="submit">
                            Submit
                        </Button>
                        <p>If you don't have account yet register <Alert.Link href='/register'>here</Alert.Link>.</p>
                    </Form>
                </div>
            </>
        )
    }
    

}

export default Login