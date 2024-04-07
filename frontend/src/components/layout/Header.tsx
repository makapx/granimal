import ProfileMenu from "../common/ProfileMenu";
import Explorer from "../common/Explorer";
const Header = () => {
  return (
    <div className="navbar bg-neutral">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-base-100">Granimal</a>
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
