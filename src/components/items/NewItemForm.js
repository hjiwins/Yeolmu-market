import { useRef } from "react";

import styles from "./NewItemForm.module.css";

function NewItemForm(props) {
  const titleInputRef = useRef();
  const priceInputRef = useRef();
  const photoInputRef = useRef();
  const userNameInputRef = useRef();
  const detailInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const inputTitle = titleInputRef.current.value;
    const inputPrice = priceInputRef.current.value;
    const inputPhoto = photoInputRef.current.target.files[0];
    const inputUserName = userNameInputRef.current.value;
    const inputDetail = detailInputRef.current.value;

    const itemData = {
      title: inputTitle,
      price: inputPrice,
      photo: inputPhoto,
      userName: inputUserName,
      detail: inputDetail,
    };

    props.onAddItem(itemData);
  }


  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <label htmlFor="title">판매하고 싶은 물건</label>
      <input required id="title" type="text" ref={titleInputRef} />

      <label htmlFor="price">판매 가격</label>
      <input
        required
        id="price"
        type="number"
        ref={priceInputRef}
        placeholder="숫자만 입력 가능합니다"
      />

      <label htmlFor="photo">사진</label>
      <input id="photo" class={styles.photoUploader} type="file" accept="image/*" />
      <button className={styles.photoUploadBtn}>사진 업로드</button>

      <label htmlFor="user-name">작성자</label>
      <input required id="user-name" type="text" ref={userNameInputRef} />

      <label htmlFor="detail">내용</label>
      <textarea required id="detail" rows="10" cols="30" ref={detailInputRef} />

      <button className={styles.formSubmitBtn}>판매하기</button>
    </form>
  );
}

export default NewItemForm;
