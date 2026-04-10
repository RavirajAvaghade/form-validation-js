import React, { useState } from "react";
import axios from "axios";
import "./FormDemo.css";

export default function FormDemo() {

    const [form, setForm] = useState({
        username: "",
        mobile: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const [msg, setMsg] = useState("");
    const [strength, setStrength] = useState("");

    function checkPasswordStrength(password) {
        if (password.length < 6) {
            return "Weak";
        } else if (password.match(/[A-Z]/) && password.match(/[0-9]/)) {
            return "Strong";
        } else {
            return "Medium";
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });

        // Password strength
        if (name === "password") {
            setStrength(checkPasswordStrength(value));
        }
    }

    function validate() {
        let newErrors = {};

        if (!form.username) {
            newErrors.username = "Username is required";
        }

        if (!form.mobile) {
            newErrors.mobile = "Mobile is required";
        } else if (form.mobile.length !== 10) {
            newErrors.mobile = "Mobile must be 10 digits";
        }

        if (!form.password) {
            newErrors.password = "Password is required";
        } else if (form.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!validate()) return;

        const res = await axios.post("http://localhost:5000/register", form);
        setMsg(res.data.msg);
    }

    return (
        <div className="main-container">

            <div className="form-card">

                <h2 className="title">Register</h2>

                {msg && <div className="alert alert-success">{msg}</div>}

                <form onSubmit={handleSubmit}>

                    {/* Username */}
                    <div className="form-group">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                        />
                        {errors.username && <small className="error">{errors.username}</small>}
                    </div>

                    {/* Mobile */}
                    <div className="form-group">
                        <input
                            type="text"
                            name="mobile"
                            placeholder="Mobile"
                            onChange={handleChange}
                        />
                        {errors.mobile && <small className="error">{errors.mobile}</small>}
                    </div>

                    {/* Password */}
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                        />
                        {errors.password && <small className="error">{errors.password}</small>}

                        {form.password && (
                            <small className={
                                strength === "Strong" ? "strong" :
                                strength === "Medium" ? "medium" : "weak"
                            }>
                                {strength} Password
                            </small>
                        )}
                    </div>

                    <button className="btn-submit">Register</button>

                </form>
            </div>
        </div>
    );
}