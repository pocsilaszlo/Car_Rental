import { useForm } from '@mantine/form';
import { TextInput,Text, Button, Group, Box } from '@mantine/core';
import { RentFormData } from '@/types';
import { differenceInDays, format } from 'date-fns';
import { useRentCarMutation } from '@/state/RentApiSlice';
import { notifications } from '@mantine/notifications';
import classes from './RentForm.module.css'

export const RentForm : React.FC<RentFormData> = ({ car, startDate, endDate }) => {

  const [rentCar] = useRentCarMutation()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      renterName: '',
      emailAddress: '',
      address: '',
      phoneNumber: '',
    },
    validate: {
        renterName: (value) => (value.length < 4 ? 'Name must have at least 4 letters' : null),
        emailAddress: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        address: (value) => (value.length < 8 ? 'Address must have at least 8 letters' : null),
        phoneNumber: (value) => (/((?:\+?3|0)6)(?:-|\()?(\d{1,2})(?:-|\))?(\d{3})-?(\d{3,4})/.test(value) ? null : 'Invalid phone number'),
      },
  });

  return (
    <form onSubmit={form.onSubmit(
        () =>  rentCar({
            body: {
                rental : {
                    startDate : startDate,
                    endDate : endDate,
                    renterName: form.getValues().renterName,
                    emailAddress: form.getValues().emailAddress,
                    address: form.getValues().address,
                    phoneNumber: form.getValues().phoneNumber,
                    numberOfDays: differenceInDays(endDate, startDate) + 1,
                    price: (differenceInDays(endDate, startDate) + 1) * car.pricePerDay
                },
                carId : car.id
            }
        }).then(()=>notifications.show({
            message: 'Car rental successful!',
            classNames: classes,
            color: 'green'
        })).then(()=>form.reset())
    )}>

      <Text size='xl' fw={700}>{car.name}</Text>
      <Text mb={10}>{ format(new Date(startDate), 'MMMM d, yyyy') } - { format(new Date(endDate), 'MMMM d, yyyy') } </Text>

      <TextInput
        label="Name"
        placeholder="Name"
        key={form.key('renterName')}
        {...form.getInputProps('renterName')}
      />
      <TextInput
        mt="md"
        label="Email"
        placeholder="Email"
        key={form.key('emailAddress')}
        {...form.getInputProps('emailAddress')}
      />
      <TextInput
        mt="md"
        label="Address"
        placeholder="Address"
        key={form.key('address')}
        {...form.getInputProps('address')}
      />
      <TextInput
        mt="md"
        label="Phone Number"
        placeholder="Phone Number"
        key={form.key('phoneNumber')}
        {...form.getInputProps('phoneNumber')}
      />

      <Group justify="space-between" mt="md" mb="xs">
        <Text><b>Price/Day:</b> {car.pricePerDay} HUF</Text>
        <Text><b>Total Price:</b> { (differenceInDays(endDate, startDate) + 1) * car.pricePerDay } HUF</Text>
      </Group>

      <Group justify="center" mt="xl">
        <Button type='submit'>Rent</Button>
      </Group>
    </form>
  );
}