import React, { useState, useEffect, useContext } from "react";
import { useResizable } from "react-resizable-layout";
import Splitter from "./Splitter";

import EventsList from "../EventList";
import EventItem from "../EventItem";
import EventForm from "../EvenForm";
import ApiCounter from "../ApiCount";
import CountContext from "../../store/count-context";

import "./css/Resizable.css";

const Resizable = () => {

  // defining properties of resizable components
  const {
    isDragging: isFirstHorizontalComponentDragging,
    position: firstHorizontalComponentH,
    splitterProps: verticalComponentDragBarProps,
  } = useResizable({
    axis: "y",
    initial: 150,
    min: 50,
    reverse: true,
  });
  const {
    isDragging: isSecondComponentDragging,
    position: secondHorizontalComponentW,
    splitterProps: secondHorizontalComponentDragBarProps,
  } = useResizable({
    axis: "x",
    initial: 250,
    min: 50,
  });
  const {
    isDragging: isThirdHorizontalComponentDragging,
    position: thirdHorizontalComponentW,
    splitterProps: thirdHorizontalComponentDragBarProps,
  } = useResizable({
    axis: "x",
    initial: 200,
    min: 50,
    reverse: true,
  });

  const countCtx = useContext(CountContext);



  const [editEvent, setEditEvent] = useState(null);
  const [event, setEvent] = useState(null);
  const [events, setEvents] = useState([]);

  const onEventClick = (event) => {
    setEvent({ ...event });
  };

  const onEditClickHandler = async (event) => {
    setEditEvent({ ...event });
  };

  // deleting event
  const deleteHandler = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/events/` + id, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Event data can't be delete");
    }

    countCtx.onDelete();

    window.alert("Event data has been delete");
    await loadEvents();
    setEvent(null);
  };

  //getting events
  const loadEvents = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/events`);

      if (!response.ok) {
        throw new Error("Couldn't fetch events");
      }

      const resData = await response.json();
      console.log(resData);
      setEvents(resData.events);
    } catch (error) {
      console.error(error);
    }
  };


  // updating count on screen
  useEffect(() => {
    loadEvents();
    setEvent(null)
  }, [countCtx.addCount, countCtx.deleteCount, countCtx.updateCount]);
  

  return (
    <div
      className={`flex flex-column h-screen bg-dark font-mono color-white overflow-hidden`}
    >
      <div className={`flex grow`}>
        <div
          className={`shrink-0 contents ${isSecondComponentDragging ? "dragging" : ""}`}
          style={{ width: secondHorizontalComponentW }}
        >
          <EventsList events={events} eventClick={onEventClick} />
        </div>
        <Splitter isDragging={isSecondComponentDragging} {...secondHorizontalComponentDragBarProps} />
        <div className={`flex grow`}>
          <div className={`grow bg-darker contents`}>
            {event ? (
              <EventItem
                setFormEvent={onEditClickHandler}
                onDelete={deleteHandler}
                event={event}
              />
            ) : (
              <p>Selected Event Will be Show Here</p>
            )}
          </div>
          <Splitter isDragging={isThirdHorizontalComponentDragging} {...thirdHorizontalComponentDragBarProps} />
          <div
            className={`shrink-0 contents ${
              isThirdHorizontalComponentDragging ? "dragging" : ""
            }`}
            style={{ width: thirdHorizontalComponentW }}
          >
            <EventForm event={editEvent} />
          </div>
        </div>
      </div>
      <Splitter
        dir={"horizontal"}
        isDragging={isFirstHorizontalComponentDragging}
        {...verticalComponentDragBarProps}
      />
      <div
        className={`shrink-0 bg-darker contents ${
          isFirstHorizontalComponentDragging ? "dragging" : ""
        }`}
        style={{ height: firstHorizontalComponentH }}
      >
        <ApiCounter />
      </div>
    </div>
  );
};

export default Resizable;
