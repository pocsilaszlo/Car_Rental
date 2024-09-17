package udemx.car_rental.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import udemx.car_rental.entity.Car;
import udemx.car_rental.entity.Rental;
import udemx.car_rental.repository.CarRepository;
import udemx.car_rental.repository.RentalRepository;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RentalService {

    private final RentalRepository rentalRepository;

    private final CarRepository carRepository;

    @Autowired
    public RentalService(RentalRepository rentalRepository, CarRepository carRepository) {
        this.rentalRepository = rentalRepository;
        this.carRepository = carRepository;
    }

    public List<Rental> findRentals() {return rentalRepository.findAll();}

    public Rental saveRental(Rental rental, String carId) {

        Optional<Car> car = carRepository.findById(carId);

        if (car.isPresent()) rental.setCar(car.get());
        else throw new IllegalArgumentException();


        Set<Car> rentals = rentalRepository.findCarsByDateRange(rental.getStartDate(), rental.getEndDate()).stream().map(Rental::getCar).collect(Collectors.toSet());
        rentals = rentals.stream().filter(Car::getIsActive).collect(Collectors.toSet());
        if (!rentals.isEmpty()) throw new IllegalArgumentException();

        return rentalRepository.save(rental);
    }

    public void deleteRentalsByCarId(Car car) {
        rentalRepository.deleteByCar(car);
    }
}
