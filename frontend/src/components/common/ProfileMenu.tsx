const ProfileMenu = () => {
  const isLoggedIn = true;
  let items = [
    { name: "Login", url: "/login" },
    { name: "Offline watchling", url: "#" },
  ];

  if (isLoggedIn) {
    items = [
      { name: "Profile", url: "/profile" },
      { name: "Watchlist", url: "/watchlist" },
      { name: "Settings", url: "/settings" },
      { name: "Logout", url: "/logout" },
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
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
      >
        {items.map((item, index) => (
          <li key={index}>
            <a href={item.url}>{item.name}</a>
          </li>
        ))}
      </ul>
    </>
  );
};
export default ProfileMenu;
