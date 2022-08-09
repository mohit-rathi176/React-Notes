import { useState } from "react";
import ReactDOM from "react-dom";

import classes from "./UpdateNote.module.css";

const Backdrop = () => {
  return <div className={classes.backdrop} />;
};

const UpdateNoteModal = (props) => {
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const noteUpdateHandler = (event) => {
    event.preventDefault();

    const note = {
      id: props.id,
      title: title,
      description: description
    };
    props.updateNoteHandler(note);
  };

  return (
    <form className={classes.overlay} onSubmit={noteUpdateHandler}>
      <div className={classes["input-group"]}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={titleChangeHandler}
        />
      </div>
      <div className={classes["input-group"]}>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={descriptionChangeHandler}
        />
      </div>
      <div className={classes["form-actions"]}>
        <button type="button" className={`${classes.btn} ${classes["btn-secondary"]}`} onClick={props.cancelNoteUpdate}>
          Cancel
        </button>
        <button type="submit" className={`${classes.btn} ${classes["btn-primary"]}`}>
          Update
        </button>
      </div>
    </form>
  );
};

const UpdateNote = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <UpdateNoteModal id={props.id} title={props.title} description={props.description} cancelNoteUpdate={props.cancelNoteUpdate} updateNoteHandler={props.updateNoteHandler} />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default UpdateNote;
