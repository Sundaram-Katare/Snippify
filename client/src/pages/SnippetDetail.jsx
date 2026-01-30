// src/components/SnippetDetail.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSnippetById } from "../features/snippets/snippetSlice.js";

const SnippetDetail = () => {
  const { id } = useParams(); // get snippet id from route
  const dispatch = useDispatch();

  const { snippet, loading, error } = useSelector((state) => state.snippet);

  useEffect(() => {
    // dispatch thunk to fetch snippet by id
    dispatch(getSnippetById({ id, token: localStorage.getItem("token") }));
  }, [dispatch, id]);

  if (loading) return <p>Loading snippet...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!snippet) return <p>No snippet found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{snippet.title}</h2>
      <p><strong>Language:</strong> {snippet.language}</p>
      <pre
        style={{
          background: "#f4f4f4",
          padding: "10px",
          borderRadius: "5px",
          overflowX: "auto",
        }}
      >
        {snippet.code}
      </pre>
      <p><strong>Description:</strong> {snippet.description}</p>
      <p><strong>Created At:</strong> {new Date(snippet.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default SnippetDetail;