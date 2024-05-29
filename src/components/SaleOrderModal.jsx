import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SaleOrderModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: initialData || { customer: '', total: '', invoiceDate: new Date() },
  });

  React.useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  const submitHandler = (data) => {
    onSubmit({ ...data, invoiceDate: data.invoiceDate.toISOString() });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{initialData ? 'Edit Order' : 'New Order'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(submitHandler)}>
            <FormControl id="customer" mb={4}>
              <FormLabel>Customer</FormLabel>
              <Controller
                name="customer"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </FormControl>
            <FormControl id="total" mb={4}>
              <FormLabel>Total</FormLabel>
              <Controller
                name="total"
                control={control}
                render={({ field }) => <Input type="number" {...field} />}
              />
            </FormControl>
            <FormControl id="invoiceDate" mb={4}>
              <FormLabel>Invoice Date</FormLabel>
              <Controller
                name="invoiceDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal">
              Save
            </Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SaleOrderModal;
