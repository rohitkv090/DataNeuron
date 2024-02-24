import React, { useState } from "react";

const CountContext = React.createContext({
  deleteCount: 0,
  addCount: 0,
  updateCount: 0,
  onDelete: () => {},
  onAdd: () => {},
  onUpdate: () => {},
});

export const CounterContextProvider = (props) => {
  const [deleteCount, setDeleteCount] = useState(0);
  const [addCount, setAddCount] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);

  const onDeleteHandler = () => {
    setDeleteCount((prevState) => {
      return prevState + 1;
    });
  };

  const onAddHandler = () => {
    setAddCount((prevState) => {
      return prevState + 1;
    });
  };

  const onUpdatHandler = () => {
    setUpdateCount((prevState) => {
      return prevState + 1;
    });
  };

  return (
    <CountContext.Provider
      value={{
        deleteCount: deleteCount,
        addCount: addCount,
        updateCount: updateCount,
        onDelete: onDeleteHandler,
        onAdd: onAddHandler,
        onUpdate: onUpdatHandler,
      }}
    >
      {props.children}
    </CountContext.Provider>
  );
};

export default CountContext;
