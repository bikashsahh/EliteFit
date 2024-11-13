import React from 'react';
import { useSelector } from 'react-redux';
import { Box, VStack, Text, Heading, Flex } from '@chakra-ui/react';
import { format, isAfter, isSameDay } from 'date-fns';
import { NoTask } from '../components/TodoList/NoTask';
import TaskItem from '../components/TodoList/TaskItem';

const UpcomingTasks = () => {
  // Fetching tasks from Redux state
  const todoHigh = useSelector((state) => state.todoReducer.todoHigh);
  const todoMedium = useSelector((state) => state.todoReducer.todoMedium);
  const todoLow = useSelector((state) => state.todoReducer.todoLow);

  // Combine all tasks into a single array
  const allTasks = [...todoHigh, ...todoMedium, ...todoLow];

  // Filter tasks that are due in the future
  const upcomingTasks = allTasks.filter((task) => {
    const taskDueDate = new Date(task.dueDate);
    const today = new Date();
    return isAfter(taskDueDate, today) || isSameDay(taskDueDate, today);; // Checks if the task's due date is in the future
  });

  return (
    <Box p="5">
      <Heading size="md" mb="4" color="green.500">
        Upcoming Tasks
      </Heading>

      <Flex direction="column" gap="4">
        {upcomingTasks.length !== 0 ? (
          upcomingTasks.map((item) => (
            <TaskItem key={item.id} id={item.id} {...item} />
          ))
        ) : (
          <NoTask />
        )}
      </Flex>
    </Box>
  );
};

export default UpcomingTasks;
