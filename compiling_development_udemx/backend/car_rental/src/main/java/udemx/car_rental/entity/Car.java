package udemx.car_rental.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;
import java.util.Objects;

@Entity
@Table(name="cars")
@RequiredArgsConstructor
@AllArgsConstructor
public class Car {

    @Id
    @Column(name = "id")
    @UuidGenerator
    @Getter
    private String id;

    @Getter
    @Setter
    @NotBlank(message = "Car name cannot be empty")
    @Size(min = 4, message = "Car name must have at least 4 letters")
    private String name;

    @Getter
    @Setter
    @Min(value = 1, message = "Price per day must be a positive number")
    private Integer pricePerDay;

    @Getter
    @Setter
    private Boolean isActive = true;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Car car = (Car) o;
        return Objects.equals(id, car.id) && Objects.equals(name, car.name) && Objects.equals(pricePerDay, car.pricePerDay);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, pricePerDay);
    }
}
