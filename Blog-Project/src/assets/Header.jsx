import React from 'react'
import { IoMdBowtie } from "react-icons/io";
import "../assets/CSS/header.css"

function Header() {
    return (
        <div className='header'>

            <div className="title"> <IoMdBowtie className='icon' />Papyon Blog</div>
        </div>
    )
}

export default Header
