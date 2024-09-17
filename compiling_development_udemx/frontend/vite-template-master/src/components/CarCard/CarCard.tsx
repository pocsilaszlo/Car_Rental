import { Car, RentFormData } from '@/types';
import { Card, Image, Text, Badge, Button, Group, Modal } from '@mantine/core';
import { RentForm } from '../RentForm/RentForm';
import { useDisclosure } from '@mantine/hooks';

export const CarCard: React.FC<RentFormData> = ({ car, startDate, endDate }) => {

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{car.name}</Text>
        <Text fw={300}>{car.pricePerDay} HUF/Day</Text>
      </Group>

      <Modal opened={opened} onClose={close} title="Rent car">
        <RentForm key={car.id} car = {car} startDate={startDate} endDate={endDate} />
      </Modal>

      <Button color="blue" fullWidth mt="md" radius="md" onClick={open}>
        Rent
      </Button>
    </Card>
  );
}
