import { FormEventHandler, useState } from "react";
import Button from "./Button";
import { createSearchParams, useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const queryIsValid = query.length >= 3;

  const onSearch = (event?: React.FormEvent) => {
    event?.preventDefault();
    if ( queryIsValid ){
      navigate({
        pathname: '/search', 
        search: createSearchParams({
          search: query
        }).toString()
    });
    }
  };

  return (
    <>
    <form onSubmit={onSearch} className="join">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto join-item"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      <Button variant="primary"  className="join-item" text="Search" onClick={onSearch} disabled={!queryIsValid}/>
    </form>
    </>
  );
};

export default Search;
