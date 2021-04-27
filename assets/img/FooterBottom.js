import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      height={73}
      viewBox="0 0 1440 73"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M1440 .274H0v29.1h1440V.274z" fill="#568481" />
      <path d="M1440 29.375H0v43.6h1440v-43.6z" fill="#234C4C" />
      <path d="M1440 .274H0v7.5h1440v-7.5z" fill="#76AAA4" />
    </svg>
  );
}

export default SvgComponent;
