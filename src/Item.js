import * as React from "react";
import { useMotionValue, Reorder, useDragControls } from "framer-motion";
import { useRaisedShadow } from "./use-raised-shadow";
import { ReorderIcon } from "./Icon";


export const Item = (props) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={props.item}
      id={props.item.id}
      style={{ boxShadow, y }}
      dragListener={true}
      dragControls={dragControls}
    ><p className="item_text_queue" >{props.index + 1}</p>
      <span><p className="item_text" >{props.item.text}</p></span>
      <ReorderIcon dragControls={dragControls} />
    </Reorder.Item>
  );
};
