import React, { useState } from "react";
import "./adminsection.scss";
import { API_BASE_URL } from "../../support/constants";
import storageHelper from "../../support/storageUtils";

const sectionOptions = [
  { value: "text", children: "Sección de texto" },
  { value: "image", children: "Imagen" },
  { value: "quote", children: "Cita en cursiva" },
];

const renderSection = (section) => {
  switch (section.type) {
    case "text":
      return (
        <textarea
          {...section.props}
          key={`textarea-${section.index}`}
          data-testid="added-field"
          data-index={section.index}
        />
      );
    case "image":
      return (
        <input
          {...section.props}
          key={`image-${section.index}`}
          data-testid="added-field"
          data-index={section.index}
        />
      );
    case "quote":
      return (
        <input
          {...section.props}
          key={`quote-${section.index}`}
          data-testid="added-field"
          data-index={section.index}
        />
      );
    default:
      return null;
  }
};

const buildNewSection = (type) => {
  return {
    text: {
      type,
      props: {
        placeholder: "Ingrese el texto de la sección",
        title: "Ingrese el texto de la sección",
        className: "added-field",
        value: "",
      },
    },
    image: {
      type,
      props: {
        type: "text",
        placeholder: "Ingrese la url de la imagen a insertar",
        className: "added-field",
        value: "",
      },
    },
    quote: {
      type,
      props: {
        type: "text",
        placeholder: "Ingrese el texto de la cita",
        className: "added-field",
        value: "",
      },
    },
  }[type];
};

const NewArticleForm = () => {
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState("text");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const cleanupForm = () => {
    setSections([]);
    setTitle("");
    setImage("");
  };

  const selectChangeHandler = (e) => setSelectedSection(e.target.value);
  const addSectionHandler = () =>
    setSections((prev) => [...prev, buildNewSection(selectedSection)]);
  const savePostHandler = () => {
    fetch(`${API_BASE_URL}/posts`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: storageHelper.getLocal("access_token"),
      },
      body: JSON.stringify({
        post: {
          title,
          image,
          body: JSON.stringify(
            sections.map(({ type, props: { value } }) => ({
              type,
              value,
            }))
          ),
        },
      }),
    }).then((res) => {
      if (res.ok) {
        cleanupForm();
      }
    });
  };

  const sectionChangeHandler = (e) => {
    e.preventDefault();
    e.persist();
    setSections((prev) => {
      const newState = prev.slice();
      const idx = e.target.dataset.index;
      newState[idx].props = {
        ...prev[idx].props,
        value: e.target.value,
      };
      return newState;
    });
  };

  const titleChangeHandler = (e) => setTitle(e.target.value);
  const imageChangeHandler = (e) => setImage(e.target.value);
  return (
    <section
      data-testid="new-article-form"
      className="admin-section-new-article"
    >
      <h2>Crear nuevo artículo</h2>
      <hr />
      <input
        type="text"
        name="title"
        title="Ingrese el título del artículo"
        placeholder="Ingrese el título del artículo"
        data-testid="post-title-input"
        onChange={titleChangeHandler}
        value={title}
      />
      <input
        type="text"
        name="mainImageUrl"
        title="Ingrese la url de la imagen principal del artículo"
        placeholder="Ingrese la url de la imagen principal del artículo"
        data-testid="main-image-url-input"
        onChange={imageChangeHandler}
        value={image}
      />
      {sections.map((sec, i) =>
        renderSection({
          ...sec,
          props: { ...sec.props, onChange: sectionChangeHandler },
          index: i,
        })
      )}
      <div className="new-field-adder">
        <select
          onChange={selectChangeHandler}
          value={selectedSection}
          data-testid="new-field-type-selector"
        >
          {sectionOptions.map((props) => (
            <option {...props} key={`option-${props.value}`} />
          ))}
        </select>
        <button onClick={addSectionHandler}>Agregar</button>
      </div>
      <button onClick={savePostHandler} className="post-submit-button">
        Guardar
      </button>
    </section>
  );
};

export default NewArticleForm;
