
import * as React from "react";
import { useState } from "react";
import { Reorder } from "framer-motion";
import { Item } from "./Item";
import './App.css';
const initialItems = [
  {
    id: 1,
    order: 107644,
    text: "Владивосток, ул Адмирала Кузнецова, д 18, кв 426",
  },
  { id: 2, order: 108486, text: "Владивосток, ул Луговая, д 64, кв 71" },
  { id: 3, order: 110316, text: "Владивосток, ул Нейбута, д 25" },
  {
    id: 4,
    order: 110372,
    text: "Владивосток, ул Черняховского, д 421, кв 42",
  },
  { id: 5, order: 108340, text: "Владивосток, ул Ладыгина, д 71, офис 1/12" },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  return (
    <Reorder.Group axis="y" onReorder={setItems} values={items}>
      {items.map((item, index) => (
        <Item key={item.id} item={item} index={index}/>
      ))}
    </Reorder.Group>
  );
}
