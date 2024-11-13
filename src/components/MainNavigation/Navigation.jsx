import React, { useEffect } from "react";
import { Box, Flex, IconButton, Text, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import Sidebar from "../../pages/Sidebar";

let first = true;
const Navigation = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box display="flex" w="100vw" mt={5}>
        {/* Main content */}
        <Box flex="1">
          <Box
            as="header"
            m="auto"
            w="100%"
            sx={{ boxShadow: "15px 4px 10px #b1b9b3" }}
          >
            <Flex alignItems="center" mx={["sm", "xl"]}>
              <Sidebar />
              <Box
                fontSize={["2xl", "3xl"]}
                fontWeight={["bold", "extrabold"]}
                flex="1"
                textAlign={"center"}
              >
                <Text> Task Manager</Text>
              </Box>
              <Box>
                <IconButton
                  fontSize={["xl", "2xl"]}
                  px="5"
                  bg="none"
                  onClick={toggleColorMode}
                  icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
                />
              </Box>
            </Flex>
          </Box>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default Navigation;
