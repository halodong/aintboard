import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      dataname="bronze"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 148.88 171.19"
      {...props}
    >
      <path
        dataname="bronze handle r"
        d="M118.41 11.26l24.87-.25c3 0 5.46 1.55 5.53 3.5.55 14.64-1 70.19-55.5 70.62s1.64-5.69 4-5.77c14.58-.46 40.29-11.65 44.42-60 .09-1-1.19-1.92-2.8-1.92h-21.12"
        fill="#d1a66c"
      />
      <path
        dataname="bronze handle l"
        d="M30.48 10.65L5.6 10.4c-3 0-5.46 1.55-5.53 3.5-.55 14.64 1 70.19 55.5 70.62s-1.63-5.69-4-5.77c-14.59-.46-40.3-11.65-44.43-60-.09-1 1.2-1.92 2.8-1.92h21.13"
        fill="#d1a66c"
      />
      <path
        dataname="bronze base"
        d="M102.89 168.02v-10.89a1.4 1.4 0 00-1.44-1.34h-51.7a1.4 1.4 0 00-1.45 1.34v10.89h-1a1.45 1.45 0 00-1.51 1.39v.84a1 1 0 001 .94h57.78a.88.88 0 00.91-.85v-.92a1.46 1.46 0 00-1.51-1.4z"
        fill="#58595b"
      />
      <path
        dataname="bronze shaft"
        d="M90.04 148.06v-8.91a.34.34 0 00-.08-.23c-.84-1.11-8.19-11.16-6.72-23.51v-.07c.2-.69 3.49-12.21.09-20.83a.4.4 0 00-.37-.25h-14.7a.41.41 0 00-.38.25c-3.4 8.62-.11 20.14.09 20.83v.07c1.46 12.35-5.88 22.4-6.73 23.51a.4.4 0 00-.08.23v8.91a.4.4 0 01-.17.33l-9.7 6.68a.4.4 0 00.23.72h48.17a.39.39 0 00.22-.72l-9.7-6.68a.43.43 0 01-.17-.33z"
        fill="#e9b778"
      />
      <path
        dataname="bronze cup"
        d="M125.17 9.85H25.49s-1.19 75.29 42.5 80.51h14.68c43.69-5.22 42.5-80.51 42.5-80.51z"
        fill="#e9b778"
      />
      <path
        dataname="bronze shade 1"
        d="M25.71 9.85h99.8s1.14 74-42 80.8l-15.5-.29s44.11-17.53 44.53-75.65z"
        fill="#d9ab70"
      />
      <path
        dataname="bronze band"
        d="M67.71 94.13v-3.48a.29.29 0 01.28-.29h15.22a.28.28 0 01.28.29v3.48a.27.27 0 01-.28.28H67.99a.28.28 0 01-.28-.28z"
        fill="#d3a76d"
      />
      <rect
        dataname="bronze rim"
        x={22.23}
        width={106.75}
        height={9.85}
        rx={3.48}
        fill="#f3c98e"
      />
      <path
        dataname="bronze shade 2"
        fill="#d9ab70"
        d="M61.19 139.15h28.85v8.91H61.19z"
      />
      <path
        dataname="bronze highlight 1"
        d="M33.04 9.85S28.6 54.96 47.31 72.63c0 0-13.36-31.39-8.54-62.78z"
        fill="#ffd294"
      />
    </svg>
  );
}

export default SvgComponent;
