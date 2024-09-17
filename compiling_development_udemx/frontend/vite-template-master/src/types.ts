
export interface Car {
    id : string
    name : string
    pricePerDay : number
    isActive: boolean
}

export interface Car2{
    car : Car
}

export interface Rental {
    id : string;
    car: Car
    startDate: Date
    endDate: Date
    renterName : string
    emailAddress : string
    address : string
    phoneNumber : string
    numberOfDays : number
    price : number
}

export interface RentFormData{
    car : Car
    startDate : string
    endDate : string
}

