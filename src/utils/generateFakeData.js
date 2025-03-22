// src/utils/generateFakeData.js
import { faker } from '@faker-js/faker';

export const generateFakeData = () => {
  return {
    totalCitizens: faker.datatype.number({ min: 1000, max: 10000 }),
    planCompletion: `${faker.datatype.number({ min: 50, max: 100 })}%`,
    satisfactionLevel: `${faker.datatype.float({ min: 3, max: 5, precision: 0.1 })}/5`,
    lineChartData: Array.from({ length: 10 }, (_, i) => ({
      date: faker.date.recent(10).toISOString().slice(0, 10),
      value: faker.datatype.number({ min: 50, max: 150 })
    })),
    barChartData: [
      { region: 'Центр', value: faker.datatype.number({ min: 20, max: 100 }) },
      { region: 'Север', value: faker.datatype.number({ min: 20, max: 100 }) },
      { region: 'Юг', value: faker.datatype.number({ min: 20, max: 100 }) }
    ],
    pieChartData: [
      { category: 'Статус 1', value: faker.datatype.number({ min: 10, max: 70 }) },
      { category: 'Статус 2', value: faker.datatype.number({ min: 10, max: 70 }) }
    ],
    toDoItems: Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      text: faker.lorem.sentence(),
      completed: faker.datatype.boolean()
    }))
  };
};
