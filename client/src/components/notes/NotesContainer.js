import classes from "./NotesContainer.module.css";
import Note from "./Note";

const NotesContainer = (props) => {

  const isEmpty = props.notes.length === 0;
  const isLoading = props.isLoading;

  return (
    <div className={classes["notes-container"]}>
      {isLoading && <p>Fetching your notes...</p>}
      {!isLoading && isEmpty && <p>You do not have any notes. Create a new note.</p>}
      {!isLoading && !isEmpty && <ul>
        {props.notes.map((note) => 
          <Note
            key={note._id}
            id={note._id}
            title={note.title}
            description={note.description}
            deleteNote={props.deleteNote}
            updateNote={props.updateNote}
          />
        )}
      </ul>}
    </div>
  );
};

export default NotesContainer;
