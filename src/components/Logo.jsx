const Logo = ({ className = "w-16 h-16" }) => {
  return (
    <div className="logo" style={{ display: 'inline-block' }}>
      <svg
        viewBox="0 0 80 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ display: 'block', width: '100%', height: '100%' }}
      >
        {/* Gradient definition for text */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c4b5fd" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>
        </defs>
        
        {/* Text "JG" with gradient matching theme */}
        <text
          x="40"
          y="28"
          fill="url(#logoGradient)"
          fontSize="24"
          fontWeight="800"
          fontFamily="Poppins, sans-serif"
          textAnchor="middle"
          dominantBaseline="middle"
          letterSpacing="-1"
        >
          JG
        </text>
      </svg>
    </div>
  );
};

export default Logo;
