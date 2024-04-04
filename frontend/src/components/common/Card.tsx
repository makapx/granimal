const Card = ({
  title,
  image,
  genres,
}: {
  title: string;
  image: string;
  genres: string[];
}) => {
  return (
    <>
      <div className="card  w-96 shadow-xl h-auto image-full">
          <figure>
            <img
              className="rounded-t-lg w-full h-48 object-cover object-center  "
              src={image}
              alt="Shoes"
            />
          </figure>

          <div className="card-body bg-gradient-to-t from-black flex flex-col">

            <div className="flex-grow"></div>
            
            <h2 className="card-title">{title}</h2>

            <div className="card-actions bg-transparent justify-end">
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