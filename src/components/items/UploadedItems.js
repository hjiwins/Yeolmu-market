import style from "./UploadedItems.module.css";
import Card from "../ui/Card";

// TODO: Change name to UploadedItem or similar because this component represent just ONE item
function UploadedItems(props) {
  return (
    <li className={style.item}>
      <Card>
        <div className={style.image}>
          <img src={props.photo} alt={props.photo} />
        </div>
        <div className={style.content}>
          <h3>{props.title}</h3>
          <h4>{props.price}원</h4>
          <p>{props.seller}</p>
          <div className={style.action}>
            <p>LIKE❤︎</p>
          </div>
        </div>
      </Card>
      <hr />
    </li>
  );
}

export default UploadedItems;
