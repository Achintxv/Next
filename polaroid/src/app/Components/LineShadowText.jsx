import React from "react";

/**
 * LineShadowText Component
 * Creates a text effect with an animated diagonal line shadow.
 */
const LineShadowText = ({ 
  children, 
  shadowColor = "black", 
  as: Component = "span", 
  className = "" 
}) => {
  
  // Ensure children is a string to use as the data-text attribute
  const content = typeof children === "string" ? children : "";

  if (!content) {
    console.error("LineShadowText: children must be a string");
  }

  // Base classes for the animated shadow effect
  const shadowClasses = `
    relative z-0 inline-flex 
    after:absolute after:top-[0.04em] after:left-[0.04em] after:-z-10 
    after:bg-[linear-gradient(45deg,transparent_45%,var(--shadow-color)_45%,var(--shadow-color)_55%,transparent_0)] 
    after:bg-[length:0.06em_0.06em] after:bg-clip-text after:text-transparent 
    after:content-[attr(data-text)] 
    animate-line-shadow
  `.replace(/\s+/g, ' ').trim();

  return (
    <>
      <style>
        {`
          @keyframes line-shadow {
            0% { background-position: 0 0; }
            100% { background-position: 100% -100%; }
          }
          .animate-line-shadow::after {
            animation: line-shadow 15s linear infinite;
          }
        `}
      </style>
      <Component
        data-text={content}
        style={{ "--shadow-color": shadowColor }}
        className={`${shadowClasses} ${className}`}
      >
        {children}
      </Component>
    </>
  );
};

export default LineShadowText;