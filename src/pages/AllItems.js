import { useState, useEffect } from "react";

import UploadedList from "../components/items/UploadedList";

function AllItems() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedItems, setLoadedItems] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    fetch("https://yeolmu-market-default-rtdb.firebaseio.com/items.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const items = [];

        for (const key in data) {
          const item = {
            id:key,
            ...data[key]
          }
          items.push(item)
        }

        setIsLoading(false);
        setLoadedItems(items);
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
