import { useEffect } from "react";

export default async function Account(props) {
  console.log(props.token);

  useEffect(() => {
    async function getAccount() {
      try {
        const response = await fetch(
          "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${props?.token}`,
            },
          }
        );
        const result = await response.json();
        console.log(result);
      } catch (error) {
        alert(error);
      }
    }
    getAccount();
  }, []);

  return (
    <div id="account" className="account">
      Account
    </div>
  );
}
