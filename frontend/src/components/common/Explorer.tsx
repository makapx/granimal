import { useEffect, useState } from "react";
import { getGenres } from "../../api/anime.api";

/**
 * Category explorer
 * 
 * @returns {JSX.Element} Explorer
 */
const Explorer = () => {
  const [categories, setCategories] = useState([""]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getGenres();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    categories && (
      <div className="dropdown dropdown-hover">
        <div tabIndex={0} role="button" className="btn m-1 btn-ghost text-base-100">
            Categories
        </div>
        <div className="p-8 z-50 shadow dropdown-content bg-base-100 rounded-box">
            <div className=" w-96 grid md:grid-cols-3 gap-4">
                {categories.map((category) => (
                    <a key={category} href="#">
                    {category}
                    </a>
                ))}
            </div>
        </div>
      </div>
    )
  );
};

export default Explorer;
