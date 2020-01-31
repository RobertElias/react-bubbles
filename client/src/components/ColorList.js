import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  //Stretch to addColor and setAddColor
  const [addColor, setAddColor] = useState({
    color: '',
    code: {hex: ''},
    id: Date.now()
  })


  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth().put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then( () => {
        alert('Color has been updated')
        axiosWithAuth().get('/api/colors')
        .then(res => updateColors(res.data))
        .catch(err => console.log(err))
      })
      .catch(err => {
        console.log(err)
      })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth().delete(`/api/colors/${color.id}`)
      .then(()=> {
        alert('Color has been Deleted!!')
        axiosWithAuth().get('/api/colors')
          .then(res => updateColors(res.data))
          .catch(err => console.log(err))
          setEditing(false);
      })
      .catch(err => {
        console.log(err)
      })
      
  };
  //Stretch Goal createColor
  const newColorSubmit = e => {
    e.preventDefault();
    axiosWithAuth().post('/api/colors', addColor)
    .then(()=> {
      alert('Color Was Added')
      axiosWithAuth().get('/api/colors')
      .then(res => updateColors(res.data))
      .catch(err => console.log(err))
    })
  }

  const createOnChange = e => {
    e.preventDefault();
    setAddColor({
      ...addColor, [e.target.name]: e.target.value
    })
  }
  

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

<h2>Add New Color</h2>
      <form onSubmit={newColorSubmit}>
        <input
        type="text"
        name='color'
        value={addColor.color}
        onChange={createOnChange}
        placeholder="New Color Name"
        />
      
        <input
        type="text"
        name="color"
        value={addColor.color.hex}
        onChange={
          e => setAddColor({...colorToEdit, code: {hex: e.target.value}})}
        placeholder="Hex Code"
        />
        <button type='submit'>Create New Color</button>
      </form>
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      
      
    </div>
  );
};

export default ColorList;
