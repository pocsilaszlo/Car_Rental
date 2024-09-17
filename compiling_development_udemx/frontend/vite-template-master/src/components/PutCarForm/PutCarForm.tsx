import { useForm } from '@mantine/form';
import { TextInput, Button, Group, Title, Center } from '@mantine/core';
import { Car } from '@/types';
import { notifications } from '@mantine/notifications';
import classes from '../RentForm/RentForm.module.css'
import { usePutCarMutation } from '@/state/RentApiSlice';

interface EditCarFormComponentProps {
  onModalClose: () => void
  car : Car | undefined
}

export const PutCarForm : React.FC<EditCarFormComponentProps> = ({onModalClose, car}) => {

  const [putCar] = usePutCarMutation()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      carName: '',
      pricePerDay: '',
    },
    validate: {
        carName: (value) => (value.length < 4 ? 'Name must have at least 4 letters' : null),
        pricePerDay: (value) => {
          const parsedValue = Number.parseInt(value);
          if (isNaN(parsedValue)) {
            return 'Price/day must be a valid number';
          }
          return parsedValue <= 0 ? 'Price/day must be a positive number' : null;
        },
      },
  });

  return (
    <form onSubmit={form.onSubmit(
        () =>  putCar({
            body:{
                id: car == undefined ? null : car.id,
                name: form.getValues().carName,
                pricePerDay: form.getValues().pricePerDay
            }
        }).then(()=>notifications.show({
            message: 'Car updated successfully!',
            classNames: classes,
            color: 'green'
        }))
        .then(()=>form.reset())
        .then(onModalClose)
    )}>

      <Center>
        <Title order={2} mb={30}>{car == undefined ? "Add" : "Edit"} car</Title>
      </Center>

      <TextInput
        label="Car name"
        placeholder="Car name"
        key={form.key('carName')}
        {...form.getInputProps('carName')}
      />
      <TextInput
        mt="md"
        label="Price/day"
        placeholder="Price/day"
        key={form.key('pricePerDay')}
        {...form.getInputProps('pricePerDay')}
      />

      <Group justify="center" mt="xl">
        <Button type='submit'>Submit changes</Button>
      </Group>
    </form>
  );
}