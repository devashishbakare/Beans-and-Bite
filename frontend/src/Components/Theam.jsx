import React from "react";

export const Theam = () => {
  return (
    <div className="h-[100vh] w-[100vw] flex flex-col-reverse sm:flex-col">
      <div className="hidden sm:h-[8vh] w-full max-w-[1250px] centerDiv">
        <Navbar />
      </div>
      <div className="h-[8vh] w-full max-w-[1250px] centerDiv sm:hidden">
        <MobileViewNavBar />
      </div>
      <div className="h-[92vh] w-full addBorder centerDiv">other content</div>
    </div>
  );
};
