import { Link } from "react-router-dom";

const Navigation = () => {
  const classes = {
    container: "max-w-7xl w-screen select-none",
    title: "text-6xl font-light text-center mb-8",
    links:
      "text-gray-900 px-4 p-2 rounded-md active:bg-gray-300 hover:bg-gray-200",
    nav: "pl-4 pb-2 mb-8 uppercase border-solid border-b-[1.75px] border-gray-300 tracking-widest w-full",
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>JANE DOE</h1>
      {/* Navigation bar */}
      <nav className={classes.nav}>
        <div className="flex gap-8 items-center">
          <Link to={"/"} className={classes.links}>
            Home
          </Link>
          <Link to={"/about"} className={classes.links}>
            About
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
