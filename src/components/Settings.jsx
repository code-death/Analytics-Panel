import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateArray } from "../features/dataSlice";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";

const Settings = (props) => {
  const dispatch = useDispatch();
  const arr = useSelector((state) => state.data.value.array);
  const [newArr, setNewArr] = useState(arr);
  const containerArr = [{ title: "container", id: "container-1" }];

  const handleDragEnd = (result) => {
    const {destination, source, draggableId} = result
    const childToAdd = newArr.filter(child => child.id === draggableId)[0]
    if(!destination) {
      return
    }

    if(destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    const updatedArr = Array.from(newArr)

    updatedArr.splice(source.index, 1)
    updatedArr.splice(destination.index, 0, childToAdd)

    setNewArr(updatedArr)
    dispatch(updateArray(updatedArr))
  };

  const handleDragClick = (e) => {
    let updatedArr = [];

    const indexArr = newArr.map((child, i) => {
      if (child.heading === e.target.innerHTML) {
        return 1;
      } else {
        return 0;
      }
    });
    const indexNumber = indexArr.indexOf(1);

    if (e.target.innerHTML === "Date" || e.target.innerHTML === "App") {
      updatedArr = newArr;
    } else if (newArr[indexNumber].isActive) {
      updatedArr = newArr.map((obj, i) => {
        if (i == indexNumber) {
          return { ...obj, isActive: false };
        } else {
          return obj;
        }
      });
    } else {
      updatedArr = newArr.map((obj, i) => {
        if (i == indexNumber) {
          return { ...obj, isActive: true };
        } else {
          return obj;
        }
      });
    }
    setNewArr(updatedArr);
  };

  const handleApplyChanges = () => {
    props.handleClose();
    dispatch(updateArray(newArr));
  };

  const handleClose = () => {
    props.handleClose();
  };

  return (
    <div className="settingsContainer">
      <h1 className="headingSmall">Dimensions and Metrics</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="dragGroup">
          {containerArr.map((childCont, index) => (
            <Droppable key={childCont.id} droppableId={childCont.id} direction="horizontal">
              {(provided) => (
                <div
                  key={childCont.id}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="droppable"
                >
                  {newArr.map((child, i) => (
                    <Draggable isDragDisabled={child.id === 'App' || child.id === 'Date'} key={child.id} index={i} draggableId={child.id}>
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          onClick={handleDragClick}
                          key={child.id}
                          value={i}
                          className={
                            "drag" + (child.isActive ? " clicked" : "")
                          }
                        >
                          {child.heading}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      <div className="buttonGroup">
        <button onClick={handleClose} className="secondary">
          Close
        </button>
        <button onClick={handleApplyChanges} className="primary">
          Apply Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
