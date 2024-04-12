import { AnimeFragment } from "../../api/types";
import TableSkeleton from "./TableSkeleton";

type ToplistProps = { media: AnimeFragment[]; title?: string };

const Toplist = ({ media, title }: ToplistProps) => {
  const headers = ["Title", "Season", "Genres", "Score", "Episodes"];

  if (!media || media.length === 0) {
    return <TableSkeleton />;
  }

  return (
    <>
      {title && (
        <h2 className="text-2xl font-bold text-neutral py-2">{title}</h2>
      )}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full table-auto text-sm text-left rtl:text-right text-neutral">
          <thead>
            <tr className="border-b">
              {headers.map((header) => (
                <th key={header} className="py-3 px-6 bg-primary text-base-100">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {media.map((media) => (
              <tr className="border-b text-neutral font-medium" key={media.id}>
                <td className="px-6 py-4">{media.title}</td>
                <td className="px-6 py-4">
                  {media.season} {media.seasonYear}
                </td>
                <td className="px-6 py-4">{media.genres.join(", ")}</td>
                <td className="px-6 py-4">{media.score}</td>
                <td className="px-6 py-4">{media.episodes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Toplist;
