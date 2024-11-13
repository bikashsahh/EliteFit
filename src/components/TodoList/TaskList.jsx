import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Button,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { taskAction } from "../../redux-store/todoSlice";
import TaskItem from "./TaskItem";
import { NoTask } from "./NoTask";

const TaskList = () => {
  const todoHigh = useSelector((state) => state.todoReducer.todoHigh);
  const todoMedium = useSelector((state) => state.todoReducer.todoMedium);
  const todoLow = useSelector((state) => state.todoReducer.todoLow);
  const todoDone = useSelector((state) => state.todoReducer.todoDone);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [completionFilter, setCompletionFilter] = useState("");

  // For storing filtered tasks
  const [filteredHigh, setFilteredHigh] = useState(todoHigh);
  const [filteredMedium, setFilteredMedium] = useState(todoMedium);
  const [filteredLow, setFilteredLow] = useState(todoLow);
  const [filteredDone, setFilteredDone] = useState(todoDone);

  useEffect(() => {
    let todoHighLocal = JSON.parse(localStorage.getItem("todoHigh"));
    let todoMediumLocal = JSON.parse(localStorage.getItem("todoMedium"));
    let todoLowLocal = JSON.parse(localStorage.getItem("todoLow"));

    if (!todoHighLocal && !todoMediumLocal && !todoLowLocal) {
      localStorage.setItem("todoHigh", JSON.stringify([]));
      localStorage.setItem("todoMedium", JSON.stringify([]));
      localStorage.setItem("todoLow", JSON.stringify([]));
      todoHighLocal = JSON.parse(localStorage.getItem("todoHigh"));
      todoMediumLocal = JSON.parse(localStorage.getItem("todoMedium"));
      todoLowLocal = JSON.parse(localStorage.getItem("todoLow"));
    }

    if (
      todoHighLocal.length !== 0 ||
      todoMediumLocal.length !== 0 ||
      todoLowLocal.length !== 0
    ) {
      dispatch(
        taskAction.updateAllTodosFromLocalStorage({
          priority: "high",
          arr: todoHighLocal,
        })
      );
      dispatch(
        taskAction.updateAllTodosFromLocalStorage({
          priority: "medium",
          arr: todoMediumLocal,
        })
      );
      dispatch(
        taskAction.updateAllTodosFromLocalStorage({
          priority: "low",
          arr: todoLowLocal,
        })
      );
    } else {
      localStorage.setItem("todoHigh", JSON.stringify(todoHigh));
      localStorage.setItem("todoMedium", JSON.stringify(todoMedium));
      localStorage.setItem("todoLow", JSON.stringify(todoLow));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoHigh", JSON.stringify(todoHigh));
    localStorage.setItem("todoMedium", JSON.stringify(todoMedium));
    localStorage.setItem("todoLow", JSON.stringify(todoLow));
  }, [todoHigh, todoLow, todoMedium]);

  // Search and filter logic
  useEffect(() => {
    const filterTasks = (tasks, isCompletedArray = false) => {
      return tasks.filter((task) => {
        const matchesTitle = task.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesPriority = priorityFilter
          ? task.priority === priorityFilter
          : true;

        // Check if task completion matches the filter
        const matchesCompletion = completionFilter
          ? completionFilter === "completed"
            ? isCompletedArray
            : !isCompletedArray
          : true;

        return matchesTitle && matchesPriority && matchesCompletion;
      });
    };

    setFilteredHigh(filterTasks(todoHigh));
    setFilteredMedium(filterTasks(todoMedium));
    setFilteredLow(filterTasks(todoLow));
    setFilteredDone(filterTasks(todoDone, true));
  }, [
    searchTerm,
    priorityFilter,
    completionFilter,
    todoHigh,
    todoMedium,
    todoLow,
    todoDone,
  ]);

  return (
    <Box m="auto" py="2" mx="2">
      <Flex direction="row" justify="space-between" mb="4" width="100%">
        <InputGroup width="200px" mr="2">
          <InputLeftElement pointerEvents="none">
            <FaSearch color="gray.500" />
          </InputLeftElement>
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title"
            borderColor="gray.300"
          />
        </InputGroup>
        {/* <Center>
                 <Button 
                     variant="solid" 
                     bgGradient="linear(to-br, #E80A89, #F15B2A)" 
                     color="white"
                     _hover={{ bgGradient: "linear(to-br, #D90770, #F15B2A)", transform: "scale(1.05)" }}
                     w="200%" 
                    //  onClick={onOpen}
                 >
                     ADD TODO LIST
                 </Button>
             </Center> */}

        <Flex direction="row" gap="3">
          {/* Priority Filter */}
          <Select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            placeholder="Filter by Priority"
            borderColor="gray.300"
            width="150px"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </Select>

          {/* Completion Filter */}
          <Select
            value={completionFilter}
            onChange={(e) => setCompletionFilter(e.target.value)}
            placeholder="Filter by Status"
            borderColor="gray.300"
            width="150px"
          >
            <option value="completed">Completed</option>
            <option value="not_completed">Not Completed</option>
          </Select>
        </Flex>
      </Flex>
      <Center>
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
          gap={5}
          width="100%"
        >
          {/* Search Bar */}

          {/* High Priority Column */}
          <GridItem>
            <Heading size="md" mb="4" color="red.500">
              High Priority
            </Heading>
            <Flex direction="column" gap="4">
              {filteredHigh.length !== 0 ? (
                filteredHigh.map((item) => <TaskItem key={item.id} {...item} />)
              ) : (
                <NoTask />
              )}
            </Flex>
          </GridItem>

          {/* Medium Priority Column */}
          <GridItem>
            <Heading size="md" mb="4" color="yellow.500">
              Medium Priority
            </Heading>
            <Flex direction="column" gap="4">
              {filteredMedium.length !== 0 ? (
                filteredMedium.map((item) => (
                  <TaskItem key={item.id} {...item} />
                ))
              ) : (
                <NoTask />
              )}
            </Flex>
          </GridItem>

          {/* Low Priority Column */}
          <GridItem>
            <Heading size="md" mb="4" color="blue.500">
              Low Priority
            </Heading>
            <Flex direction="column" gap="4">
              {filteredLow.length !== 0 ? (
                filteredLow.map((item) => <TaskItem key={item.id} {...item} />)
              ) : (
                <NoTask />
              )}
            </Flex>
          </GridItem>

          {/* Completed Column */}
          <GridItem>
            <Heading size="md" mb="4" color="green.500">
              Completed
            </Heading>
            <Flex direction="column" gap="4">
              {filteredDone.length !== 0 ? (
                filteredDone.map((item) => <TaskItem key={item.id} {...item} />)
              ) : (
                <NoTask />
              )}
            </Flex>
          </GridItem>
        </Grid>
      </Center>
    </Box>
  );
};

export default TaskList;
