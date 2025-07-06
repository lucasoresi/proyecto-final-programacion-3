import React from 'react';
import '../../assets/button.css';

export default function Button({ children, variant = 'primary', ...props }) {
    return (
        <button className={`btn btn-${variant}`} {...props}>
            {children}
        </button>
    );
}