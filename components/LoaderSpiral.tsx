export const SpiralLoader = ({ size = 150, speed = 2 }) => (
  <div style={{ width: size, height: size }}>
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* <!-- Static Center Logo --> */}
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

      {/* <!-- Animated Spiral Paths --> */}
      <g
        style={{
          transformOrigin: "100px 100px",
          animation: `spin ${speed}s linear infinite`,
        }}
      >
        <path
          d="M60,100 A40,40 0 0,1 140,100"
          stroke="white"
          strokeWidth="10"
          fill="none"
        />
        <path
          d="M50,100 A50,50 0 0,1 150,100"
          stroke="white"
          strokeWidth="6"
          fill="none"
        />
        <path
          d="M40,100 A60,60 0 0,1 160,100"
          stroke="white"
          strokeWidth="4"
          fill="none"
        />
        <circle cx="140" cy="100" r="5" fill="white" />
        <circle cx="150" cy="100" r="5" fill="white" />
        <circle cx="160" cy="100" r="5" fill="white" />
      </g>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </svg>
  </div>
);
