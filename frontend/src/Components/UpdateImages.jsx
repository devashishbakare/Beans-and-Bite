import React from "react";
import { useState } from "react";
export const UpdateImages = () => {
  const [imageUrl, setImageUrl] = useState();
  const handleUploadPicture = async (picture) => {
    try {
      if (
        picture.type === "image/jpeg" ||
        picture.type === "image/jpg" ||
        picture.type === "image/png" ||
        picture.type === "image/x-icon" ||
        picture.type === "image/vnd.microsoft.icon" ||
        picture.type === "image/webp" ||
        picture.type === "image/svg+xml"
      ) {
        const data = new FormData();
        data.append("file", picture);
        data.append("upload_preset", "Social Media App");
        data.append("cloud_name", "djgouef8q");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/djgouef8q/upload",
          {
            method: "post",
            body: data,
          }
        );
        const uploadedImageUrl = await response.json();
        setImageUrl(uploadedImageUrl.url.toString());
      }
    } catch (error) {
      //console.log(error);
    }
  };
  const handleCopyLink = () => {
    console.log("handleCopyLink");
    const textArea = document.createElement("textarea");
    textArea.value = imageUrl;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    setImageUrl("");
    alert("Link copied to clipboard");
  };

  return (
    <>
      <div className="h-[200px] w-[80vw] centerDiv centerDiv flex-col  gap-4 centerToPage">
        <div className="h-[50px] min-w-[70vw] w-auto addBorder centerDiv">
          <input
            type="file"
            className="ml-10 addBorder"
            onChange={(e) => handleUploadPicture(e.target.files[0])}
          />
        </div>
        <div className="h-[50px] min-w-[70vw] w-auto addBorder centerDiv">
          {imageUrl}
        </div>
        <button
          className="h-[50px] w-[100px] text-[green] addBorder rounded-lg"
          onClick={handleCopyLink}
        >
          Copy Link
        </button>
      </div>
    </>
  );
};
/*

*/
