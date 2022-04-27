import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import {
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { ref } from "@firebase/storage";
import { storage } from "../firebase";
import NewItemForm from "../components/items/NewItemForm";

function NewItem() {
  const history = useHistory();
  const username = useSelector((state) => state.authSlice.userData.username);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Redirect the user if they are not logged in
  if (username === null) {
    alert("Please log in before uploading an item");
    history.replace("/login");
  }

  function uploadNewItem(itemData) {
    console.log(itemData)
    // Checks if there is an image to be upload, if not return
    if (!itemData.photo) return;

    // Start image upload to firebase
    const storageRef = ref(
      storage,
      `/items/${username + "_item_" + Date.now()}`
    );
    const uploadTask = uploadBytesResumable(storageRef, itemData.photo);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("current progress", progress);
        setUploadProgress(progress);
      },
      (error) => {
        // if error during upload
        console.log("Error happened during the avatar upload");
        throw Error(error);
      },
      () => {
        // if the item picture upload is successful then get the url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("Url Received: ", url);

          // Start POST request
          const finalItemData = {
            ...itemData,
            photo: url,
            username: username,
          };
          fetch("http://localhost:3000/api/item/upload", {
            method: "POST",
            body: JSON.stringify(finalItemData),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((data) => data.json())
            .then((result) => {
              console.log(result);
              if (result.errorMessage) {
                // if the form submit fails for any reason, then delete the uploaded avatar
                const avatarToDelete = ref(
                  storage,
                  uploadTask.snapshot.ref._location.path_
                );
                deleteObject(avatarToDelete)
                  .then(() => {
                    console.log("avatar deleted successfully");
                    alert(`${result.errorMessage}`);
                  })
                  .catch((error) => console.log(error));
              } else {
                // If everything is successfull, redirect to home.
                alert(`Item Uploaded Successfully!`);
                history.replace("/");
              }
            })
            .catch((error) => console.log(error));
          return;
        });
      }
    );
  }

  return (
    <section>
      <h1>🥬 팔고싶은 물건이 있으세요?</h1>
      <p>여기에 적어주세요✓</p>
      <NewItemForm onAddItem={uploadNewItem} uploadProgress={uploadProgress}/>
    </section>
  );
}

export default NewItem;
