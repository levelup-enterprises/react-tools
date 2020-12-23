import React from "react";

const Button = ({ text, ...rest }) => <button {...rest}>{text}</button>;

export default Button;
