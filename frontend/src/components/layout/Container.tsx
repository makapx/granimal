const Container = ({ children }) => {
  return <main className="md:container md:mx-auto grid grid-flow-col">
    {children}
  </main>;
};

export default Container;
