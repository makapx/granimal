const Card = ({
  title,
  description,
  image,
  genres,
}: {
  title: string;
  description: string;
  image: string;
  genres: string[];
}) => {
  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl h-auto">
        <figure>
          <img
            className="rounded-t-lg w-full h-48 object-cover object-center blur-sm"
            src={image}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
          <div className="card-actions justify-end">
            {genres &&
              genres.slice(0, 3).map((genre) => (
                <div key={genre} className="badge badge-secondary text-base-100">
                  {genre}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
