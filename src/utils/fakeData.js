// src/utils/fakeData.js
import { faker } from '@faker-js/faker';

// Генерация данных для KPI карточек
export const generateKpiData = () => {
  return {
    totalCitizens: faker.datatype.number({ min: 100000, max: 200000 }),
    planCompletion: faker.datatype.number({ min: 70, max: 100 }), // в процентах
    satisfaction: faker.datatype.number({ min: 0, max: 100 })      // в процентах
  };
};

// Генерация временных рядов для графиков (например, по месяцам)
export const generateTimeSeriesData = (num = 12) => {
  const data = [];
  for (let i = 0; i < num; i++) {
    data.push({
      month: faker.date.month(),
      sales: faker.datatype.number({ min: 1000, max: 10000 }),
      citizens: faker.datatype.number({ min: 500, max: 5000 })
    });
  }
  return data;
};

// Генерация данных для столбчатой диаграммы (например, по регионам)
export const generateCategoryData = () => {
  const categories = ['Москва', 'СПб', 'Казань', 'Новосибирск', 'Екатеринбург'];
  return categories.map(category => ({
    category,
    count: faker.datatype.number({ min: 1000, max: 10000 })
  }));
};

// Генерация данных для гистограммы (распределение по возрастным диапазонам)
export const generateAgeDistribution = (num = 10) => {
  const data = [];
  for (let i = 0; i < num; i++) {
    data.push({
      ageRange: `${i * 10}-${(i + 1) * 10}`,
      count: faker.datatype.number({ min: 100, max: 1000 })
    });
  }
  return data;
};

// Генерация данных для круговой диаграммы (например, статус граждан)
export const generatePieData = () => {
  const statuses = ['Активный', 'Неактивный', 'В ожидании'];
  return statuses.map(status => ({
    status,
    percentage: faker.datatype.number({ min: 10, max: 90 })
  }));
};
