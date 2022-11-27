import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";
import { env } from "../config";
function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {

    getNotes();
  }, []);
  let getNotes = async () => {
    let res = await axios.get(`${env.api}/api/notes`, {
      headers: { Authorization: window.localStorage.getItem("app-token") },
    });
    console.log(res);
    setNotes(res.data);
  };

  const deleteNote = async (id) => {
    try {
      if (window.localStorage.getItem("app-token")) {
        await axios.delete(`${env.api}/api/notes/${id}`, {
          headers: { Authorization: window.localStorage.getItem("app-token") },
        });
        getNotes();

      }
    } catch (error) {
      window.location.href = '/';
    }
  }

  return (
    <div className="container p-5">
      <div className="row">
        {notes.map((note) => {
          return (
            <div
              className="col-lg-4 col-md-6 col-sm-8 pt-5 px-3"
              key={note._id}
            >
              <div
                className="card cards h-100  mb-3"
                style={{ background: "rgb(7,25,63)" }}
              >
                <div className="card-body ">
                  <h5 className="card-title text-center pb-3 text-uppercase">
                    {note.title}
                  </h5>
                  <p className="card-text">{note.content}</p>
                </div>
                <p className="text-end px-3" style={{ color: "#ffcd71" }}>
                  {format(note.date)}
                </p>
                <div className="card-footer bg-transparent d-flex justify-content-around border-none text-uppercase">
                  {note.name}

                  <Link to={`/portal/edit/${note._id}`} className="text-light ">
                    Edit
                  </Link>
                </div>
                <button className="bg-transparent btn btn-outline-none text-light position-absolute top-0 end-0" onClick={() => deleteNote(note._id)}>
                  X
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
