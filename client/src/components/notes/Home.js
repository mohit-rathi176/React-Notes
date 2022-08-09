import { useState, useEffect } from "react";

import classes from "./Home.module.css";
import AddNote from "./AddNote";
import NotesContainer from "./NotesContainer";
import UpdateNote from "./UpdateNote";
// import axios from "axios";
import axios from "../axios/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateNoteDetails, setUpdateNoteDetails] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/notes", {
          withCredentials: true,
        });
        setNotes(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const addNote = (note) => {
    setNotes((prevNotes) => {
      return [...prevNotes, note];
    });
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `/notes/${id}`,
        {
          withCredentials: true,
        }
      );
      setNotes((prevNotes) => {
        return prevNotes.filter((note) => note._id != id);
      });
      toast.success("Note deleted", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (error) {
      toast.error("Could not delete note", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      console.log(error);
    }
  };

  const updateNote = (note) => {
    setUpdateNoteDetails({
      id: note.id,
      title: note.title,
      description: note.description,
    });
    setIsUpdate(true);
  };

  const cancelNoteUpdate = () => {
    setIsUpdate(false);
    setUpdateNoteDetails(null);
  };

  const updateNoteHandler = async (note) => {
    try {
      const response = await axios.put(
        `/notes/${note.id}`,
        { title: note.title, description: note.description },
        { withCredentials: true }
      );
      setNotes((prevNotes) => {
        const newNotes = [];
        prevNotes.forEach((oldNote) => {
          if (oldNote._id == note.id) {
            newNotes.push({
              _id: oldNote._id,
              title: note.title,
              description: note.description,
            });
          } else newNotes.push(oldNote);
        });
        return newNotes;
      });
      setIsUpdate(false);
      setUpdateNoteDetails(null);
      toast.success("Note updated", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (error) {
      toast.error(error.response.data.error, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      console.log(error);
    }
  };

  return (
    <section className={classes.section}>
      <AddNote addNote={addNote} />
      <NotesContainer
        notes={notes}
        isLoading={isLoading}
        deleteNote={deleteNote}
        updateNote={updateNote}
      />
      {isUpdate && (
        <UpdateNote
          id={updateNoteDetails.id}
          title={updateNoteDetails.title}
          description={updateNoteDetails.description}
          cancelNoteUpdate={cancelNoteUpdate}
          updateNoteHandler={updateNoteHandler}
        />
      )}
    </section>
  );
};

export default Home;
