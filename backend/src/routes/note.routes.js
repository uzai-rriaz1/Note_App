import { Router } from "express";
import {
  createNote,
  deletenote,
  getnote,
  getNotes,
  updateNote,
} from "../controllers/note.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT);

router.route("/createnote").post(createNote);
router.route("/updatenote/:id").put(updateNote);
router.route("/notes/").get(getNotes);
router.route("/deletenote/:id").delete(deletenote);
router.route("/note/:id").get(getnote);
export default router;
