import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Contact from "./Contact";

export default function Contacts() {
  return (
    <>
      <div>
        <h1>Contacts</h1>
        <b>List of contacts:</b>
        <br />
        <ul>
          <li><Link to="/contacts/1">Contact 1</Link></li>
          <li><Link to="/contacts/2">Contact 2</Link></li>
          <li><Link to="/contacts/3">Contact 3</Link></li>
        </ul>
      </div>

      <Routes>
        <Route path="/:id" element={<Contact />} />
      </Routes>
    </>
  );
}
