const Toplist = () => {
    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full table-auto text-sm text-left rtl:text-right text-neutral dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 bg-violet-400 dark:bg-gray-800">
                                Titolo
                            </th>
                            <th scope="col" className="px-6 py-3 bg-violet-400">
                                Genere
                            </th>
                            <th scope="col" className="px-6 py-3 bg-violet-400 dark:bg-gray-800">
                                Categoria
                            </th>
                            <th scope="col" className="px-6 py-3 bg-violet-400">
                                Episodi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200 dark:border-gray-700" /**Riga**/>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white">
                                Fairy Tail
                            </th>
                            <td className="px-6 py-4 bg-gray-50">
                                Avventura
                            </td>
                            <td className="px-6 py-4 bg-gray-50">
                                Anime
                            </td>
                            <td className="px-6 py-4 bg-gray-50">
                                175
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700"/**Riga**/>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-100 dark:text-white">
                                Inuyasha
                            </th>
                            <td className="px-6 py-4 bg-gray-100">
                                ...
                            </td>
                            <td className="px-6 py-4 bg-gray-100">
                                ...
                            </td>
                            <td className="px-6 py-4 bg-gray-100">
                                ...
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700" /**Riga**/>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                .......
                            </th>
                            <td className="px-6 py-4 bg-gray-50">
                                ...
                            </td>
                            <td className="px-6 py-4 bg-gray-50">
                                ......
                            </td>
                            <td className="px-6 py-4 bg-gray-50">
                                ....
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700" /**Riga**/>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-100 dark:text-white">
                                .....
                            </th>
                            <td className="px-6 py-4 bg-gray-100">
                                ...
                            </td>
                            <td className="px-6 py-4 bg-gray-100">
                                ...
                            </td>
                            <td className="px-6 py-4 bg-gray-100">
                                ....
                            </td>
                        </tr>
                        <tr /**Riga**/>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white">
                                .....
                            </th>
                            <td className="px-6 py-4 bg-gray-50">
                                ......
                            </td>
                            <td className="px-6 py-4 bg-gray-50">
                                ...
                            </td>
                            <td className="px-6 py-4 bg-gray-50">
                                ...
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </>
    );
}
export default Toplist;