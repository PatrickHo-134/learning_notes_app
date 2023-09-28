import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../App.css";

export const AutoHeightQuill = ({ content }) => {
  return (
    <div style={{ height: 'auto' }}
    >
      <ReactQuill
        value={content}
        readOnly // Set the readOnly prop to make the content read-only
        modules={{
          toolbar: false, // Set the toolbar to false to remove it
        }}
      />
    </div>
  );
};

export const NoteContent = ({ content, setContent }) => {
  return (
    <ReactQuill
      className="edit-learning-note-content"
      value={content}
      onChange={setContent}
      modules={{
        toolbar: [
          ["bold", "italic", "underline", "strike"], // toggled buttons
          ["blockquote", "code-block"],
          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }], // superscript/subscript
          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
          [{ direction: "rtl" }], // text direction

          [{ size: ["small", false, "large", "huge"] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],
          ["link", "image", "video"],
          ["clean"], // remove formatting button
        ],
      }}
    />
  );
};
