"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SocialCard from "src/components/SocialCard";

const Page = () => {
  // State for the current form inputs
  const [postObject, setPostObject] = useState({
    username: "",
    location: "",
    text: "",
    image: "",
  });
  const [previewImage, setPreviewImage] = useState(null);

  // State for all submitted posts
  const [posts, setPosts] = useState([]);

  // Update form input values
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPostObject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetPostObject = () => {
    setPostObject({
      username: "",
      location: "",
      text: "",
      image: "",
      })
  }

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const localStoragePosts = localStorage.getItem("posts");

    const postWithId = {
      ...postObject,
      id: uuidv4(),
      date: new Date()
    };

    if (localStoragePosts) {
      localStorage.setItem(
        "posts",
        JSON.stringify([
          ...JSON.parse(localStoragePosts),
          postWithId,
        ])
      );
      resetPostObject();
    } else {
      localStorage.setItem("posts", JSON.stringify([postWithId]));
      resetPostObject();
    }

  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Share your experience by filling out the form below:</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "username", placeholder: "Type your name here" },
          { name: "location", placeholder: "Type where you went here" },
          { name: "text", placeholder: "Type a description here" },
        ].map(({ name, placeholder }) => (
          <div key={name} className="flex flex-col">
            <label className="text-gray-700 font-bold capitalize mb-1">
              {name}
            </label>
            <input
              className="bg-gray-200 border-2 border-gray-300 rounded p-2"
              name={name}
              placeholder={placeholder}
              value={postObject[name]}
              onChange={handleInputChange}
              required
            />
          </div>
        ))}

<div className="flex flex-col mb-4">
  <label className="text-gray-700 font-bold mb-1">Paste Image URL</label>
  <input
    className="bg-gray-200 border-2 border-gray-300 rounded p-2"
    type="text"
    name="image"
    onChange={handleInputChange}
  />
  {postObject.image && (
    <img
      src={postObject.image || ""}
      alt="Preview"
      className="mt-2 w-48 h-auto rounded shadow"
    />
  )}
</div>

        <button
          type="submit"
          className="bg-[#3DB2FF] hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default Page;