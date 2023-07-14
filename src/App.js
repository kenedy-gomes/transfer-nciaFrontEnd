import "./App.css";
import React from "react";
import { Box } from "@chakra-ui/react";
import Form from "./Components/Form";

function App() {
  /*Filter Data*/

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"100vw"}
      height={"100vh"}
      backgroundColor={"#F3F1F0"}
    >
      <Form />
    </Box>
  );
}

export default App;
