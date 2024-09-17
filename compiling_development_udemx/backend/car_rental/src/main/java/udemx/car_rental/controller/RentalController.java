package udemx.car_rental.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import udemx.car_rental.dto.RentalWithId;
import udemx.car_rental.entity.Car;
import udemx.car_rental.entity.Rental;
import udemx.car_rental.service.CarService;
import udemx.car_rental.service.RentalService;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Set;

@RestController
public class RentalController {

    private final CarService carService;
    private final RentalService rentalService;

    @Autowired
    public RentalController(CarService carService, RentalService rentalService) {
        this.carService = carService;
        this.rentalService = rentalService;
    }

    @GetMapping("/cars")
    public ResponseEntity<List<Car>> getCars() {
        return new ResponseEntity<List<Car>>(carService.findCars(), HttpStatus.OK);
    }

    @GetMapping("/rental")
    public ResponseEntity<List<Rental>> getRentals() {
        return new ResponseEntity<List<Rental>>(rentalService.findRentals(), HttpStatus.OK);
    }

    @GetMapping("/rental/date")
    public ResponseEntity<Set<Car>> getRentedCarsOutsideTheRange( @RequestParam("startDate") String startDate,  @RequestParam("endDate") String endDate) {
        try {
            return new ResponseEntity<>(carService.findCarsByDateRange(startDate, endDate), HttpStatus.OK);
        } catch (IllegalArgumentException | DateTimeParseException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }
    @PostMapping("/rental")
    public ResponseEntity<Rental> updateRental(@Valid @RequestBody RentalWithId rentalWithId) {
        try {
            return new ResponseEntity<>(rentalService.saveRental(rentalWithId.rental(), rentalWithId.carId()), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/admin/cars")
    public ResponseEntity<Car> updateCar(@Valid @RequestBody Car car) {
            return new ResponseEntity<>(carService.saveCar(car), HttpStatus.OK);

    }

    @DeleteMapping("/admin/rental")
    public ResponseEntity<?> deleteRentalsByCar(@RequestBody Car car) {
        rentalService.deleteRentalsByCarId(car);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
