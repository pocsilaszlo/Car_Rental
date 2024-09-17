package udemx.car_rental.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;
import java.time.LocalDate;


@Entity
@Table(name="rental")
@RequiredArgsConstructor
@AllArgsConstructor
public class Rental {

    @Id
    @Column(name = "id")
    @UuidGenerator
    @Getter
    private String id;

    @ManyToOne(targetEntity = Car.class)
    @JoinColumn(name = "car_id")
    @Getter
    @Setter
    private Car car;

    @Getter
    private LocalDate startDate;

    @Getter
    private LocalDate endDate;

    @Getter
    @NotBlank(message = "Name cannot be empty")
    @Size(min = 4, message = "Name must have at least 4 letters")
    private String renterName;

    @Getter
    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Invalid email format")
    private String emailAddress;

    @Getter
    @NotBlank(message = "Address cannot be empty")
    @Size(min = 8, message = "Address must have at least 8 letters")
    private String address;

    @Getter
    @NotBlank(message = "Phone number cannot be empty")
    @Pattern(
            regexp = "((?:\\+?3|0)6)(?:-?|\\()?\\d{1,2}(?:-?|\\))?\\d{3}-?\\d{3,4}",
            message = "Invalid phone number"
    )
    private String phoneNumber;

    @Getter
    private Integer numberOfDays;

    @Getter
    private Integer price;

}
