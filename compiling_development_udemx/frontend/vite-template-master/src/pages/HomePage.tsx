import { DateRangePicker } from '../components/DatePickerInput/DatePickerInput';
import { Box, Center, Container, Flex, Title, Text } from '@mantine/core';
import { CarCard } from '../components/CarCard/CarCard';
import { Car } from '@/types';
import { useState } from 'react';
import { useLazyGetRentalsByDateQuery } from '@/state/RentApiSlice';

export function HomePage() {
  
  const [getCars, {data, isSuccess}] = useLazyGetRentalsByDateQuery()
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const cards = isSuccess ? data?.map((car : Car) => (
    <CarCard key = {car.id} car={car} startDate={startDate} endDate={endDate} />
  )) : <></>

  const handleDateRangeChange = (startDate : string, endDate : string)=>{
    setStartDate(startDate)
    setEndDate(endDate)
    getCars({startDate: startDate, endDate: endDate}) 
  }

  return (
    <>
      <Container size={1000} mt={30}>

        <Center>
          <Title order={1} mb={30}>Car rental</Title>
        </Center>

        <Box mb={20}>
          <DateRangePicker onDateRangeChange={handleDateRangeChange}/>
        </Box>

        {isSuccess && data && data.length > 0 ? <Flex
          mih={50}
          gap="md"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
        >
          {isSuccess && cards}
        </Flex> : isSuccess && data && data.length == 0 ?
          <Center>
            <Text>No cars available</Text>
          </Center> : <></>}

      </Container>
    </>
  );
}
