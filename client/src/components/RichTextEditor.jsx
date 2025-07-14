import React, { useState } from 'react';


const RichTextEditor = ({ input, setInput }) => {
  const handleChange = (e) => {
    setInput({ ...input, description: e.target.value });
  };

  return (
    <textarea
      value={input.description}
      onChange={handleChange}
      placeholder="Add description."
      rows={5}
      className="border p-2 rounded"
    />
  );
};


export default RichTextEditor