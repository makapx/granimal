import { useState } from "react";
import Button from "./Button";

const Search = () => {
  const [query, setQuery] = useState("");
  const search = () => {
    window.location.href = `/search/${query}`;
  };
  return (
    <>
      <div className="form-control">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Button variant="primary" text="Search" onClick={search} disabled={query === ""}/>
    </>
  );
};

export default Search;
