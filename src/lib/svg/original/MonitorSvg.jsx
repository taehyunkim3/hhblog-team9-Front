import React from "react";

const MonitorSvg = ({
  width = "400px",
  height = "400px",
  IMAGEURL = "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQkrjYxSfSHeCEA7hkPy8e2JphDsfFHZVKqx-3t37E4XKr-AT7DML8IwtwY0TnZsUcQ",
}) => (
  <>
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 188 142.9"
      xmlSpace="preserve"
      style={{ width, height }}
    >
      {" "}
      <image
        x="4%" // You may need to adjust these
        y="0%" // You may need to adjust these
        width="92%" // You may need to adjust these
        height="76%" // You may need to adjust these
        xlinkHref={IMAGEURL}
        preserveAspectRatio="xMidYMid slice"
      />
      <path
        fill="black"
        d="M7.4,0h173.2c2,0,3.9,0.8,5.2,2.2l0,0c1.3,1.3,2.2,3.2,2.2,5.2v104.5c0,2-0.8,3.9-2.2,5.2s-3.2,2.2-5.2,2.2H7.4c-2,0-3.9-0.8-5.2-2.2l0,0c-1.3-1.4-2.2-3.2-2.2-5.2V7.4c0-2,0.8-3.9,2.2-5.2l0,0l0,0l0,0l0,0C3.5,0.8,5.4,0,7.4,0L7.4,0z M176.5,11.5h-165v96.3h165V11.5L176.5,11.5z"
      />{" "}
      <path
        fill="black"
        d="M79,107.8h30.1h3.8l1.5,3.6l9.8,23.5l3.3,8h-8.6H69.2h-8.6l3.3-8l9.8-23.5l1.5-3.6L79,107.8L79,107.8z M105.2,119.4H82.8l-5,12h32.4L105.2,119.4z"
      />
    </svg>
  </>
);

export default MonitorSvg;
