import React from "react";
import { Circle, Svg, Mask, G } from "react-native-svg";

const ProfileIcon = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="54"
      height="54"
      fill="none"
      viewBox="0 0 54 54"
    >
 
      <g filter="url(#filter0_d)">
        <Circle
          cx="27"
          cy="24"
          r="24"
          fill="#E77F64"
          fillOpacity="0.95"
        ></Circle>
      </g>
      <Mask
        id="mask0"
        width="48"
        height="48"
        x="3"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <Circle cx="27" cy="24" r="24" fill="#2F4357"></Circle>
      </Mask>
      
      <G fill="#FBEFE8" mask="url(#mask0)">
        <path d="M33.815 14.717a9.389 9.389 0 11-13.278 13.277 9.389 9.389 0 0113.278-13.277zM27.176 32.72c-8.184.01-14.816 6.642-14.825 14.825 0 .546.443.988.989.988h27.672a.988.988 0 00.988-.988c-.008-8.183-6.64-14.815-14.824-14.824z"></path>
      </G>
    </Svg>
  );
}

export default ProfileIcon;
