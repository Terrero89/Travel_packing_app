import "./App.css";
import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDelelteItem(id) {
    console.log(id);
    setItems((items) => [...items.filter((item) => item.id !== id)]);
  }

  function handleToggleItem(id) {
    setItems((items) => [
      ...items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      ),
    ]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDelelteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1> Travel List App</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handlerSubmit = (event) => {
    event.preventDefault();

    if (!description || !quantity) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem); // new item added from lifting the component up
    console.log(newItem);
    //clear input fields

    setDescription("");
    setQuantity(1);
  };

  return (
    <form className="add-form" onSubmit={handlerSubmit}>
      <h3>What do you need for your trip </h3>
      <select
        value={quantity}
        onChange={(e) => console.log(setQuantity(Number(e.target.value)))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>X</button>
    </li>
  );
}

function Stats({ items }) {

if(!items.length) return <p className="stats">
<em>Start adding some items to your list.</em>

</p>

  //!derive state
  //?it works for better performance, and to know when the state of a variable changes while avoiding unnecessary renders
  const numItems = items.length;
  const numsPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numsPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything ready to go."
          : `You have ${numItems} items on your list, and you already packed
        ${numsPacked} equal to (${percentage}%) of the total items`}
      </em>
    </footer>
  );
}
