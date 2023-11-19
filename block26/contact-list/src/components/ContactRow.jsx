import { useState } from "react";

export default function ContactRow({ setSelectedContactId, contact }) {
  const [singleContact, setSingleContact] = useState([]);

  return (
    <tr
      onClick={() => setSelectedContactId(contact.id)}
      className="general-view"
    >
      <td>{contact.name}</td>
      <td>{contact.email}</td>
      <td>{contact.phone}</td>
    </tr>
  );
}
