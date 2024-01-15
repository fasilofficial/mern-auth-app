import React, { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { useSearchUsersMutation } from "../slices/adminApiSlice";

const Search = ({ handleSearch, searchLoading }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <InputGroup className="mt-4">
      <FormControl
        placeholder="Search for users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button variant="primary" onClick={() => handleSearch(searchTerm)}>
        {searchLoading ? "Searching..." : "Search"}
      </Button>
    </InputGroup>
  );
};

export default Search;
