import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      width="53"
      height="53"
      viewBox="0 0 53 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="2"
        y="2"
        width="49"
        height="48.3205"
        rx="24.1603"
        fill="#234C4C"
        stroke="#FEFBF0"
        strokeWidth="4"
      />
      <path
        d="M35.192 27.3942L22.466 34.7782C21.386 35.4042 20 34.6462 20 33.3842V18.6162C20 17.3562 21.384 16.5962 22.466 17.2242L35.192 24.6082C35.4377 24.7485 35.6419 24.9512 35.7839 25.1958C35.926 25.4405 36.0008 25.7183 36.0008 26.0012C36.0008 26.2841 35.926 26.562 35.7839 26.8066C35.6419 27.0512 35.4377 27.254 35.192 27.3942Z"
        fill="white"
      />
    </svg>
  );
}

export default SvgComponent;
