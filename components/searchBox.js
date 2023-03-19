import React, { useEffect, useState } from "react";
import { Hits, useSearchBox, useHits } from "react-instantsearch-hooks-web";
import { Input, InputSize, List } from "@ripe-ui/react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

function Hit({ hit }) {
  console.log(hit);
  if (hit.type == "component") {
    return (
      <div>
        <h1>{hit.title}</h1>
        <p>{hit.description}</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>{hit.name}</h1>
        <p>{hit.description}</p>
      </div>
    );
  }
}

export function SearchBox(props) {
  const router = useRouter();
  const { hits } = useHits();
  let [query, setQuery] = useState("");
  const { refine } = useSearchBox(props);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) refine(query);
      console.log(hits);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div style={{ width: "400px" }}>
      <Input
        key="search"
        placeholder="Search documentation..."
        color="white"
        onChange={(event) => setQuery(event.target.value)}
        value={query}
        size={InputSize.Full}
      />
      {query ? (
        <div
          style={{
            position: "fixed",
            margin: "2px",
            marginTop: "5px",
            width: "396px",
          }}
        >
          <List
            items={hits.map((hit) => {
              console.log(hit);
              return { name: hit.title, value: hit.path };
            })}
            itemClicked={(item) => router.push(item.value)}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
