import style from './UploadedList.module.css';
import UploadedItems from "./UploadedItems";

// TODO: Change name to UploadedItem or similar because this component represent just ONE item

function UploadedList(props) {
  return (
    <ul className={style.list}>
      {props.items.map((item) => (
        <UploadedItems
          key={item._id}
          id={item._id}
          photo={item.photo}
          title={item.title}
          price={item.price}
          seller={item.seller}
          description={item.description}
        />
      ))}
    </ul>
  );
}

export default UploadedList;
