package udemx.car_rental.dto;

import udemx.car_rental.entity.Rental;

public record RentalWithId(Rental rental, String carId) {
}
