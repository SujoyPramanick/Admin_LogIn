import React, { useState } from 'react';
import './Popups.css';

function Popups(props) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async () => {
        try {
            const formDataObject = new FormData();
            formDataObject.append('name', formData.name);
            formDataObject.append('email', formData.email);
            formDataObject.append('password', formData.password);
            formDataObject.append('confirm_password', formData.confirm_password);
            
            const response = await fetch('/user/add', { 
                method: 'POST',
                body: formDataObject,
            });

            if (!response.ok) {
                throw new Error('Failed to add user. Server responded with ' + response.status);
            }

            setFormData({
                name: '',
                email: '',
                password: '',
                confirm_password: ''
            });
            props.setTrigger(false);
            props.fetchUsers();  // Add the new user to the list

            alert('Form submitted successfully');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert(error.message || 'Failed to submit form. Please try again.');
        }
    }

    return (props.trigger) ? (
        <div className='popup'>
            <div className="popup-inner">
                <h2>Enter User's Details</h2><br />
                <form className='ok'>
                    <div className='one'>
                        <div className="input-group">
                            <h3>Name </h3>
                            <input className='box' type="text" placeholder='Name' name="name" value={formData.name} onChange={handleInputChange} />
                        </div>
                        <div className="input-group"> 
                            <h3>Email </h3>
                            <input className='box' type="email" placeholder='Email' name="email" value={formData.email} onChange={handleInputChange} />
                        </div>
                        <div className="input-group"> 
                            <h3>Password </h3>
                            <input className='box' type="password" placeholder='Password' name="password" value={formData.password} onChange={handleInputChange} /> 
                        </div>
                        <div className="input-group"> 
                            <h3>Confirm Password </h3>
                            <input className='box' type="password" placeholder='Confirm Password' name="confirm_password" value={formData.confirm_password} onChange={handleInputChange} /> 
                        </div>
                    </div>
                </form>
                <button className='submitbtn' onClick={() => handleSubmit()}>
                    <div className="svg-wrapper-1">
                        <div className="svg-wrapper">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                            >
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path
                                    fill="currentColor"
                                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                                ></path>
                            </svg>
                        </div>
                    </div>
                    <span>Submit</span>
                </button>
                <button className="close-btn" onClick={() => { props.setTrigger(false) }}>X</button>
                {props.children}
            </div>
        </div>
    ) : null;
}

export default Popups;
