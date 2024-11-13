import {
  Box,
  Input,
  FormLabel,
  FormControl,
  Center,
  Button,
  useColorMode,
  Select,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { v4 as uuid } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { taskAction } from "../../redux-store/todoSlice";
import { FaPlus } from "react-icons/fa";

const InputFiled = () => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const taskValue = useSelector((state) => state.todoReducer.taskValue);
  const taskDescription = useSelector(
    (state) => state.todoReducer.taskDescription
  );
  const taskDueDate = useSelector((state) => state.todoReducer.taskDueDate);
  const taskPriority = useSelector((state) => state.todoReducer.taskPriority);
  const dispatch = useDispatch();

  const taskHandler = () => {
    const id = uuid();
    const date = new Date().toDateString();
    dispatch(taskAction.addTask({ id, date }));
    onClose();
  };

  const handleTitleChange = (e) => {
    dispatch(taskAction.readTask(e.target.value));
  };

  const handleDescriptionChange = (e) => {
    dispatch(taskAction.setDescription(e.target.value));
  };

  const handleDueDateChange = (e) => {
    dispatch(taskAction.setDueDate(e.target.value));
  };

  const handlePriorityChange = (e) => {
    dispatch(taskAction.updateTaskPriority(e.target.value));
  };

  return (
    <Box m="auto" py="5" mx="2">
      <Center>
        <Button
         leftIcon={<FaPlus />}
          variant="solid"
          bgGradient="linear(to-br, #E80A89, #F15B2A)"
          color="white"
          _hover={{
            bgGradient: "linear(to-br, #D90770, #F15B2A)",
            transform: "scale(1.05)",
          }}
          w="30%"
          onClick={onOpen}
        >
          Create Tasks
        </Button>
      </Center>

      {/* Modal for adding new task */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.700" />
        <ModalContent
          bgGradient={
            colorMode === "dark"
              ? "linear(to-b, gray.800, gray.900)"
              : "linear(to-b, white, gray.100)"
          }
          boxShadow="2xl"
          color={colorMode === "dark" ? "white" : "black"}
          borderRadius="lg"
          overflow="hidden"
        >
          <ModalHeader
            textAlign="center"
            fontWeight="bold"
            bgGradient="linear(to-r, #E80A89, #F15B2A)"
            color="white"
          >
            Add New Task
          </ModalHeader>
          <ModalCloseButton color="white" _hover={{ color: "gray.200" }} />

          <ModalBody p={6}>
            <FormControl mb={4}>
              <FormLabel>Task Title</FormLabel>
              <Input
                value={taskValue}
                onChange={handleTitleChange}
                type="text"
                placeholder="Enter task title"
                borderColor={colorMode === "dark" ? "gray.600" : "gray.300"}
                color={colorMode === "dark" ? "whiteAlpha.900" : "black"}
                _placeholder={{ color: "gray.500" }}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Task Description</FormLabel>
              <Textarea
                value={taskDescription}
                onChange={handleDescriptionChange}
                placeholder="Enter task description"
                borderColor={colorMode === "dark" ? "gray.600" : "gray.300"}
                color={colorMode === "dark" ? "whiteAlpha.900" : "black"}
                _placeholder={{ color: "gray.500" }}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Due Date</FormLabel>
              <Input
                type="date"
                value={taskDueDate}
                onChange={handleDueDateChange}
                borderColor={colorMode === "dark" ? "gray.600" : "gray.300"}
                color={colorMode === "dark" ? "whiteAlpha.900" : "black"}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Priority Level</FormLabel>
              <Select
                value={taskPriority}
                onChange={handlePriorityChange}
                borderColor={colorMode === "dark" ? "gray.600" : "gray.300"}
                color={colorMode === "dark" ? "whiteAlpha.900" : "black"}
              >
                <option style={{ color: "black" }} value="low">
                  Low
                </option>
                <option style={{ color: "black" }} value="medium">
                  Medium
                </option>
                <option style={{ color: "black" }} value="high">
                  High
                </option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              bgGradient="linear(to-br, #E80A89, #F15B2A)"
              color="white"
              _hover={{
                bgGradient: "linear(to-br, #D90770, #F15B2A)",
                transform: "scale(1.05)",
              }}
              mr={3}
              onClick={taskHandler}
            >
              ADD
            </Button>
            <Button
              variant="ghost"
              color={colorMode === "dark" ? "whiteAlpha.900" : "blackAlpha.900"}
              _hover={{ bg: colorMode === "dark" ? "gray.700" : "gray.200" }}
              onClick={onClose}
            >
              CANCEL
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default InputFiled;
