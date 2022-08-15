function Passengers() {

	function checkFlightCapacity (flightCapacity, passengersArray) {
		let passengersNumber;
		let passengers;
		
		for(passengers of passengersArray) {
			passengersNumber += passengers;
		}
		
		if (passengersNumber > flightCapacity) {
			throw new Error("Flight capacity (" + flightCapacity + ") exceeded. You have" + passengersNumber + " passengers")
		}
		return passengersNumber;
	}
	
	function distributeAllSeatsToAllPassengers (vipPassengers, regularPassengers, nrOfFlights, businessSeatsPerFliglight, economySeatsPerFlight) {
		let vipPassengersWithEconomySeats = 0;
		let vipPassengersWithBusinessSeats = 0;
		let regularPassengersWithBusinessSeats = 0;
		let regularPassengersWithEconomySeats = 0;
		let availableBusinessSeats = nrOfFlights * businessSeatsPerFliglight;
		let availableEconomySeats = nrOfFlights * economySeatsPerFlight;
		
		var vipBusinessConfiguration = {passengers:vipPassengers, seats:availableBusinessSeats};
		vipPassengersWithBusinessSeats = updateConfiguration(vipBusinessConfiguration, businessSeatsPerFliglight)
		
		var vipEconomyConfiguration = {passengers:vipPassengers, seats:availableBusinessSeats}
		vipPassengersWithEconomySeats = updateConfiguration(vipEconomyConfiguration, economySeatsPerFlight)
		
		var regularBussinesConfiguration = {passengers:regularPassengers, seats:vipBusinessConfiguration.seats}
		regularPassengersWithBusinessSeats = updateConfiguration(regularBussinesConfiguration, businessSeatsPerFliglight)
		
		var regularEconomyConfiguration = {passengers:regularBussinesConfiguration.passengers, seats:vipEconomyConfiguration.seats}
		regularPassengersWithEconomySeats = updateConfiguration(regularEconomyConfiguration, economySeatsPerFlight)
		
		return {vipPassengersWithBusinessSeats:vipPassengersWithBusinessSeats, vipPassengersWithEconomySeats:vipPassengersWithEconomySeats, regularPassengersWithEconomySeats:regularPassengersWithEconomySeats, regularPassengersWithBusinessSeats: regularPassengersWithBusinessSeats
		}
	}
	function updateConfiguration (configuration, seatsPerFlight) {
		let passengersWithSeats = 0;
		
		while (configuration.passengers > 0) {
			if (configuration.seats > 0) {
				if (configuration.passengers >= configuration.seats) {
					configuration.passengers -= seatsPerFlight;
					configuration.seats -= seatsPerFlight;
					passengersWithSeats += seatsPerFlight;
				} else {
					configuration.passengers -= configuration.seats;
					passengersWithSeats += configuration.seats;
					configuration.seats = 0;
				}
			} else {
				passengersWithSeats += configuration.passengers;
				configuration.seats -= configuration.passengers;
				configuration.passengers = 0;
			}
		} else {
			break;
		}
		return passengersWithSeats;
	}

return {checkFlightCapacity, distributeAllSeatsToAllPassengers};
}

module.exports = Passengers();
