import { useState, useEffect } from "react";

import UploadedList from "../components/items/UploadedList";

function AllItems() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedItems, setLoadedItems] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    fetch("http://localhost:3000/api/item/get")
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        // The json data is directly passed to the child component where the loop + render will occurr.
        setLoadedItems(data);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>로딩중...</p>
      </section>
    );
  }

  return (
    <div>
      <h1>🔥 지금 판매하고 있어요!</h1>
      <UploadedList items={loadedItems} />
    </div>
  );
}

export default AllItems;
