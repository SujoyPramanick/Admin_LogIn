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
                <button className='deletebtn' onClick={() => handleDelete()}>
                    <span>Delete</span>
                </button>
                <button className="cancel-btn" onClick={() => { props.setTrigger(false) }}>Cancel</button>
                {props.children}
            </div>
        </div>
    ) : null;
}

export default Dltpopup;
