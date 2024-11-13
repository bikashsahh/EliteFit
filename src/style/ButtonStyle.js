import { mode } from "@chakra-ui/theme-tools";
export const ButtonStyle = {
     variants: {
          primary: (props) => ({
               bg: "primary",
               letterSpacing: "2px",
               bgGradient: "linear(to-br, #F15B2A, #E80A89)",
               color: "white",
               _hover: {
                    bgGradient: "linear(to-br, #E80A89, #F15B2A)",
               },
          }),
          secondary: (props) => ({
               // bg: "#000000",
               bgGradient: "linear(to-br,blackAlpha.400,blackAlpha.100)",
               letterSpacing: "2px",
               color: mode("#000000", "#fff")(props),
          }),
     },
};
