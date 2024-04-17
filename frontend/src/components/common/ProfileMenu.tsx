import { useSelector } from "react-redux";
import { Link, LinkProps } from "react-router-dom";
import { useLogoutAction, selectUser } from "../../store/user.store";
import { useCreateToastAction } from "../../store";
import profileImage from "../../../assets/john wick.webp";

const ProfileMenu = () => {
  const user = useSelector(selectUser);
  const createToast = useCreateToastAction();
  const logoutAction = useLogoutAction();
  
  const logout = () => {
    logoutAction();
    createToast({title: 'Bye bye', message: 'Hai effettuato il logout!'}, 5e3);
  }

  let items: Array<{name: string, url: string, props?: Partial<LinkProps> }> = [
    { name: "Login", url: "/login", props: { className: "font-bold"} },
    { name: "Offline watchlist", url: "/profile" },

  ];

  if (user) {
    items = [
      { name: user.username, url: "/profile", props: { className: "font-bold"} },
      { name: "Watchlist", url: "/profile" },
      { name: "Settings", url: "/" },
      { name: "Logout", url: "/", props: { onClick: logout} },
    ];
  }

  return (
    <>
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={profileImage}
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="mt-3 z-[1] p-2 shadow menu  dropdown-content bg-base-100 rounded-box w-52"
      >

        {items.map((item, index) => (
          <li key={index}>
            <Link to={item.url} {...item.props} >{item.name}</Link>
          </li>
        ))}
      </ul>

    </>
  );
};
export default ProfileMenu;
/**
 * 
 */