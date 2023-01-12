import React, { useState } from "react";

const Input = () => {
  "use strict";
  const [FileInput, setFileInput] = useState("");
  const [text, setText] = useState("Download");


  // Check the url pattern
  const isValidUrl = (urlString) => {
    var urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // validate protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // validate fragment locator
    return !!urlPattern.test(urlString);
  };

  const download = (e) => {
    e.preventDefault();
    if (FileInput != "") {
      // console.log(url.href)
      if (isValidUrl(FileInput) == true) {
        let url = new URL(FileInput);
        fetchFile(url.href);
        setText("Downloading...");
      } else {
        alert("Please enter a valid URL ");
        setText("Download");
      }
    } else {
      alert("Enter URL");
    }
  };

  function fetchFile(url) {
    fetch(url)
      .then((res) => res.blob())
      .then((file) => {
        let tempUrl = URL.createObjectURL(file);
        // console.log(tempUrl);
        const aTag = document.createElement("a");
        aTag.href = tempUrl;
        aTag.download = url.replace(/^.*[\\\/]/, "");
        document.body.appendChild(aTag);
        aTag.click();
        setText("Download");
        URL.revokeObjectURL(tempUrl);
        aTag.remove();
      })
      .catch(() => {
        alert("Failed to download file!");
        setText("Download");
      });
  }

  return (
    <div className="w-3/4">
      <form action="#">
        <input
          type="url"
          placeholder="Paste your url.."
          className="px-3 py-3 my-7 text-xl  text-bold placeholder-sec text-sec relative bg-pri rounded  border-0 shadow outline-none focus:outline-none focus:ring w-full"
          onChange={(event) => setFileInput(event.target.value)}
          required
        />
        <button
          type="button"
          className="inline-block px-6 pt-2.5 pb-2 bg-secondary text-white font-medium text-xl leading-normal uppercase rounded shadow-md hover:bg-sec hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex align-center mx-auto md:text-2xl "
          onClick={download}
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="download"
            className="w-7 mr-2"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
            ></path>
          </svg>
          {text}
        </button>
      </form>
    </div>
  );
};

export default Input;
