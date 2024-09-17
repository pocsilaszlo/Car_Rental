package udemx.car_rental.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import udemx.car_rental.entity.Car;
import java.util.List;

@Repository
public interface CarRepository extends CrudRepository<Car, String> {
    List<Car> findAll();
    Car save(Car car);
}
