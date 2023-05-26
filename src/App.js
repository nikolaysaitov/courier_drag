import * as React from "react";
import { useState } from "react";
import { Reorder } from "framer-motion";
import { Item } from "./Item";
import { Switch, Button, Modal, Result, Dropdown, Space, message } from "antd";
import { DownOutlined, PhoneOutlined, RedoOutlined } from "@ant-design/icons";

import { TileLayer } from "react-leaflet/TileLayer";
import { MapContainer } from "react-leaflet";
import { Popup } from "react-leaflet/Popup";
import { Marker } from "react-leaflet/Marker";

import IconTruck from "../src/icons/IconTruck";
import IconFinish from "../src/icons/IconFinish";

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
  { id: 8, order: 18340, text: "Владивосток, ул Ризеншнауцера-Циммер-Вандершпигеля, д 7, офис 6" },
  { id: 9, order: 14340, text: "Владивосток, ул Адыгина, д 9, офис 142" },
  { id: 10, order: 1670, text: "Владивосток, ул Ли, д 191, офис 7912" },
  { id: 11, order: 176740, text: "Владивосток, ул Хренова, д 24, офис 14" },
  { id: 12, order: 1640, text: "Владивосток, ул Парк Авеню, д 88, офис 36" },
];


export default function App() {
  const [adress, setAdress] = useState(initialItems);
console.log("initialItems:", initialItems)
console.log("adress:", adress)
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

  // Свайп вверх вниз блока с маршрутами
  const [swipeDirection, setSwipeDirection] = useState(null);

  const handleTouchStart = (event) => {
    setSwipeDirection(null);
    const touch = event.touches[0];
    setSwipeDirection({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (event) => {
    const touch = event.changedTouches[0];
    const xDiff = touch.clientX - swipeDirection.x;
    const yDiff = touch.clientY - swipeDirection.y;
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        // swipe right
      } else {
        // swipe left
      }
    } else {
      if (yDiff > 0) {
        // swipe down
        setSwipeDirection("down");
      } else {
        // swipe up
        setSwipeDirection("up");
      }
    }
  };
// Меню аккаунта водителя
  const handleMenuClick = (e) => {
    console.log("click", e);
  };
  const items = [
    {
      label: "Изменить пароль",
      key: "1",
      // icon: <UserOutlined />,
    },
    {
      label: "Выйти",
      key: "2",
      // icon: <UserOutlined />,
    },
    
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <>
      <MapContainer center={[43.0956391, 131.9037986]} zoom={13} scrollWheelZoom={false}>
        <Dropdown menu={menuProps} >
          <Button style={{ zIndex: "99999", position: "absolute", right: "10px", top: "10px", outlineStyle: "none" }}>
            <Space>
              Мистер Вандершпигель
              <DownOutlined />
            </Space>
          </Button>
          
        </Dropdown>
        <a href="tel:+79999999999"><PhoneOutlined style={{fontSize: "18px"}} className="phone__dispatcher"/></a>
        
        <a href="#" onClick={() => window.location.reload()}>
        <RedoOutlined style={{fontSize: "18px"}} className="phone__update"/>
</a>
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[43.0956391, 131.9037986]}>
        <Popup>
        {/* <a target="_blank" rel="noopener noreferrer" href="yandexnavi://build_route_on_map?lat_to=43.13002&lon_to=131.92016"> */}
        <a target="_blank" rel="noopener noreferrer" href="dgis://2gis.ru/routeSearch/rsType/car/to/30.149939,59.849767">
        Владивосток, ул Ризеншнауцера-Циммер-Вандершпигеля, д 7, офис 6
        </a>
      </Popup>
        </Marker>

        <Marker position={[43.0966391, 131.9137986]} icon={IconTruck}></Marker>
        <Marker position={[43.0926391, 131.9537986]} icon={IconFinish}></Marker>
        
      </MapContainer>
      <div className="main__routes__block">
        <div
          className={
            swipeDirection === "down"
              ? "main__routes__block block d-flex flex-column align-items-center down"
              : "main__routes__block block d-flex flex-column align-items-center"
          }
        >
          <div className="button__swipe__div" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <button className="swipe_line mt-2 mb-1">{/* <span className="arrow"></span> */}</button>
          </div>

          <div className="container__buttons" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
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
            centered
            open={open}
            title="Внимание!"
            onOk={handleOk}
            onCancel={handleCancel}
            style={{ zIndex: "9999" }}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Закрыть
              </Button>,
              <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                Начать
              </Button>,
            ]}
          >
            <Result
              status="warning"
              style={{ fontSize: "13px" }}
              title="Нажимая кнопку 'Начать', клиенты получат уведомления, что вы выехали. Желаете начать маршрут?"
              className="result__go"
            />
          </Modal>
          <Reorder.Group axis="y" onReorder={setAdress} values={adress} className="ul__routes">
            {adress.map((item, index) => (
              <Item key={item.id} item={item} index={index} drag={drag} />
            ))}
          </Reorder.Group>
        </div>
      </div>
    </>
  );
}
