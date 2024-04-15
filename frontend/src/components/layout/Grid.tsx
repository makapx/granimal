const Grid = ({ children}: {children: any}) => {
    return (
        <main className="grid grid-cols-1 grid-rows-auto md:grid-cols-3 xl:grid-cols-5 gap-5 p-5">
            {children}
        </main>
    );
};
export default Grid;