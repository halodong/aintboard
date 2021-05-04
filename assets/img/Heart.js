import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 684 550"
      {...props}
    >
      <path fill="#ed5aa1" d="M342.82 550L0 207h171.41l171.41 343z" />
      <path fill="#fe7ab3" d="M342.82 550l169.65-343H171.41l171.41 343z" />
      <path fill="#c84f85" d="M342.82 550L684 207H512.47L342.82 550z" />
      <path fill="#c55085" d="M0 207L101.82 0l69.59 207H0z" />
      <path
        fill="#f35f91"
        d="M101.82 0h167.12l73.88 78.94L171.41 207 101.82 0z"
      />
      <path fill="#f7b0d2" d="M171.41 207L342.82 78.94 512.47 207H171.41z" />
      <path
        fill="#fe83af"
        d="M580.82 0H416.05l-72.84 78.94 169 128.06L580.82 0z"
      />
      <path fill="#ed5f91" d="M580.82 0l-68.61 207H684L580.82 0z" />
    </svg>
  );
}

export default SvgComponent;
