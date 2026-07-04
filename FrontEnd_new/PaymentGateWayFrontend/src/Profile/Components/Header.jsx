import React from 'react'
import profilePic from 'C:/Users/lenovo/OneDrive/Desktop/Personal Project/FrontEnd_new/PaymentGateWayFrontend/src/assets/Profile.jpeg'
import { NavLink, useNavigate } from 'react-router-dom'
import PaymentGateHome from '../../PaymentGateWay/Pages/PaymentGateHome'
const Header = () => {
const navigate= useNavigate();


  return (
    <div class="header">
<img src={profilePic} alt="Profile Pic"></img>
<ul>
    <NavLink to='/'><li>Home</li></NavLink>
    <NavLink to='/About'><li>About</li></NavLink>
    <NavLink to='/Experience'><li>Experience</li></NavLink>
    <NavLink to='/ProjectDetails'><li>Project Details</li></NavLink>
    <NavLink to='/ContactMe'><li>Contact Me</li></NavLink>
</ul>
<button onClick={()=>navigate('/PaymentGateWayHome')}>
      Jump To Payment Gate Way Project
    </button>
    </div>
  )
}

export default Header