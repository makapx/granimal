import ProfileMenu from "../common/ProfileMenu";
import Explorer from "../common/Explorer";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="navbar bg-neutral">
      <div className="flex-1">
        <Link to='/' className="btn btn-ghost text-xl text-base-100">
          Granimal
        </Link>
        <Explorer />
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
};
export default Header;
