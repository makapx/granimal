const Grid = ({ children, columns, rows }: {children: any, columns: number, rows: number}) => {
    return (
        <main className={`grid grid-cols-${columns} grid-rows-${rows}`}>
            {children}
        </main>
    );
};
export default Grid;