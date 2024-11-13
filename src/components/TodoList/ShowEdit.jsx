import React, { useState, useEffect } from "react";
import { Box, Text, Flex, Button, Input, Select } from "@chakra-ui/react";
import { MdDone, MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { taskAction } from "../../redux-store/todoSlice";

export const ShowEdit = (props) => {
  const taskValue = useSelector((state) => state.todoReducer.updateValue);
  const taskDescription = useSelector(
    (state) => state.todoReducer.taskDescription
  );
  const taskDueDate = useSelector((state) => state.todoReducer.taskDueDate);
  const dispatch = useDispatch();

  const [priority, setPriority] = useState(props.priority);

  useEffect(() => {
    setPriority(props.priority);
  }, [props.priority]);

  const cancelHandler = () => {
    dispatch(taskAction.cancelEdit());
  };

  const doneHandler = (e) => {
    dispatch(
      taskAction.updateEditedTask({
        id: props.id,
        title: taskValue,
        description: taskDescription,
        dueDate: taskDueDate,
        priority: priority,
      })
    );
  };

  const taskValueHandler = (e) => {
    dispatch(taskAction.readUpdateTask(e.target.value));
  };

  const descriptionHandler = (e) => {
    dispatch(taskAction.setDescription(e.target.value));
  };

  const dueDateHandler = (e) => {
    dispatch(taskAction.setDueDate(e.target.value));
  };

  return (
    <Flex
      gap={[1, 1, 2, 3]}
      justifyContent="center"
      alignItems="center"
      w="100%"
    >
      <Box flex="1">
        <Input
          type="text"
          maxLength="35"
          variant="flushed"
          value={taskValue}
          size={["sm", "md"]}
          onChange={taskValueHandler}
        />
      </Box>
      <Box flex="1">
        <Input
          type="text"
          maxLength="100"
          variant="flushed"
          value={taskDescription}
          size={["sm", "md"]}
          onChange={descriptionHandler}
        />
      </Box>
      <Box flex="1">
        <Input
          type="date"
          variant="flushed"
          value={taskDueDate}
          size={["sm", "md"]}
          onChange={dueDateHandler}
        />
      </Box>
      <Box>
        <Select
          variant="flushed"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          size={["xs", "sm", "md"]}
          mx={1}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </Select>
      </Box>
      <Box>
        <Button
          variant="primary"
          size={["xs", "sm", "md"]}
          id={props.id}
          mx={1}
          onClick={doneHandler}
        >
          <MdDone />
        </Button>

        <Button
          variant="primary"
          size={["xs", "sm", "md"]}
          id={props.id}
          onClick={cancelHandler}
        >
          <MdCancel />
        </Button>
      </Box>
    </Flex>
  );
};
