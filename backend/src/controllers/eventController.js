const Event = require("../models/events");
const {
  isValidText,
  isValidDate,
  isValidImageUrl,
} = require("../util/validation");

exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find({});

    res.send({ events });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.addEvent = async (req, res, next) => {
  try {
    const data = req.body;

    let errors = {};

    if (!isValidText(data.title)) {
      errors.title = "Invalid title.";
    }

    if (!isValidText(data.description)) {
      errors.description = "Invalid description.";
    }

    if (!isValidDate(data.date)) {
      errors.date = "Invalid date.";
    }

    if (!isValidImageUrl(data.image)) {
      errors.image = "Invalid image.";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({
        message: "Adding the event failed due to validation errors.",
        errors,
      });
    }

    const event = new Event({
      title: data.title,
      image: data.image,
      date: data.date,
      description: data.description,
    });

    await event.save();

    res.send({ message: "Event have been added", event });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getEventById = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).send({ message: "Id is required" });
    }

    const event = await Event.findOne({ id: id });

    if (!event) {
      return res.status(404).send({ message: "Event not found" });
    }

    res.send({ event });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    const data = req.body;
    const id = req.params.id;

    if (!id) {
      return res.status(400).send({ message: "Id is required" });
    }

    let errors = {};

    if (!isValidText(data.title)) {
      errors.title = "Invalid title.";
    }

    if (!isValidText(data.description)) {
      errors.description = "Invalid description.";
    }

    if (!isValidDate(data.date)) {
      errors.date = "Invalid date.";
    }

    if (!isValidImageUrl(data.image)) {
      errors.image = "Invalid image.";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({
        message: "Updating the event failed due to validation errors.",
        errors,
      });
    }

    const dataToUpdate = req.body;

    const updatedEvent = await Event.findOneAndUpdate({ id }, dataToUpdate, {
      new: true,
    });

    if (!updatedEvent) {
      return res.status(404).send({ message: "Event not found" });
    }

    res.send({ message: "Event updated.", event: updatedEvent });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).send({ message: "Id is required" });
    }

    await Event.findOneAndDelete({ id });

    res.send({ message: "Event has been deleted" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
