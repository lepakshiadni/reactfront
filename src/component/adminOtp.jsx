import { useNavigate } from 'react-router-dom';
import MstLogo from '../images/mstLoGo.jpg'
import '../styles/adminOtp.css'
import { useState } from 'react';
import Axios from 'axios'



const AdminOtp = () => {
    const [validotp, setOtp] = useState(["", "", "", ""]);

    const phoneNumber = localStorage.getItem('phoneNumber')
    const number=phoneNumber
    console.log(phoneNumber)
    const navigate = useNavigate()

    const handleChange = (e, index) => {
        const value = e.target.value;

        // Check if the input is a digit
        if (/^\d*$/.test(value)) {
            // Update the OTP array with the new value at the specified index
            setOtp((prevOtp) => {
                const newOtp = [...prevOtp];
                newOtp[index] = value;
                return newOtp;
            });

            // Move to the next input box if a digit is entered
            if (index < 3 && value !== "") {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            // Handle backspace functionality
            e.preventDefault();
            setOtp((prevOtp) => {
                const newOtp = [...prevOtp];
                newOtp[index] = "";

                // Move focus to the previous input box on backspace
                if (index > 0) {
                    document.getElementById(`otp-input-${index - 1}`).focus();
                } else {
                    // If it's the first input box, set focus to the current input
                    document.getElementById(`otp-input-${index}`).focus();
                }
                return newOtp;

            });
        }
    };
    const handleVerifyOtp = (e) => {
        e.preventDefault()
        const otp = validotp.join("");
        if (otp.length !== 4) {
            alert('please enter the 4 digit number')
        }
        else {
            Axios.post('https://mstapplication-backend.onrender.com/user/verifyotp', { phoneNumber, otp })
                .then((resp) => {
                    console.log(resp.data)
                    if (resp.data.success && resp.data?.existinguser?.role === "admin") {
                        localStorage.setItem('token',resp.data?.token)
                        navigate('/landing')
                        localStorage.removeItem()
                    }
                    else {
                        alert("Not an Admin")
                        navigate('/')
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
    const signupHandler = () => {
        Axios.post('https://mstapplication-backend.onrender.com/user/generateotp', { number })
            .then((resp) => {
                console.log(resp.data)

                if (number.length !== 10) {
                    alert('Enter 10 digit Mobile Number')
                }
                else if (resp.data.success) {
                    localStorage.setItem('phoneNumber', number)
                    alert('otp Sended')
                    navigate('/verefyOtp')

                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <div style={{ display: "flex", justifyItems: 'center', justifyContent: 'space-around', marginTop: '10%' }}>
            <div style={{}}>
                <img src={MstLogo} alt="" />

                <div style={{ height: '310px', width: '550px', border: '1px solid #DDD', padding: '10px 50px' }}>
                    <h3 style={{ fontSize: '26px', color: "#017EC4", fontWeight: 600 }}>Verify Your Account</h3>
                    <p style={{ fontSize: '16px', color: "#B9B9B9", fontWeight: 400 }}>Enter the 4-digit OTP to verify your Mindstay technology, <br />
                        Resend OTP if needed</p>
                    <div className="otp-input-container">
                        {validotp.map((digit, index) => (
                            <input
                                className='otpInput'
                                key={index}
                                id={`otp-input-${index}`}
                                type="text"
                                value={digit}
                                maxLength="1"
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                style={{
                                    textAlign: "center",
                                    fontFamily: "poppins",
                                    fontSize: "1.5rem",
                                    color: "#2676C2",
                                }}
                            />
                        ))}
                    </div>
                    <button onClick={handleVerifyOtp} style={{ width: '440px', height: '56px', background: '#2676C2', color: "white", border: '0', fontSize: '20px', borderRadius: '2px', fontWeight: 500, marginTop: '20px', cursor: "pointer" }} >Verify</button>
                    <h3 style={{ color: '#B9B9B9', fontWeight: 400, fontSize: '16px', marginLeft: '60px', textAlign: 'start', marginTop: 0, }}>If you haven't received the OTP ? <span style={{ color: '#2676C2', cursor: 'pointer' }} onClick={signupHandler}>Resend !</span></h3>
                </div>
            </div>
        </div>
    );
}

export default AdminOtp;