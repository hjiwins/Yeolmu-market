import { Link } from "react-router-dom";
import { useState } from "react";
import RegistrationForm from "../components/authentication/RegistrationForm";
import { storage } from "../firebase";
import { ref } from "@firebase/storage";
import { getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Register = () => {
  // const dispatch = useDispatch();
  const history = useHistory();
  const [uploadProgress, setUploadProgress] = useState(0);

  const sendRegistrationRequest = async (formData) => {
    // If no image attach then cancel
    if (!formData.image) return;

    // Start image upload to firebase
    const storageRef = ref(storage, `/avatars/${formData.username + "_avatar_" + Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, formData.image);

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
        // if avatar upload is successful
        // Get avatar url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("Url Received: ", url);
          // Start POST request
          fetch("http://localhost:3000/api/user/register", {
            method: "POST",
            body: JSON.stringify({ ...formData, image: url }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((data) => data.json())
            .then((result) => {
              console.log(result);
              if (result.errorMessage) {
                // if the form submit fails for any reason, then delete the uploaded avatar
                const avatarToDelete = ref(storage, uploadTask.snapshot.ref._location.path_);
                deleteObject(avatarToDelete)
                .then(() => {
                  console.log('avatar deleted successfully');
                  alert(`${result.errorMessage}`);
                })
                .catch(error => console.log(error));
              } else {
                // If everything is successfull, redirect to home.
                  alert(`User ${result.username} created successfully`);
                  history.push('/');
              }
            })
            .catch((error) => console.log(error));
          return;
        });
      }
    );
  };

  return (
    <section class="authenticationSection">
      <h1>회원가입</h1>
      <RegistrationForm
        onSubmit={sendRegistrationRequest}
        uploadProgress={uploadProgress}
      />
      <p>
        이미 회원가입 하셨나요? <Link to="/login">로그인하세요!</Link>
      </p>
    </section>
  );
};

export default Register;
