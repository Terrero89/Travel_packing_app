import { useState } from "react";
import Logo from './Logo' 
import Form from './Form'
import PackingList from './PackingList' 
import Stats from './Stats'

import "./App.css";


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

  function handleClearList(){
    const confirmed = window.confirm('Are you sure you want to delete all items')
if(confirmed) {
  setItems([])
}

  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDelelteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}







