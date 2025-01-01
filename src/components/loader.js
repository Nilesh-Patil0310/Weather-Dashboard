import React from 'react';

const Loader = () => {
  return (
    <div className="text-center py-4">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
