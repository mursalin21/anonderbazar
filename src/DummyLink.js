import React from 'react';

const DummyLink = ({ onClick, children, ...props }) =>
    <a href="#" onClick={evt => {
        evt.preventDefault();
        onClick && onClick();
    }} {...props}>
        {children}
    </a>

export default DummyLink;