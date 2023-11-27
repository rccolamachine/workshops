import { useState, useEffect } from "react";
import "../App.css";

export default function SelectedContact({
  selectedContactId,
  setSelectedContactId,
}) {
  const [contact, setContact] = useState([null]);
  useEffect(() => {
    async function fetchContact(selectedContactId) {
      try {
        const res = await fetch(
          `https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users/${selectedContactId}`
        );
        const json = await res.json();
        setContact(json);
      } catch (error) {
        console.error(error);
      }
    }
    fetchContact(selectedContactId);
  }, []);

  return (
    <div className="single-contact-view">
      <h2>{contact.name}</h2>
      <h3>Contact: </h3>
      <div>
        <b>Username:</b> {contact.username}
      </div>
      <div>
        <b>Email:</b> {contact.email}
      </div>
      <div>
        <b>Phone:</b> {contact.phone}
      </div>
      <div>
        <b>Website:</b> {contact.website}
      </div>
      <h3>
        Location: {{ ...contact.address }.street}, {{ ...contact.address }.city}
      </h3>
      <h3>Company: {{ ...contact.company }.name}</h3>
      <div>{{ ...contact.company }.bs}</div>
      <div>"{{ ...contact.company }.catchPhrase}"</div>
      <button
        className="back-button"
        onClick={() => setSelectedContactId(null)}
      >
        Go Back
      </button>
    </div>
  );
}
