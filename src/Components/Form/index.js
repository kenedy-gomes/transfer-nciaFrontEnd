import React, { useState, useEffect } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";

const Form = ({ onFilter }) => {
  const [deposits, setDeposits] = useState([]);
  const [filteredDeposits, setFilteredDeposits] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const response = await fetch("http://localhost:8080/transferencia");
        const data = await response.json();
        setDeposits(data);
        setFilteredDeposits(data);
      } catch (error) {
        console.error("Error fetching deposits:", error);
      }
    };
    fetchDeposits();
  }, []);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleButtonClick = () => {
    filterDeposits();
  };

  const filterDeposits = () => {
    let filteredList = deposits;

    if (startDate && endDate) {
      filteredList = filteredList.filter((deposit) => {
        const depositDate = moment(deposit.data_transferencia);
        return (
          depositDate.isSameOrAfter(startDate, "day") &&
          depositDate.isSameOrBefore(endDate, "day")
        );
      });
    }

    if (searchTerm && searchTerm.trim() !== "") {
      const searchTermLowercase = searchTerm.toLowerCase();
      filteredList = filteredList.filter(
        (deposit) =>
          deposit.nome_operador_transacao &&
          deposit.nome_operador_transacao
            .toLowerCase()
            .includes(searchTermLowercase)
      );
    }

    setFilteredDeposits(filteredList);
  };

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  return (
    <Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding="20px"
        fontFamily="Roboto"
      >
        <Text>Teste Supera</Text>
      </Box>

      <Box
        borderRadius="md"
        backgroundColor="#EAE8E8"
        boxShadow="md"
        padding="20px"
        width="780px"
        maxH="auto"
      >
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Depósitos
        </Text>

        <Flex gap="70px" mb={2}>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            placeholderText="Data de Início"
            dateFormat="dd/MM/yyyy"
            className="date"
          />
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            placeholderText="Data de Fim"
            dateFormat="dd/MM/yyyy"
            className="date"
          />
          <Input
            value={searchTerm}
            border="1px solid #b0c4de"
            backgroundColor="#dcdcdc"
            onChange={handleInputChange}
            placeholder="Nome Operador"
          />
        </Flex>

        <Box padding={"20px"}>
          <Button
            onClick={handleButtonClick}
            border={"1px solid #ccc"}
            backgroundColor={"#dcdcdc"}
            float={"right"}
            display={"flex"}
          >
            Pesquisar
          </Button>
        </Box>

        <Text mt={4} fontWeight="bold">
          Depósitos filtrados:
        </Text>
        <Box
          maxH="350px"
          overflowY="scroll"
          border="1px solid #ccc"
          borderRadius="md"
        >
          <Flex textAlign="center" alignItems="center" p={1} fontWeight="bold">
            <Text margin="auto">Data</Text>
            <Text margin="auto">Valor</Text>
            <Text margin="auto">Tipo</Text>
            <Text margin="auto">Operador</Text>
          </Flex>
          {filteredDeposits.map((deposit) => (
            <Box key={deposit.id} p={1}>
              <Flex
                border="1px solid #ccc"
                borderRadius="md"
                alignItems="center"
                textAlign="center"
                display="grid"
                gridTemplateColumns="repeat(4, 1fr)"
              >
                <Text padding="10px" margin="auto">
                  {formatDate(deposit.data_transferencia)}
                </Text>
                <Text margin="auto">{deposit.valor}</Text>
                <Text margin="auto">{deposit.tipo}</Text>
                <Text margin="auto">{deposit.nome_operador_transacao}</Text>
              </Flex>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Form;
