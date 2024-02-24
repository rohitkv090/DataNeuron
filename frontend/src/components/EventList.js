import classes from "./css/EventsList.module.css";

function EventsList({ events, eventClick }) {
  const fetchEventDetails = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/events/` + id
      );

      if (!response.ok) {
        throw new Error("Couldn't fetch details about this event");
      }

      const resData = await response.json();

      eventClick(resData.event);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>All Events</div>
      <div className={classes.list}>
        {events.map((event) => (
          <div
            key={event.id}
            className={classes.item}
            onClick={() => fetchEventDetails(event.id)}
          >
            <div className={classes.content}>
              <h2>{event.title}</h2>
              <time>{event.date}</time>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default EventsList;
