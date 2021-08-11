import React from 'react';
import { Link } from 'react-router-dom';
import '../css/sidebar.css';
// Ant Design CSS
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { AiOutlineForm, AiFillStar } from "react-icons/ai";     

class Sidebar extends React.Component {
    render() {
        return (
            <div className="sidebar">
                <Button type="primary" size='large' href="/metamask" className="sideButton">
                    Setup Metamask
                </Button>
                <Link to="/" className="sideLink">
                    <div className="sideItem">
                            <AiOutlineForm className="sideIcon"/>
                            <span className="sideLinkText">
                                Contracts
                            </span>
                    </div>
                </Link>
                <Link to="/" className="sideLink">
                    <div className="sideItem">
                            <AiFillStar className="sideIcon"/>
                            <span className="sideLinkText">
                                Reviews
                            </span>
                    </div>
                </Link>
            </div>
        )
    }
}

export default Sidebar;