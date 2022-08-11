import useInput from "../../hooks/use-input";

import classes from "./AddNote.module.css";
// import axios from "axios";
import axios from "../axios/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const isEmpty = (val) => val.trim() !== "";

const AddNote = (props) => {
  const {
    value: title,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput(isEmpty);

  const {
    value: description,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput(isEmpty);

  const formIsValid = titleIsValid && descriptionIsValid;

  const clearHandler = () => {
    resetTitle();
    resetDescription();
  };

  const addNote = async () => {
    const note = {
      title: title,
      description: description,
    };

    try {
      const response = await axios.post("/notes", note, {
        withCredentials: true,
      });
      toast.dismiss();
      toast.success("Note added successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      clearHandler();
      props.addNote(response.data);
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.error, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const addNoteHandler = (event) => {
    event.preventDefault();

    addNote();
  };

  return (
    <div className={classes["add-note-container"]}>
      <form className={classes["add-note-form"]} onSubmit={addNoteHandler}>
        <div className={classes["input-group"]}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
          />
          {titleHasError && <p>Please enter a title</p>}
        </div>
        <div className={classes["input-group"]}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={descriptionChangeHandler}
            onBlur={descriptionBlurHandler}
          />
          {descriptionHasError && <p>Please enter a description</p>}
        </div>
        <div className={classes["form-actions"]}>
          <button
            type="button"
            className={classes["btn-secondary"]}
            onClick={clearHandler}
          >
            Clear
          </button>
          <button
            type="submit"
            className={classes["btn-primary"]}
            disabled={!formIsValid}
          >
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;
