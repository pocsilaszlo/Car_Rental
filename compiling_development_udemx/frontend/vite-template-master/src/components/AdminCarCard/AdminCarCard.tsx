import { Car2 } from "@/types";
import { Button, Card, Flex, Modal, Text, Image, Center } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PutCarForm } from "../PutCarForm/PutCarForm";
import { useDeleteRentalsByCarMutation, usePutCarMutation } from "@/state/RentApiSlice";
import { notifications } from "@mantine/notifications";
import classes from '../RentForm/RentForm.module.css'

export const AdminCarCard: React.FC<Car2> = ({ car }) => {

    const [opened, { open, close }] = useDisclosure(false);
    const [putCar] = usePutCarMutation()
    const [deleteRentals] = useDeleteRentalsByCarMutation()
  
    return (
      <Card shadow="sm" padding='xs' radius="md" withBorder>  
        
        <Center>
            <Text size='xl' fw={500}>{car.name}</Text>
        </Center>
        <Center>
            <Text fw={300}>{car.id.substring(0, 5)}</Text>
        </Center>
        <Center>
            <Text fw={300}>{car.pricePerDay} HUF/Day</Text> 
        </Center>
        
  
        <Modal opened={opened} onClose={close}>
          <PutCarForm key={car.id} car={car} onModalClose={close}></PutCarForm>
        </Modal>
  
        <Flex
          mih={50}
          gap="xs"
          justify="flex-end"
          align="center"
          direction="row"
          wrap="nowrap"
        >
          <Button color="blue" fullWidth mt="md" radius="md" onClick={open}>
            Edit
          </Button>
          
          {car.isActive && <Button color="blue" fullWidth mt="md" radius="md" 
            onClick={
             async ()=> { 
              await deleteRentals({
                body: {
                  id: car.id,
                  name: car.name,
                  pricePerDay: car.pricePerDay,
                },
              })
        
              await putCar({
                body: {
                  id: car.id,
                  name: car.name,
                  pricePerDay: car.pricePerDay,
                  isActive: false
                },
              })
              .then(()=>notifications.show({
                message: 'Car deactivated successfully!',
                classNames: classes,
                color: 'green'
              }))
             }
            }>
            Deactivate
          </Button>}

          {!car.isActive && <Button color="blue" fullWidth mt="md" radius="md" 
            onClick={
             async ()=> { 
              await putCar({
                body: {
                  id: car.id,
                  name: car.name,
                  pricePerDay: car.pricePerDay,
                  isActive: true
                },
              })
              .then(()=>notifications.show({
                message: 'Car activated successfully!',
                classNames: classes,
                color: 'green'
              })) 
             }
            }>
            Activate
          </Button>}

        </Flex>
      </Card>
    );
  }