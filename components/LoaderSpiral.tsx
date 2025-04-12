export const SpiralLoader = ({ size = 150, speed = 2 }) => (
  <div style={{ width: size, height: size }}>
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Static Center Logo */}
      <circle cx="100" cy="100" r="100" fill="#008CFF" />
      <text
        x="100"
        y="115"
        textAnchor="middle"
        fontSize="60"
        fill="white"
        fontFamily="Arial"
        fontWeight="bold"
      >
        C
      </text>

      {/* Spiral Arcs & Nodes (Alternating Rotation) */}
      {[66, 52, 38, 24].map((radius, index) => {
        const isReverse = index % 2 !== 0;
        const duration = speed + index * 0.5;
        const nodeX = 100 + radius;
        return (
          <g
            key={index}
            style={{
              transformOrigin: "100px 100px",
              animation: `${isReverse ? "spin-reverse" : "spin"} ${duration}s linear infinite`,
            }}
          >
            <path
              d={`M${100 - radius},100 A${radius},${radius} 0 0,1 ${100 + radius},100`}
              stroke="white"
              strokeWidth={10}
              fill="none"
            />
            <circle cx={nodeX} cy="100" r="5" fill="white" />
          </g>
        );
      })}

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes spin-reverse {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-360deg); }
          }
        `}
      </style>
    </svg>
  </div>
);
