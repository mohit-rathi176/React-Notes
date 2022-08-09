import classes from "./Note.module.css";

const Note = (props) => {

	const removeNote = () => {
		props.deleteNote(props.id);
	};

	const updateNote = () => {
		const note = {
			id: props.id,
			title: props.title,
			description: props.description
		};
		props.updateNote(note);
	};

  return (
		<li>
			<div className={classes.note}>
				<div className={classes["note-title"]}>
					{props.title}
				</div>
				<div className={classes["note-description"]}>
					{props.description}
				</div>
				<div className={classes["note-actions"]}>
					<button onClick={updateNote}><i className="fa-solid fa-pen"></i></button>
					<button onClick={removeNote}><i className="fa-solid fa-trash"></i></button>
				</div>
			</div>
		</li>
  );
};

export default Note;
