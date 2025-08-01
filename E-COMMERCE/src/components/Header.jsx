import React from 'react'
import '../css/Header.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SlBasket } from "react-icons/sl";
import { CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge'
import { setDrawer } from '../redux/slices/basketSlice';


function Header() {
    const [theme, setTheme] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { products } = useSelector((store) => store.basket);
    const changeTheme = () => {
        const root = document.getElementById("root");

        if (theme) {
            root.style.backgroundColor = "black ";
            root.style.color = "#fff";
        } else {
            root.style.backgroundColor = " #fff";
            root.style.color = "black";
        }
        setTheme(!theme);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className='flex-row' onClick={() => navigate("/")}>
                <img className='logo' src='../public/logo.png' />
                <p className='logo-text'>Ş-Commerce A.Ş</p>
            </div>
            <div className='flex-row'>
                <input className='search-input' type='text' placeholder='Search' />
                <div>
                    <Badge onClick={() => dispatch(setDrawer())}
                        badgeContent={products.length}
                        sx={{
                            '& .MuiBadge-badge': {
                                backgroundColor: 'gold',
                                color: 'black',
                                fontWeight: 'bold',
                            },
                            marginRight: '7px',
                            marginBottom: '14px'
                        }}
                    >
                        <SlBasket className='icon' />
                    </Badge>

                    {
                        theme
                            ? <FaMoon className='icon' onClick={changeTheme} />
                            : <CiLight className='icon' onClick={changeTheme} />
                    }
                </div>

            </div>
        </div>
    )
}

export default Header
