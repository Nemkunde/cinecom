import React from "react";

function MovieInformationBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex my-4">
      <div className="flex p-4 bg-gray-900 text-white rounded-md lg:text-2xl">
        {children}
      </div>
    </div>
  );
}

export default MovieInformationBox;
