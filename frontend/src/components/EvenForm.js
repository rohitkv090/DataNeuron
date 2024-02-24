import React, { useState, useEffect, useContext } from "react";
import classes from "./css/EventForm.module.css";
import CountContext from "../store/count-context";

function EventForm({ event }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    date: "",
    description: "",
  });

  const countCtx = useContext(CountContext);

  useEffect(() => {
    setFormData({
      title: event ? event.title : "",
      image: event ? event.image : "",
      date: event ? event.date : "",
      description: event ? event.description : "",
    });
  }, [event]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (
      formData.title === "" ||
      formData.image === "" ||
      formData.date === "" ||
      formData.description === ""
    ) {
      window.alert("Please enter all the required fields");
      return;
    }

    let method = null;
    let url = null;
    if (event !== null) {
      const eventId = event.id;
      method = "PATCH";
      url = `${process.env.REACT_APP_BACKEND_URL}/events/${eventId}`;
    } else {
      method = "POST";
      url = `${process.env.REACT_APP_BACKEND_URL}/events`;
    }

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Couldn't save event data");
      }

      if (method === "PATCH") {
        countCtx.onUpdate();
      } else {
        countCtx.onAdd();
      }

      setIsSubmitting(false);
      window.alert(
        event !== null ? "Event has been updated" : "New Event Has been created"
      );
      setFormData({
        title: "",
        image: "",
        date: "",
        description: "",
      });
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  const cancelHandler = () => {
    setFormData({
      title: "",
      image: "",
      date: "",
      description: "",
    });
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <div>
        {event===null?<p>Add a New Event</p>:<p>Edit Event</p>}
      </div>
      <form onSubmit={onSubmitHandler} className={classes.form}>
        <p>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={onChangeHandler}
          />
        </p>
        <p>
          <label htmlFor="image">Image</label>
          <input
            id="image"
            type="url"
            name="image"
            required
            value={formData.image}
            onChange={onChangeHandler}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            name="date"
            required
            value={formData.date}
            onChange={onChangeHandler}
          />
        </p>
        <p>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            required
            value={formData.description}
            onChange={onChangeHandler}
          />
        </p>
        <div className={classes.actions}>
          <button type="button" onClick={cancelHandler}>
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting...." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EventForm;
