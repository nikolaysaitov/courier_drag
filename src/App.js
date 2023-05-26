import * as React from "react";
import { useState } from "react";
import { Reorder } from "framer-motion";
import { Item } from "./Item";
import { Switch, Button, Modal, Result } from "antd";
import Icon, { InfoCircleOutlined, CheckOutlined } from "@ant-design/icons";
import "./App.css";
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
  { id: 5, order: 108340, text: "Владивосток, ул Ладыгина, д 1, офис 12" },
  { id: 6, order: 16340, text: "Владивосток, ул Давыдова, д 111, офис 7/12" },
  { id: 7, order: 1086740, text: "Владивосток, ул Ленина, д 8, офис 17" },
  { id: 8, order: 18340, text: "Владивосток, ул Петрова, д 7, офис 6" },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  //Возможность изменить порядок вкл/выкл
  const [drag, setDrag] = useState(false);

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
    setDrag(checked);
  };

  // Модалка кнопки начала маршрута
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 1000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
    <div className="container__buttons">

      <div className="check__drag">
        <p className="switch__title">Изменить порядок маршрута</p>
        <Switch size="small" checked={drag} onChange={onChange} />
      </div>
      <div className="check__drag">
        {/* <p className="switch__title">Начать поездку</p> */}
        <Button type="primary" onClick={showModal} disabled={drag}>
          Выехал
        </Button>
      </div>

    </div>
      
      <Modal
        open={open}
        title="Внимание!"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Закрыть
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Начать
          </Button>,
          
        ]}
      ><Result
      status="warning"
      style={{fontSize: '13px'}}
      title="Нажимая кнопку 'Начать', клиенты получат уведомления, что вы выехали. Желаете начать маршрут?"
      className="result__go"
    />
     

      </Modal>

      <Reorder.Group axis="y" onReorder={setItems} values={items}>
        {items.map((item, index) => (
          <Item key={item.id} item={item} index={index} drag={drag} />
        ))}
      </Reorder.Group>


    </>
  );
}
