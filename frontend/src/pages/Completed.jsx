import React, { useState } from "react";
import "./Completed.scss";
import { useMutation } from "@tanstack/react-query";
import client from "../react-query-client";


const Completed = ({ complete, taskId,taskTitle, fetcher }) => {
  const [isDone, setIsDone] = useState(complete);

  const mutationC = useMutation(
    (body) =>
    fetcher(`http://127.0.0.1:8000/api/task-update/${taskId}/`, body),
    {
      onSuccess(data) {
        console.log("Got response from backend", data);
        client.invalidateQueries("todos");
      },
      onError(error) {
        console.log("Got error from backend", error);
      },
    }
  );

  const handleChange = () => {
    if (isDone === false) {
      mutationC.mutate({  title:taskTitle,completed: true });
    } else {
      mutationC.mutate({ title:taskTitle,completed: false });
    }
    setIsDone((current) => !current);
  };

  return (
    <div className="Home_list-completed">
      {isDone ? (
        <input
          type="checkbox"
          name="complete"
          onChange={handleChange}
          checked
        />
      ) : (
        <input type="checkbox" name="complete" onChange={handleChange} />
      )}
    </div>
  );
};

export default Completed;