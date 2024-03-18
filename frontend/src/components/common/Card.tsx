const Card = () => {
  return (
    <>
      <div className="relative bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
        <img
          className="w-full h-auto rounded-xl"
          src="../assets/img/900x500/img1.jpg"
          alt="Image Description"
        />
        <div className="absolute top-0 start-0 end-0">
          <div className="p-4 md:p-5">
            <h3 className="text-lg font-bold text-gray-800">Card title</h3>
            <p className="mt-1 text-gray-800">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <p className="mt-5 text-xs text-gray-500">
              Last updated 5 mins ago
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
