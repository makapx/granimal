import { useEffect, useState } from "react";
import { getGenres } from "../../api/anime.api";
import { Link, createSearchParams } from "react-router-dom";

/**
 * Category explorer
 *
 * @returns {JSX.Element} Explorer
 */
const Explorer = () => {
  const [categories, setCategories] = useState([] as string[]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const data = await getGenres();
      setCategories(data);
      setLoading(false);
    };
    fetchCategories();
  }, []);

  return (
    <div className="dropdown dropdown-hover">
      <div
        tabIndex={0}
        role="button"
        className="btn m-1 btn-ghost text-neutral-content"
      >
        Categories
      </div>
      <div className="p-8 z-50 shadow dropdown-content bg-base-100 rounded-box">
        <div className=" w-96 grid md:grid-cols-3 gap-4">
          {categories &&
            !loading &&
            categories.map((category) => (
              <Link
                key={category}
                to={{pathname: '/search', search: createSearchParams({genres:[category]}).toString()}}
                className="cursor-pointer text-base-100-content"
              >
                {category}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Explorer;
