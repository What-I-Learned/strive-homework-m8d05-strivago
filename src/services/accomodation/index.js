import express from "express";
import AccomodationModel from "./schema.js";

const accomodationRouter = express.Router();

accomodationRouter.get("/", async (req, res, next) => {
  try {
    const accomodations = await AccomodationModel.find().populate({
      path: "host",
      select: "name",
    });

    res.send(accomodations);
  } catch (err) {
    next(err);
  }
});

accomodationRouter.get("/:id", async (req, res, next) => {
  try {
    const accomodation = await AccomodationModel.findById(req.params.id);
    if (accomodation) {
      res.send(post);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
});

// HOST ONLY

accomodationRouter.post("/", async (req, res, next) => {
  try {
    //   req.body.host = req.user;
    const newAccomodation = new AccomodationModel(req.body);
    await newAccomodation.save();
    res.status(201).send(newAccomodation);
  } catch (err) {
    next(err);
  }
});

accomodationRouter.put("/:id", async (req, res, next) => {
  try {
    const modifiedAccomodation = await AccomodationModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send(modifiedAccomodation);
  } catch (err) {
    next(err);
  }
});

accomodationRouter.delete("/:id", async (req, res, next) => {
  try {
    await AccomodationModel.findByIdAndDelete(req.params.id);
    res.send("deleted");
  } catch (err) {
    next(err);
  }
});
export default accomodationRouter;
