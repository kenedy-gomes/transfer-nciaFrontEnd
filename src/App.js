import "./App.css";
import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Text, Input, Tr } from "@chakra-ui/react";
import moment from "moment";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [deposits, setDeposits] = useState([]);
  const [filteredDeposits, setFilteredDeposits] = useState([]);

  /*Format Data*/
  function formatDate(data_transferencia) {
    const formattedDate = moment(data_transferencia).format("DD/MM/YYYY");
    return formattedDate;
  }
  /*Format Data*/

  /*Fetch Data*/
  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const response = await fetch("http://localhost:8080/transferencia");
        const data = await response.json();
        setDeposits(data);
        setFilteredDeposits(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching deposits:", error);
      }
    };
    fetchDeposits();
  }, []);
  /*Fetch Data*/

  /*Filter Data*/
  const handleFilterClick = ({ target }) => {
    if (!target.value) {
      setFilteredDeposits(deposits);
    } else {
      const filteredDeposits = deposits.filter(
        ({ nome_operador_transacao }) =>
          nome_operador_transacao &&
          nome_operador_transacao
            .toLowerCase()
            .includes(target.value.toLowerCase())
      );
      setFilteredDeposits(filteredDeposits);
    }
  };
  /*Filter Data*/

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      margin={"10em 0em 0em 0em"}
      width={"100vw"}
      height={"100%"}
    >
      <Box width={"780px"} maxH={"auto"}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Depósitos
        </Text>
        <Box gap={"70px"} display={"flex"}>
          <Flex mb={2}>
            <DatePicker
              placeholderText="Data e Hora de Início"
              dateFormat="dd/MM/yyyy HH:mm"
              showTimeSelect
              timeFormat="HH:mm"
              className="date"
            />
          </Flex>
          <Flex mb={2}>
            <DatePicker
              placeholderText="Data e Hora de Fim"
              dateFormat="dd/MM/yyyy HH:mm"
              showTimeSelect
              timeFormat="HH:mm"
              className="date"
            />
          </Flex>
          <Flex mb={2}>
            <Input onChange={handleFilterClick} placeholder="Nome Operador" />
          </Flex>
        </Box>

        <Box padding={"20px"}>
          <Button float={"right"} display={"flex"}>
            Pesquisar
          </Button>
        </Box>

        <Text mt={4} fontWeight="bold">
          Depósitos filtrados:
        </Text>
        <Box
          maxH={"350px"}
          overflowY={"scroll"}
          border="1px solid #ccc"
          borderRadius="md"
        >
          <Box
            textAlign={"center"}
            alignItems={"center"}
            p={1}
            display={"flex"}
            fontWeight={"bold"}
          >
            <Text margin={"auto"}> Dados </Text>
            <Text margin={"auto"}> Valentia </Text>
            <Text margin={"auto"}> Tipo </Text>
            <Text margin={"auto"}> Operador</Text>
          </Box>
          {filteredDeposits.map((deposit) => (
            <Box key={deposit.id} p={1}>
              <Box
                border="1px solid #ccc"
                borderRadius="md"
                alignItems={"center"}
                textAlign={"center"}
                display={"grid"}
                gridTemplateColumns={"repeat(4, 1fr)"}
              >
                <Text padding={"10px"} margin={"auto"}>
                  {formatDate(deposit.data_transferencia)}
                </Text>
                <Text margin={"auto"}>{deposit.valor}</Text>
                <Text margin={"auto"}>{deposit.tipo}</Text>
                <Text>{deposit.nome_operador_transacao}</Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default App;
