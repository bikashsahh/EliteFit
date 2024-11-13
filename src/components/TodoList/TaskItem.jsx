import {
  Box,
  Text,
  HStack,
  Avatar,
  IconButton,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import { FaChevronUp, FaChevronDown, FaCheck } from "react-icons/fa"; // Icons for priority or other actions
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskAction } from "../../redux-store/todoSlice";
import { ShowTask } from "./ShowTask";
import { ShowEdit } from "./ShowEdit";

const TaskItem = (props) => {
  const { colorMode } = useColorMode();
  const isEdit = useSelector((state) => state.todoReducer.isEdit);
  const dispatch = useDispatch();

  const deleteHandler = (e) => {
    console.log(e.target.id);
    dispatch(
      taskAction.deleteTask({ id: e.target.id, priority: props.priority })
    );
  };

  return (
    <Box
      bg={colorMode === "dark" ? "gray.700" : "gray.200"}
      borderRadius="md"
      p="4"
      boxShadow="md"
      borderLeft="4px solid"
      borderColor={
        props.priority === "high"
          ? "red.400"
          : props.priority === "medium"
          ? "yellow.400"
          : "green.400"
      }
      mb="4"
    >
      {/* Task Header */}
      <HStack justify="space-between">
        <Text
          fontWeight="bold"
          fontSize="md"
          color={colorMode === "dark" ? "whiteAlpha.900" : "gray.800"}
        >
          {props.title}
        </Text>
        <HStack spacing="1">
          <Button
            leftIcon={<FaCheck />}
            size="sm"
            colorScheme="green"
            variant="ghost"
            aria-label="Mark as Done"
            onClick={() =>
              dispatch(
                taskAction.addTaskToDone({
                  id: props.id,
                  priority: props.priority,
                })
              )
            }
          >
            Done
          </Button>
        </HStack>
      </HStack>

      {/* Task Details */}
      <Box mt="2">
        {isEdit !== props.id && <ShowTask {...props} />}
        {isEdit === props.id && <ShowEdit {...props} />}
      </Box>
    </Box>
  );
};

export default TaskItem;
