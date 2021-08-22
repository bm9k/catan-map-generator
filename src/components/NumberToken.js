import { numberColours } from "../data/colours";

export default function NumberToken(props) {
    const {number, size} = props;
  
    const dots = 6 - Math.abs(number - 7);
  
    const dotsLeft = -(dots / 2 - .5);
  
    const numberOffsetY = size * -.25;
    const dotPadX = size * .22;
    const dotOffsetY = size * .45;
    const dotRadius = size * .075;
    const textSize = size * .7;
  
    const colour = numberColours[dots === 5 ? "major" : "minor"];
  
    return <g>
      <circle cx={0} cy={0} r={size} fill="#eee"/>
      <text
        x={0}
        y={numberOffsetY}
        textAnchor="middle"
        dominantBaseline="central"
        fill={colour}
        fontSize={textSize}
      >{number}</text>
  
      {[...Array(dots)].map((_, i) => {
        return <circle
          cx={(dotsLeft + i) * dotPadX}
          cy={dotOffsetY}
          fill={colour}
          stroke="none"
          r={dotRadius}
        />
      })}
    </g>
  }