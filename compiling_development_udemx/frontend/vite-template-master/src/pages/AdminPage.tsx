import { AdminCarCard } from "@/components/AdminCarCard/AdminCarCard";
import { PutCarForm } from "@/components/PutCarForm/PutCarForm";
import { useGetCarsQuery } from "@/state/RentApiSlice";
import { useGetRentalsQuery } from "@/state/RentApiSlice";
import { Car, Rental } from "@/types";
import { Button, Center, Container, Flex, Modal, Paper, Table, Text, Title } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import { format } from "date-fns";

export function AdminPage() {

    const {data : rentalData, isSuccess : isSuccessRental} = useGetRentalsQuery({})
    const {data : carData, isSuccess : isSuccessCar} = useGetCarsQuery({})
    const [opened, { open, close }] = useDisclosure(false);

    const rows = isSuccessRental ? rentalData?.map((rental : Rental) => (
        <Table.Tr key={rental.id}>
          <Table.Td>{rental.car.id.substring(0, 5)}</Table.Td>
          <Table.Td>{rental.car.name}</Table.Td>
          <Table.Td>{format(new Date(rental.startDate), 'MMMM d, yyyy')}</Table.Td>
          <Table.Td>{format(new Date(rental.endDate), 'MMMM d, yyyy')}</Table.Td>
          <Table.Td>{rental.renterName}</Table.Td>
          <Table.Td>{rental.phoneNumber}</Table.Td>
        </Table.Tr>
      )) : <></>

    const cars = isSuccessCar ? carData?.map((car : Car) => (
            <AdminCarCard key={car.id} car={car}></AdminCarCard>
    )) : <></>

    return(
    <>
     <Container size={1000} mt={30}>

        <Center>
          <Title order={1} mb={30}>Admin Dashboard</Title>
        </Center>

        <Title order={2}>Rentals</Title> <hr />
        {isSuccessRental && rentalData.length > 0 ?  <Table striped mt={30}>
          <Table.Thead>
              <Table.Tr>
              <Table.Th>Car id</Table.Th>
              <Table.Th>Car name</Table.Th>
              <Table.Th>Start date</Table.Th>
              <Table.Th>End date</Table.Th>
              <Table.Th>Renter name</Table.Th>
              <Table.Th>Phone number</Table.Th>
              </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{isSuccessRental && rows}</Table.Tbody>
        </Table> : 
        <Center>
          <Text>No rentals available</Text>
        </Center>
        }
      
        <Title order={2} mt={60}>Cars</Title> <hr />
        {isSuccessCar && carData.length > 0 ?<Flex
          mt={30}
          mih={50}
          gap="md"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
        >
          {isSuccessCar && cars}
        </Flex>: 
        <Center>
          <Text>No cars available</Text>
        </Center>
        }
          
        <Title order={2} mt={60}>Add new car</Title> <hr />
        <Center my={30}>
            <Button onClick={open}>Add new Car</Button>   
        </Center>
      
        <Modal opened={opened} onClose={close}>
          <PutCarForm car={undefined} onModalClose={close}></PutCarForm>
        </Modal>

     </Container>
    </>
    )
}