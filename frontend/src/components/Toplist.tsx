import { AnimeFragment } from "../api/types";

type ToplistProps = { media: AnimeFragment[] };


const Toplist = (props: ToplistProps) => {
    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full table-auto text-sm text-left rtl:text-right text-neutral dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 bg-violet-400 dark:bg-gray-800">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3 bg-violet-400">
                                Season
                            </th>
                            <th scope="col" className="px-6 py-3 bg-violet-400">
                                Genres
                            </th>
                            <th scope="col" className="px-6 py-3 bg-violet-400 dark:bg-gray-800">
                                Score
                            </th>
                            <th scope="col" className="px-6 py-3 bg-violet-400">
                                Episodes
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.media.map(media => (
                            <tr className="border-b border-gray-200 dark:border-gray-700" /**Riga**/>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white">
                                    {media.title}
                                </th>
                                <td className="px-6 py-4 bg-gray-50">
                                    {media.season} {media.seasonYear}
                                </td>
                                <td className="px-6 py-4 bg-gray-50">
                                    {media.genres.join(", ")}
                                </td>
                                <td className="px-6 py-4 bg-gray-50">
                                    {media.score}
                                </td>
                                <td className="px-6 py-4 bg-gray-50">
                                    {media.episodes}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default Toplist;