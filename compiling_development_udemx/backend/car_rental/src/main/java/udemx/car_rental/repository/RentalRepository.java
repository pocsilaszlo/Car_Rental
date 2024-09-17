package udemx.car_rental.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import udemx.car_rental.entity.Car;
import udemx.car_rental.entity.Rental;
import java.time.LocalDate;
import java.util.List;
;

@Repository
public interface RentalRepository extends CrudRepository<Rental, String> {
    List<Rental> findAll();
    Rental save(Rental rental);
    @Query("select r from Rental r where (:startDate <= r.endDate and :endDate >= r.startDate)")
    List<Rental> findCarsByDateRange(@Param("startDate" ) LocalDate startDate, @Param("endDate") LocalDate endDate);
    @Modifying
    @Transactional
    @Query("DELETE FROM Rental r WHERE r.car = :car")
    void deleteByCar(Car car);
}
