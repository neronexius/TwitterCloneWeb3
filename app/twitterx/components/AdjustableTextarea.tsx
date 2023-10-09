import React, { useState, useEffect } from 'react';

function AutoAdjustingTextarea() {
  const [text, setText] = useState('');
  const [styling, useStyling] = useState<any>({
    resize: 'none',
  })

  const handleTextChange = (event:any) => {
    const textarea = event.target;
    setText(event.target.value);
    autoAdjustTextarea(textarea);
  };

  const autoAdjustTextarea = (element:any) => {
    element.style.height = 'auto'; // Reset the height to auto to get the new scrollHeight
    element.style.height = `${element.scrollHeight}px`; // Set the height based on scrollHeight
  };

  useEffect(() => {
    // Re-adjust textarea height when the window is resized
    const handleResize = () => {
      useStyling({
        resize: 'none',
        maxHeight: "100%"
      })
      
    };

    // Attach the resize event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <textarea
      className="auto-adjusting-textarea"
      style={styling}
      value={text}
      onChange={handleTextChange}
      placeholder="Type here..."
    />
  );
}

export default AutoAdjustingTextarea;
