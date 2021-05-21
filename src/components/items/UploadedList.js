import style from './UploadedList.module.css';
import UploadedItems from "./UploadedItems";

function UploadedList(props) {
  return (
    <ul className={style.list}>
      {props.items.map((item) => (
        <UploadedItems
          key={item.id}
          id={item.id}
          image={item.image}
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
