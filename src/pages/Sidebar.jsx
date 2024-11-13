import React from "react";
import {
  VStack,
  Divider,
  Flex,
  Icon,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  IconButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import {
  FaCalendarAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaBars,
  FaHome,
} from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* Button to open the sidebar drawer with primary variant style */}
      <IconButton
        icon={<FaBars />}
        aria-label="Open Sidebar"
        onClick={onOpen}
        fontSize="2xl"
        variant="primary" // Applying primary button variant
        m="2"
      />

      {/* Drawer Component */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="gray.800" color="white">
          <DrawerHeader
            borderBottomWidth="1px"
            textAlign="center"
            fontSize="2xl"
            fontWeight="bold"
          >
            Task Manager
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing="4" align="stretch">
              <Flex
                align="center"
                p="3"
                bg="gray.700"
                borderRadius="md"
                _hover={{ bg: "gray.600" }}
              >
                <Icon as={FaHome} mr="3" boxSize="5" />
                <Button
                  as={RouterLink}
                  to="/"
                  fontSize="lg"
                  variant="primary"
                  onClick={onClose}
                >
                  Dashboard
                </Button>
              </Flex>

              <Flex
                align="center"
                p="3"
                bg="gray.700"
                borderRadius="md"
                _hover={{ bg: "gray.600" }}
              >
                <Icon as={FaCalendarAlt} mr="3" boxSize="5" />
                <Button
                  as={RouterLink}
                  to="/upcoming"
                  fontSize="lg"
                  variant="primary"
                  onClick={onClose}
                >
                  Upcoming Tasks
                </Button>
              </Flex>

              <Flex
                align="center"
                p="3"
                bg="gray.700"
                borderRadius="md"
                _hover={{ bg: "gray.600" }}
              >
                <Icon as={FaExclamationTriangle} mr="3" boxSize="5" />
                <Button
                  as={RouterLink}
                  to="/overdue"
                  fontSize="lg"
                  variant="primary"
                  onClick={onClose}
                >
                  Overdue Tasks
                </Button>
              </Flex>

              <Flex
                align="center"
                p="3"
                bg="gray.700"
                borderRadius="md"
                _hover={{ bg: "gray.600" }}
              >
                <Icon as={FaCheckCircle} mr="3" boxSize="5" />
                <Button
                  as={RouterLink}
                  to="/completed"
                  fontSize="lg"
                  variant="primary"
                  onClick={onClose}
                >
                  Completed Tasks
                </Button>
              </Flex>

              <Divider borderColor="gray.600" />
            </VStack>

            {/* Close Button with secondary variant style */}
            <Button mt="6" variant="primary" onClick={onClose}>
              Close Sidebar
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
