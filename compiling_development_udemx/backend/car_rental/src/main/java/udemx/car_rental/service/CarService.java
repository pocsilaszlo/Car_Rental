package udemx.car_rental.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import udemx.car_rental.entity.Car;
import udemx.car_rental.entity.Rental;
import udemx.car_rental.repository.CarRepository;
import udemx.car_rental.repository.RentalRepository;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CarService {

    private final CarRepository carRepository;
    private final RentalRepository rentalRepository;

    @Autowired
    public CarService(CarRepository carRepository, RentalRepository rentalRepository) {
        this.carRepository = carRepository;
        this.rentalRepository = rentalRepository;
    }

    public List<Car> findCars() { return carRepository.findAll(); }

    public Set<Car> findCarsByDateRange(String startDate, String endDate) {

            LocalDate convertedStartDate = LocalDate.parse(startDate);
            LocalDate convertedSEndDate = LocalDate.parse(endDate);
            if (convertedSEndDate.isBefore(convertedStartDate)) throw new IllegalArgumentException();

            Set<Car> cars = new HashSet<>(carRepository.findAll());
            Set<Car> rentals = rentalRepository.findCarsByDateRange(convertedStartDate, convertedStartDate).stream().map(Rental::getCar).collect(Collectors.toSet());
            cars.removeAll(rentals);
            cars = cars.stream().filter(Car::getIsActive).collect(Collectors.toSet());
            return cars;
    }

    public Car saveCar(Car car) {
        return  carRepository.save(car);
    }
}
