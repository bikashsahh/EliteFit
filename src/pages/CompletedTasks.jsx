import React from "react";
import { Box, Heading, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import TaskItem from "../components/TodoList/TaskItem";
import { NoTask } from "../components/TodoList/NoTask";

const CompletedTasks = () => {
  const todoDone = useSelector((state) => state.todoReducer.todoDone);

  return (
    <Box p="5">
      <Heading size="md" mb="4" color="green.500">
        Completed
      </Heading>
      <Flex direction="column" gap="4">
        {todoDone.length !== 0 ? (
          todoDone.map((item) => (
            <TaskItem key={item.id} id={item.id} {...item} />
          ))
        ) : (
          <NoTask />
        )}
      </Flex>
    </Box>
  );
};

export default CompletedTasks;
