import React, { useState } from 'react';
import './Dltpopup.css';

function Dltpopup(props) {
    const [formData, setFormData] = useState({
        email: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`/user/delete/${formData.email}`, { 
                method: 'DELETE',
            });

            if (response.ok) {
                setFormData({
                    email: '',
                });
                props.setTrigger(false);
                props.fetchUsers(); // Fetch the latest user list
                alert('User deleted successfully');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert(error.message || 'Failed to delete user. Please try again.');
        }
    }

    return (props.trigger) ? (
        <div className='Dltpopup'>
            <div className="Dltpopup-inner">
                <h2>Delete User</h2><br />
                <form className='okk'>
                    <div className='ones'>
                        <div className="inpput-box"> 
                            <h3>Enter the Email :</h3>
                            <input className='boxs' type="email" placeholder='Email' name="email" value={formData.email} onChange={handleInputChange} />
                        </div>
                    </div>
                </form>
                <div className="abc">
                <button className="dlltbtn deletebtn" onClick={() => handleDelete()}>
                        <p class="paragraph"> delete </p>
                        <span class="icon-wrapper">
                            <svg class="icon ic" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </span>
                    </button>
                    <button className='cancelbtn' onClick={() => { props.setTrigger(false) }}>
                        <span className="button_top"> Cancel
                        </span>
                    </button>
                </div>
                {props.children}
            </div>
        </div>
    ) : null;
}

export default Dltpopup;
