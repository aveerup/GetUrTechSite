import React, { useEffect, useState } from 'react';
import { useUser } from './UserCntxt'; 
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomAlert from './Assets/CustomAlert';


export default function UpdateUser() {
    const { userId } = useUser();
    const [userDetails, setUserDetails] = useState(null);
    const navigate = useNavigate();
    const [ShowAlert, setShowAlert] = useState(false);
    const [formData, setFormData] = useState({
        userId:'',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        address: ''
    });
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const handleShowAlert = () => {
      setShowAlert(true);
    };
    const handleCloseAlert = () => {
      setShowAlert(false);
      navigate('/userInfo');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userId) {
                    const response = await axios.post('http://localhost:5000/userInfo', { userId });
                    setUserDetails(response.data);

                  }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchData();
    }, [userId]);

    useEffect(() => {
        if (userDetails) {
            const user = userDetails[0];
            setFormData({
                userId: userId,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                password: user.pass_word,
                confirmPassword: user.pass_word,
                phoneNumber: user.phone_number,
                address: user.user_address
            });
        }
    }, [userDetails]);

    console.log("form data ",formData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setPasswordMatchError(true);
            return;
        }
        setPasswordMatchError(false);

        axios.post('http://localhost:5000/updateUserInfo', formData)
            .then((res) => {
              handleShowAlert();
                
            })
            .catch((err) => {
                console.error('Update failed:', err);
            });
    };

    return (
         <div className="container1">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
            <h2 className="card-title text-center">UPDATE INFORMATION</h2>
            {passwordMatchError && (
                <div className="alert alert-danger" role="alert">
                    Passwords do not match. Please make sure your passwords match.
                </div>
            )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">First Name <span className="required">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Last Name <span className="required">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address <span className="required">*</span></label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password <span className="required">*</span></label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password <span className="required">*</span></label>
                <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">Phone Number <span className="required">*</span></label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address<span className="required">*</span></label>
                  <textarea
                    className="form-control"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary">UPDATE</button>
                </div>
                {ShowAlert && (
                  
                  <CustomAlert
                  message="Your info has been updated!"
                  onClose={handleCloseAlert}
                  type="success"/>
               )}

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}
