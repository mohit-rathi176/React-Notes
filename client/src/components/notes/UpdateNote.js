import useInput from "../../hooks/use-input";
import ReactDOM from "react-dom";

import classes from "./UpdateNote.module.css";

const isEmpty = (val) => val.trim() !== "";

const Backdrop = () => {
  return <div className={classes.backdrop} />;
};

const UpdateNoteModal = (props) => {
  const {
    value: title,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
  } = useInput(isEmpty, props.title);

  const {
    value: description,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
  } = useInput(isEmpty, props.description);

  const formIsValid = titleIsValid && descriptionIsValid;

  const noteUpdateHandler = (event) => {
    event.preventDefault();

    const note = {
      id: props.id,
      title: title,
      description: description,
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
          onClick={props.cancelNoteUpdate}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={classes["btn-primary"]}
          disabled={!formIsValid}
        >
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
        <UpdateNoteModal
          id={props.id}
          title={props.title}
          description={props.description}
          cancelNoteUpdate={props.cancelNoteUpdate}
          updateNoteHandler={props.updateNoteHandler}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default UpdateNote;
