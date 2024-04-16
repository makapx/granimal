import ProfileMenu from "../common/ProfileMenu";
import Explorer from "../common/Explorer";
import { Link } from "react-router-dom";
import ThemeSwitcher from "../common/ThemeSwitcher";
import Search from "../common/Search";
const Header = () => {
  return (
    <div className="navbar bg-neutral">
      <div className="flex-1">
        <Link to='/' className="btn btn-ghost text-xl text-neutral-content">
          Granimal
        </Link>
        <Explorer />
      </div>
      <div className="flex-none gap-2">
        <Search />
        <div className="dropdown dropdown-end">
          <ProfileMenu />
        </div>
        <ThemeSwitcher />
      </div>
    </div>
  );
};
export default Header;
