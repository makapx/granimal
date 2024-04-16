import { useEffect, useState } from "react";
import { getGenres } from "../../api/anime.api";

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
        <div tabIndex={0} role="button" className="btn m-1 btn-ghost text-base-100">
            Categories
        </div>
        <div className="p-8 z-50 shadow dropdown-content bg-base-100 rounded-box">
            <div className=" w-96 grid md:grid-cols-3 gap-4">
                {categories && !loading && categories.map((category) => (
                    <a key={category} href={`/category/${category.toLowerCase().trim().replace(" ", "-")}`} className="cursor-pointer">
                    {category}
                    </a>
                ))}
            </div>
        </div>
      </div>
  );
};

export default Explorer;
