import asyncHandler from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/ApiResponse.js";
import { apiError } from "../utils/ApiError.js";
import { Note } from "../models/note.model.js";

const createNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content)
    throw new apiError(406, "There is No title or Content");

  const createdNote = await Note.create({
    title,
    content,
    createdBy: req.user.id,
  });

  res.status(200).json(new apiResponse("Note created succesfully", 200));
});

export { createNote };

const updateNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content)
    throw new apiError(402, "There is no content or title");

  const note = await Note.findOne({
    _id: id,
    createdBy: req.user.id,
  });

  if (!note) throw new apiError(400, "There is no Note");

  note.title = title;
  note.content = content;

  await note.save();

  res.status(200).json(new apiResponse("Note Updated Succesfully", 200, note));
});

export { updateNote };

const deletenote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const note = await Note.findOneAndDelete({ _id: id, createdBy: req.user.id });

  if (!note) throw new apiError(404, "There is no note");

  res.status(200).json(new apiResponse("Note deleted Successfully", 200));
});

export { deletenote };

const getNotes = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const notes = await Note.find({
    createdBy: req.user.id,
  }).sort({ createdAt: -1 });

  res.status(200).json(new apiResponse("Notes are fetched", 200, notes));
});

export { getNotes };

const getnote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) throw new apiError(400, "invalid note id");

  const note = await Note.findOne({ _id: id, createdBy: req.user.id });

  if (!note) throw new apiError(403, "There is no note");

  res.status(200).json(new apiResponse("note fetched succesfully", 200, note));
});

export { getnote };
