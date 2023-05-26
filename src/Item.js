import * as React from "react";
import { useState } from "react";
import { useMotionValue, Reorder, useDragControls } from "framer-motion";
import { useRaisedShadow } from "./use-raised-shadow";
import { ReorderIcon } from "./Icon";
import { Col, Row, Button, Modal } from "antd";
import Icon, { InfoCircleOutlined, CheckOutlined } from "@ant-design/icons";

export const Item = (props) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();

//Модалка инфо:
  const [isModalOpenInfo, setIsModalOpenInfo] = useState(false);
  const showModalInfo = () => {
    setIsModalOpenInfo(true);
  };
  const handleOkInfo = () => {
    setIsModalOpenInfo(false);
  };
  const handleCancelInfo = () => {
    setIsModalOpenInfo(false);
  };

  //Модалка выполнено:
  const [isModalOpenDone, setIsModalOpenDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const showModalDone = () => {
    setIsModalOpenDone(true);
  };
  const handleOkDone = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpenDone(false);
    }, 1000);
  };
  const handleCancelDone = () => {
    setIsModalOpenDone(false);
  };

  return (
    <>
      <Reorder.Item value={props.item} id={props.item.id} style={{ boxShadow, y }} dragListener={props.drag} dragControls={dragControls}>
        <Row justify="space-between" align="middle">
          <Col span={2}>
            <p className="item_text_queue">{props.index + 1}</p>
          </Col>
          <Col span={15}>
            <p className="item_text">{props.item.text}</p>
          </Col>
          <Col span={7} className="col__end">
            <CheckOutlined className="button__done" onClick={showModalDone} />
            <InfoCircleOutlined className="button__info" onClick={showModalInfo} />
            <ReorderIcon dragControls={dragControls} className="button__info" />
          </Col>
        </Row>
      </Reorder.Item>
      <Modal title="Информация о заказе:" open={isModalOpenInfo} onOk={handleOkInfo} onCancel={handleCancelInfo} cancelText="Отмена">
        <p>Имя: Валентина Туманова</p>
        <p>Телефон: 79846613788</p>
        <p>Время заказа: 21 мая 2023 г. 3:15</p>
        <p>Место покупки: ИНТЕРНЕТ-МАРКЕТПЛЕЙС ОЗОН ДВ</p>
        <p>Комментарий: (НАЛ) OZON , ЗВОНОК ЗА ЧАС - 8 952 081 11 41 , доп. номер - 8 994 010 20 29 , Ботанический сад , частный дом</p>
      </Modal>

      <Modal title="Подтверждение" open={isModalOpenDone} cancelText="Отмена" onCancel={handleCancelDone} footer={[
          <Button key="back" onClick={handleCancelDone}>
            Закрыть
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOkDone}>
            Выполнено!
          </Button>,
          
        ]}>
        <p>Вы уверены?</p>
        
      </Modal>
    </>
  );
};
