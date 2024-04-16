import React from "react";

const Container = ({ children }: { children: React.ReactNode}) => {
  return <main className="md:container md:mx-auto">
    {children}
  </main>;
};

export default Container;
