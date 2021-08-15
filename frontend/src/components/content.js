import React from 'react';
import '../css/content.css';

export default class Content extends React.Component {
    render() {
        return (
            <div className = "contentContainer">
                <div className = "contentHeading">
                    {this.props.heading}
                </div>
                <div className = "contentBody">
                    {this.props.children}
                </div>
            </div>
        )
    }
}