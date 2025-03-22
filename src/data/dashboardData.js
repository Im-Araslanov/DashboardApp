//src/data/dashboardData.js
import { faker } from '@faker-js/faker';

const generateRealEstateData = () => ({
  kpis: {
    totalProperties: faker.number.int({ min: 15000, max: 30000 }), // Общее число объектов
    planCompletion: faker.number.int({ min: 65, max: 98 }),       // % выполнения плана
    satisfactionRate: faker.number.int({ min: 75, max: 95 }),     // Удовлетворенность
    activeRequests: faker.number.int({ min: 500, max: 1500 })     // Активные заявки
  },
  
  propertyTypes: ['Жилая', 'Коммерческая', 'Промышленная', 'Земельные участки'].map(type => ({
    type,
    count: faker.number.int({ min: 3000, max: 8000 })
  })),

  regionalDistribution: [
    'Центральный округ',
    'Северо-Западный',
    'Южный округ',
    'Приволжский',
    'Уральский'
  ].map(region => ({
    region,
    properties: faker.number.int({ min: 2000, max: 7000 }),
    transactions: faker.number.int({ min: 100, max: 500 })
  })),

  transactionTimeline: Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2023, i).toLocaleString('ru', { month: 'short' }),
    transactions: faker.number.int({ min: 400, max: 1200 }),
    approvals: faker.number.int({ min: 300, max: 1000 })
  })),

  requestStatus: [
    { status: 'На рассмотрении', value: 35 },
    { status: 'В работе', value: 45 },
    { status: 'Завершено', value: 20 }
  ],

  performanceMetrics: {
    averageProcessingTime: faker.number.int({ min: 3, max: 14 }), // Дней
    approvalRate: faker.number.int({ min: 60, max: 85 })          // %
  },

  todoList: [
    { id: 1, task: 'Проверить статус незавершенных заявок', completed: false },
    { id: 2, task: 'Обновить кадастровые карты', completed: true },
    { id: 3, task: 'Подготовить отчет по транзакциям', completed: false }
  ]
});

export const dashboardData = generateRealEstateData();