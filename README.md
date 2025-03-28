# DashboardApp

DashboardApp — это современное React-приложение, предназначенное для создания и управления дашбордом с динамическим интерфейсом. Проект был создан с использованием [Create React App](https://github.com/facebook/create-react-app) и включает множество страниц и функциональных возможностей, которые делают работу с данными быстрой и удобной.

---

## Описание страниц и функционала

# DashboardPage (Главная панель)

## Обзор ключевых показателей  
### Отображение интерактивных KPI-карт, демонстрирующих:  
- **Общее число граждан** — количество зарегистрированных пользователей (иконка: *FaUsers*).  
- **Процент выполнения плана** — текущий процент выполнения поставленных задач (иконка: *FaChartBar*).  
- **Уровень удовлетворенности** — средний уровень удовлетворенности пользователей (иконка: *FaSmile*).  
- **Активные пользователи** — число пользователей, активно использующих портал (иконка: *FaFire*).  
- **Среднее время обработки** — время, затрачиваемое на обработку одной заявки (иконка: *FaClock*).  
- **Новые заявки** — количество поступивших заявок за выбранный период (иконка: *FaEnvelope*).  

## Визуализация данных  
Три типа графиков для анализа:  
- **Линейный график** — динамика изменений по выбранному периоду с выбором периода через *TimeFilter*.  
- **Столбчатый график** — сравнение показателей по регионам.  
- **Круговая диаграмма** — распределение статусов заявок.  

## Секции задач  

### Интеграция таблицы задач (TasksTable)  
Отображение списка задач с их статусом, прогрессом и сроками выполнения.  

**Функционал**  
- Загрузка данных из `fakeData.json`.  
- Индикация статусов (*одобрено*, *ошибка*, *отключено*).  
- Возможность отмечать задачи как выполненные.  
- Адаптация интерфейса: таблица на десктопе, карточки на мобильных.  

### Интеграция списка дел (TodoList)  
Инструмент для планирования задач сотрудников.  

**Функционал**  
- Добавление и сохранение задач в `localStorage`.  
- Отметка выполненных задач.  
- Перетаскивание (drag & drop) для изменения порядка.  

**Информационные подсказки**  
Рядом со списком поясняется его назначение — упрощение планирования задач сотрудников.  

---

# CitizensListPage (Список граждан)
- **Таблица с данными граждан:**  
  Детальное представление информации о каждом гражданине в виде таблицы.
- **Фильтрация и сортировка:**  
  Возможность сортировки по различным полям и применения фильтров для быстрого поиска нужной информации.
- **Массовые операции:**  
  Функционал для группового удаления или экспорта выбранных записей.
- **Управление видимостью столбцов:**  
  Настройка отображения столбцов, с возможностью скрывать или показывать нужные данные.

---

# NewCitizenPage (Добавление нового гражданина)
- **Многоэтапная форма добавления:**  
  Процесс добавления нового гражданина разбит на несколько шагов, что упрощает ввод данных.
- **Валидация полей:**  
  Проверка корректности введённых данных с отображением сообщений об ошибках.
- **Генерация ID:**  
  Автоматическое создание уникального идентификатора для каждого нового гражданина.
- **Автосохранение данных:**  
  Функция автосохранения введённой информации, предотвращающая потерю данных в случае сбоя или случайного закрытия формы.

---

## CitizenCardPage (Карточка гражданина)
- **Подробная информация о гражданине:**  
  Страница, отображающая полные данные выбранного гражданина, включая личную информацию и контакты.
- **История заявок:**  
  Список всех обращений и заявок, связанных с данным гражданином.
- **Список членов семьи:**  
  Информация о членах семьи гражданина с возможностью быстрого доступа к карточкам каждого из них.
- **Редактирование данных:**  
  Возможность изменения и обновления информации с удобным интерфейсом редактирования.

---

### Дизайн-система
- **Цветовая схема:**  
  Использование готовых решений из [Ant Design](https://ant.design) для единообразного визуального стиля.
- **Адаптивная верстка:**  
  Оптимизированное отображение на различных устройствах с использованием медиа-запросов.
- **Кастомные стили (SCSS):**  
  Собственные стили для дополнительной настройки внешнего вида компонентов.
- **Иконки:**  
  Применение иконок из библиотеки [@ant-design/icons](https://ant.design/components/icon/) для визуального улучшения интерфейса.

---

### Производительность
- **Мемоизация компонентов:**  
  Оптимизация рендеринга за счёт мемоизации, предотвращающей лишние обновления.
- **Виртуализация таблиц:**  
  Эффективное отображение больших наборов данных за счёт виртуализации строк.
- **Оптимизированные запросы API:**  
  Минимизация количества и объёма запросов для быстрого получения и обработки данных.
- **Ленивая загрузка компонентов:**  
  Динамическая подгрузка компонентов по мере необходимости, ускоряющая начальную загрузку приложения.

---

## Особенности

- **CRUD операции** с данными граждан
- Расширенная **таблица данных** с сортировкой и фильтрацией
- **Поиск** по всем полям с подсветкой результатов
- **Экспорт данных** в CSV/Excel
- Адаптивный и современный **UI/UX дизайн**
- Управление видимостью столбцов таблицы
- Модальные окна для **деталей записей**
- Валидация форм при добавлении/редактировании
- Локализация на русский язык
- Оптимизированная производительность

##  Технологии

- **Frontend**: 
  - React 18
  - Ant Design 5
  - React Router 6
  - Axios
  - Lodash
- **Backend**:
  - json-server (моковый API)
- **Инструменты**:
  - Webpack
  - ESLint
  - SCSS
 
  ---

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.  
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.  
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.
