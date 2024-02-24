import { useContext } from "react";
import CountContext from "../store/count-context";
import classes from "./css/ApiCount.module.css"; 

const ApiCounter = (props) => {
  const countCtx = useContext(CountContext);

  return (
    <ul className={classes.list}> 
      <li>Delete Count: {countCtx.deleteCount}</li>
      <li>Update Count Count: {countCtx.updateCount}</li>
      <li>Add Count: {countCtx.addCount}</li>
    </ul>
  );
};

export default ApiCounter;
