import React from 'react';
import { useSelector } from 'react-redux';
import { Box, VStack, Text, Heading, Flex } from '@chakra-ui/react';
import { isBefore } from 'date-fns';
import { NoTask } from '../components/TodoList/NoTask';
import TaskItem from '../components/TodoList/TaskItem';

const OverDue = () => {
  // Fetching tasks from Redux state
  const todoHigh = useSelector((state) => state.todoReducer.todoHigh);
  const todoMedium = useSelector((state) => state.todoReducer.todoMedium);
  const todoLow = useSelector((state) => state.todoReducer.todoLow);

  // Combine all tasks into a single array
  const allTasks = [...todoHigh, ...todoMedium, ...todoLow];

  // Filter tasks that are due in the future
  const overdueTasks = allTasks.filter((task) => {
    const taskDueDate = new Date(task.dueDate);
    const today = new Date();
    return isBefore(taskDueDate, today); // Checks if the task's due date is in the future
  });

  return (
    <Box p="5">
      <Heading size="md" mb="4" color="green.500">
        OverDue Tasks
      </Heading>

      <Flex direction="column" gap="4">
        {overdueTasks.length !== 0 ? (
          overdueTasks.map((item) => (
            <TaskItem key={item.id} id={item.id} {...item} />
          ))
        ) : (
          <NoTask />
        )}
      </Flex>
    </Box>
  );
};

export default OverDue;
