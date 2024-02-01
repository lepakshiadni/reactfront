import { useNavigate } from 'react-router-dom';
import MstLogo from '../images/mstLoGo.jpg'
import React from 'react';
import axios from 'axios'

const AdminLogin = () => {

    const [number, setNumber] = React.useState(null)

    const navigate = useNavigate()
    
    const signupHandler = () => {
        axios.post('https://mstapplication-backend.onrender.com/user/generateotp', { number })
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
            <div>
                <img src={MstLogo} alt="" />

                <div style={{ height: '310px', width: '550px', border: '1px solid #DDD' }}>
                    <h3 style={{ fontSize: '26px', color: "#017EC4", fontWeight: 600 }}>Welcome To Mindstay</h3>
                    <h3 style={{ fontSize: '20px', color: "#434343", fontWeight: 400 }}>Mobile number</h3>
                    <input style={{ height: "56px", width: "390px", color: '#B9B9B9', fontSize: '18px', fontWeight: 400, textAlign: 'center', borde: "1px solid #B9B9B9", outline: 'none' }}
                        type="tel"
                        maxLength={10}
                        value={number}
                        onChange={(e) => { setNumber(e.target.value) }}
                        onKeyDown={(e) => {
                            // Allow only numeric input
                            if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                                e.preventDefault();
                            }
                        }}                 
                         placeholder='Enter Mobile number' />
                    <button onClick={signupHandler} style={{ width: '400px', height: '56px', background: '#2676C2', color: "white", border: '0', fontSize: '20px', borderRadius: '2px', fontWeight: 500, marginTop: '20px', cursor: 'pointer' }} >GET OTP</button>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;




