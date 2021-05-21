import { useHistory } from "react-router-dom";

import NewItemForm from "../components/items/NewItemForm";

function NewItem() {
  const history = useHistory();

  function addNewItemHandler(itemData) {
    fetch("https://yeolmu-market-default-rtdb.firebaseio.com/items.json", {
      method: "POST",
      body: JSON.stringify(itemData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      history.replace("/");
    });
  }

  return (
    <section>
      <h1>🥬 팔고싶은 물건이 있으세요?</h1>
      <p>여기에 적어주세요✓</p>
      <NewItemForm
        onAddItem={addNewItemHandler}
      />
    </section>
  );
}

export default NewItem;
