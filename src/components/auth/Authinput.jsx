import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Authinput({
  name, type, placeholder, register, error,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label htmlFor={name} className="text-sm font-bold tracking-wide">
        {placeholder}
      </label>
      <div className="relative">
        <input
          className="w-full dark:bg-dark_bg_3 text-base py-2 px-4 rounded-lg outline-none"
          type={showPassword ? 'text' : type}
          placeholder={placeholder}
          {...register(name)}
        />
        {type === 'password' && (
          <span
            className="absolute right-3 top-3 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
        )}
      </div>
      {error && <p className="text-red-400">{error}</p>}
    </div>
  );
}
