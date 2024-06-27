import React , {useRef, useEffect}from "react";
import { Container, Row, Button} from 'reactstrap'
import {NavLink, Link, useNavigate} from 'react-router-dom'
import backpack from '../../assets/images/backpack.png';
import "./header.css";
import { useCookies } from "react-cookie";
const nav_links=[
    {
        path:'/home',
        display:'Home'
    },
    {
        path:'/about',
        display:'About'
    },
    {
        path:'/tours',
        display:'Trek & Camp'
    }
];
const Header = () => {
    const headerRef=useRef(null);
    const navigate = useNavigate();
    // Retrieve the cookies
    const [cookies,  setCookie] = useCookies(['email', 'password', 'token', 'uid']);

    // Access the cookie values
    const { token } = cookies;
    const stickyHeaderFunc=()=>{
        window.addEventListener('scroll',()=>{
            if(document.body.scrollTop>80 || document.documentElement.scrollTop>80){
                headerRef.current.classList.add('sticky_header')
            }
            else{
                headerRef.current.classList.remove('sticky_header')
            }
        })
    }
    const handleLogout = () => {
        // Remove the cookies when logging out
        setCookie('email',"");
        setCookie('password',"");
        setCookie('token',"");
        setCookie('uid',"")
        navigate('/home')
    }
    useEffect(()=>{
        stickyHeaderFunc()
        return window.removeEventListener('scroll',stickyHeaderFunc)
    })
    return <header className="header" ref={headerRef}>
   <Container>
    <Row>
        <div className="nav_wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
                <img src={backpack} alt="" />
            </div>
            <div className="navigation">
                <ul className="menu d-flex align-items-center gap-5">
                    {
                        nav_links.map((item,index)=>(
                            <li className="nav_item" key={index}>
                             <NavLink to={item.path} className={navClass=>navClass.isActive ? 'active_link' : ""}>{item.display}</NavLink>
                            </li>
                        )
                        )
                    }
                    </ul>
            </div>
           <div className="nav_right d-flex align-items-center gap-4">
            <div className="nav_btns d-flex align-items-center gap-4">
             {!token && <Button className="btn secondary_btn"><Link className="text-white" to='/login'>Login</Link></Button>}
             {token && <Button className="btn secondary_btn" onClick={handleLogout}>Logout</Button>}
             
             <Button className="btn primary_btn"><Link className="text-white" to='/register'>Register</Link></Button>
            </div>
           <span className="mobile_menu">
           <i class="ri-menu-line"></i>
           </span>
           </div>
            
            </div>    
            </Row>
   </Container>
    </header>
};

export default Header;