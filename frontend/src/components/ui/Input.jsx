import React from 'react';

export default function Input({ label, type = 'text', value, onChange, required = false }) {
    return (
        <div>
            <label>{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                className="input"
            />
        </div>
    );
}