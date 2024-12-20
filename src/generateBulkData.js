// generateBulkData.js

import { faker } from '@faker-js/faker';

export const generateBulkData = (numUsers) => {
  const bulkData = [];
  for (let i = 0; i < numUsers; i++) {
    bulkData.push({
      fname: faker.name.firstName(),
      mname: faker.name.firstName(),
      lname: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      age: faker.number.int({ min: 18, max: 100 }),
      ssn: faker.number.int({ min: 100000000, max: 999999999 }).toString(),
      job: "Passenger",  // you can randomize the job as well if needed
      carDetails: {
        number_of_seats: faker.number.int({ min: 8, max: 25 }),
        air_conditioning: faker.datatype.boolean(),
        car_type: faker.vehicle.type(),
        additional_price: faker.commerce.price(),
      },
      stationDetails: {
        station_name: faker.company.name(),
        street: faker.address.street(),
        zipcode: faker.address.zipCode(),
        governorate: faker.address.state(),
        m_ssn: faker.number.int({ min: 100000000, max: 999999999 }).toString(),
      },
    });
  }
  return bulkData;
};

export default generateBulkData;
