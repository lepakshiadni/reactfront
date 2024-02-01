import MstLogo from '../images/image 30.svg';
import profileImg from '../images/profileTrainer.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="" style={{ position: 'fixed', width: '100%', backgroundColor: '#FFF', padding: '10px', zIndex: 1000 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0px 20px' }}>
                <img src={MstLogo} alt="" />
                <div style={{ display: 'flex', alignItems: 'start' }}>
                    <div style={{ position: 'relative' }}>
                        <img style={{ width: '64px', height: '64px', borderRadius: '50px', cursor: 'pointer' }} src={profileImg} alt="" onClick={() => setOpen(!open)} />
                        {open && (
                            <div style={{ position: 'fixed', right: 50, top: '80px', background: 'white', border: '1px solid #ccc', borderRadius: '5px', width: '234px', zIndex: 2000 }}>
                                <div className='option'>View Profile</div>
                                <div className='option' onClick={() => navigate('/adminPost')}>Recent Activity</div>
                            </div>
                        )}
                    </div>
                    <div style={{ marginLeft: '5px' }}>
                        <h3 style={{ color: '#263238', fontSize: '20px', fontWeight: 500, margin: 0 }}>Martin Hook</h3>
                        <p style={{ color: '#6A6A6A', fontSize: '14px', fontWeight: 400, margin: 0, textAlign: 'start' }}>Admin</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
