import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Create = () => {
  const [input, setInput] = useState("");
  const queryParams = new URLSearchParams(window.location.search);
  const [apiKey, setApiKey] = useState(null);

  useEffect(() => {
    for (const [key, value] of queryParams) {
      console.log({ key, value });
      if (key === "apiKey") {
        console.log("apiKey set!", value);
        setApiKey(value);
      }
    }
  }, []);

  const createTeam = () => {
    if (apiKey !== null) {
      const updateAPICall = `http://localhost:7005/newTeam?apiKey=${apiKey}`;

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Name: input }),
      };

      fetch(updateAPICall, requestOptions)
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          if (data.Team.acknowledged) {
            window.location.href = `/?apiKey=${apiKey}`;
          }
        })
        .catch((e) => console.log(e));
    } else {
      console.log("APIKEY NULL");
    }
  };
  return (
    <>
      <div className="d-flex align-items-center justify-content-center  min-vh-100 flex-column">
        <div className="d-flex justify-content-center align-items-center  flex-column ">
          <h1>Creating a New Team!</h1>
          <div className="d-flex m-3 ">
            <input
              className="p-3 mr-2"
              type="text"
              value={input}
              placeholder="Team Name"
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="btn btn-primary mx-2" onClick={createTeam}>
              Create Team!
            </button>
          </div>
        </div>
        <div className="d-flex flex-column ">
          <NavLink to={`/?apiKey=${apiKey}`} className={"btn btn-secondary"}>
            Go Back
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Create;
