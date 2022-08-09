import { useState } from "react";

import classes from "./AddNote.module.css";
// import axios from "axios";
import axios from "../axios/axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const AddNote = (props) => {

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const titleChangeHandler = (event) => {
		setTitle(event.target.value);
	};

	const descriptionChangeHandler = (event) => {
		setDescription(event.target.value);
	};

	const clearHandler = () => {
		setTitle("");
		setDescription("");
	};

	const addNote = async () => {
		const note = {
			title: title,
			description: description
		};

		try {
			const response = await axios.post("/notes", note, { withCredentials: true });
			toast.dismiss();
			toast.success("Note added successfully", {
				position: toast.POSITION.BOTTOM_RIGHT
			});
			clearHandler();
			props.addNote(response.data);
		}
		catch (error) {
			toast.dismiss();
			toast.error(error.response.data.error, {
				position: toast.POSITION.BOTTOM_RIGHT
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
					<input type="text" id="title" value={title} onChange={titleChangeHandler} />
				</div>
				<div className={classes["input-group"]}>
					<label htmlFor="description">Description</label>
					<input type="text" id="description" value={description} onChange={descriptionChangeHandler} />
				</div>
				<div className={classes["form-actions"]}>
					<button type='button' className={`${classes.btn} ${classes["btn-secondary"]}`} onClick={clearHandler}>Clear</button>
					<button type='submit' className={`${classes.btn} ${classes["btn-primary"]}`}>Add Note</button>
				</div>
			</form>
		</div>
	);
};

export default AddNote;
