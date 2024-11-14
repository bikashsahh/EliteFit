import React from "react";
import {
  Box,
  Text,
  Flex,
  Button,
  Badge,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  useColorMode,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { taskAction } from "../../redux-store/todoSlice";

export const ShowTask = (props) => {
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // State to store edited values
  const [title, setTitle] = React.useState(props.title);
  const [description, setDescription] = React.useState(props.description);
  const [dueDate, setDueDate] = React.useState(props.dueDate);
  const [priority, setPriority] = React.useState(props.priority);

  // State and handlers for delete confirmation dialog
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure();
  const cancelRef = React.useRef();

  const deleteHandler = () => {
    // Open the confirmation dialog only if the task is not completed
    if (props.priority !== "done") {
      onConfirmOpen();
    } else {
      // Directly delete if task is completed
      performDelete();
    }
  };

  const performDelete = () => {
    dispatch(taskAction.deleteTask({ id: props.id, priority: props.priority }));
    toast({
      title: "Task deleted.",
      description: "The task has been successfully deleted.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    onConfirmClose(); // Close the dialog after deletion
  };

  const saveHandler = () => {
    dispatch(
      taskAction.updateEditedTask({
        id: props.id,
        title,
        description,
        dueDate,
        priority,
      })
    );
    toast({
      title: "Task updated.",
      description: "The task has been successfully updated.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <>
      {/* Task Display */}
      <Box
        p={4}
        bgGradient={
          colorMode === "dark"
            ? "linear(to-br, #1A202C, #2D3748)"
            : "linear(to-br, #FFFFFF, #F7FAFC)"
        }
        borderRadius="lg"
        boxShadow="md"
        borderLeftWidth="4px"
        borderColor={
          props.priority === "high"
            ? "#E53E3E"
            : props.priority === "medium"
            ? "#D69E2E"
            : "#38A169"
        }
        mb={3}
      >
        <Flex justify="space-between" align="center" mb={2}>
          <Badge
            colorScheme={
              props.priority === "high"
                ? "red"
                : props.priority === "medium"
                ? "yellow"
                : "green"
            }
            fontSize="0.85em"
            px={2}
            py={1}
            borderRadius="lg"
          >
            {props.priority.toUpperCase()}
          </Badge>
        </Flex>

        <Text
          color={colorMode === "dark" ? "whiteAlpha.700" : "gray.600"}
          fontSize="sm"
          mb={3}
        >
          {props.description}
        </Text>
        <Text color="gray.500" fontSize="xs">
          Due Date: {props.dueDate}
        </Text>
        <Text color="gray.500" fontSize="xs">
          Created On: {props.date}
        </Text>

        <Flex mt={4} gap={2}>
          <Button
            size="sm"
            bgGradient="linear(to-r, #E80A89, #F15B2A)"
            color="white"
            _hover={{
              bgGradient: "linear(to-br, #E80A89, #F15B2A)",
              transform: "scale(1.05)",
            }}
            onClick={onOpen}
          >
            EDIT
          </Button>
          <Button
            size="sm"
            variant="outline"
            colorScheme="red"
            _hover={{ bg: "red.100", color: "red.500" }}
            onClick={deleteHandler}
          >
            DELETE
          </Button>
        </Flex>
      </Box>

      {/* Modal for editing task */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          bgGradient={
            colorMode === "dark"
              ? "linear(to-br, #1A202C, #2D3748)"
              : "linear(to-br, #FFFFFF, #F7FAFC)"
          }
          borderRadius="lg"
          boxShadow="lg"
        >
          <ModalHeader
            bgGradient="linear(to-br, #E80A89, #F15B2A)"
            color="white"
            fontWeight="bold"
          >
            Edit Task
          </ModalHeader>
          <ModalCloseButton color="white" />

          <ModalBody p={6}>
            <Flex direction="column" gap={4}>
              <Input
                type="text"
                maxLength="35"
                variant="flushed"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
                _placeholder={{ color: "gray.500" }}
                focusBorderColor="#3182CE"
                color={colorMode === "dark" ? "whiteAlpha.900" : "gray.800"}
              />
              <Input
                type="text"
                maxLength="100"
                variant="flushed"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task Description"
                _placeholder={{ color: "gray.500" }}
                focusBorderColor="#3182CE"
                color={colorMode === "dark" ? "whiteAlpha.900" : "gray.800"}
              />
              <Input
                type="date"
                variant="flushed"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                focusBorderColor="#3182CE"
                color={colorMode === "dark" ? "whiteAlpha.900" : "gray.800"}
              />
              <Select
                variant="flushed"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                focusBorderColor="#3182CE"
                color={colorMode === "dark" ? "whiteAlpha.900" : "gray.800"}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Select>
            </Flex>
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
              onClick={saveHandler}
            >
              Save
            </Button>
            <Button
              variant="ghost"
              color={colorMode === "dark" ? "whiteAlpha.900" : "blackAlpha.900"}
              _hover={{ bg: colorMode === "dark" ? "gray.700" : "gray.200" }}
              onClick={onClose}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* AlertDialog for delete confirmation */}
      <AlertDialog
        isOpen={isConfirmOpen}
        leastDestructiveRef={cancelRef}
        onClose={onConfirmClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Deletion
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this task? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onConfirmClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={performDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
