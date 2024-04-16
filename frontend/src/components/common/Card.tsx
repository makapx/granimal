import { Link } from "react-router-dom";

const Card = ({
  title,
  image,
  genres,
  episode,
  url,
}: {
  title: string;
  image?: string;
  genres?: string[];
  episode?: number;
  url: string;
}) => {
  return (
    <>
      <Link to={url}>
        <div className="card max-w-96 shadow-xl h-auto image-full max-h-96">
          {episode && (
            <span className="badge badge-accent badge-sm w-9 h-9 absolute top-6 right-6 z-40">
              {episode}
            </span>
          )}
          {image && (
            <figure>
              <img
                className="rounded-t-lg w-full h-48 object-cover object-center"
                src={image}
                alt={title}
              />
            </figure>
          )}

          <div className="card-body rounded-b-lg bg-gradient-to-t from-black flex flex-col">
            <div className="flex-grow"></div>
            <h2 className="card-title">{title}</h2>

            <div className="card-actions bg-transparent justify-end">
              {genres &&
                genres.slice(0, 3).map((genre) => (
                  <div
                    key={genre}
                    className="badge badge-secondary text-base-100"
                  >
                    {genre}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
export default Card;
