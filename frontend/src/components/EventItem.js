import React from "react";
import classes from "./css/EventItem.module.css";

const EventItem = ({ event, setFormEvent, onDelete }) => {
  const deleteHandler = () => {
    onDelete(event.id);
  };

  const editHandler = () => {
    setFormEvent({ ...event });
  };

  const eventItem = event && (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <button onClick={deleteHandler}>Delete</button>
        <button onClick={editHandler}>Edit</button>
      </menu>
    </article>
  );

  return eventItem;
};

export default EventItem;
