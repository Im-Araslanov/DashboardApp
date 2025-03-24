import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  message,
  Space,
  Tabs
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import '../styles/NewCitizenPage.scss'; // Импорт SCSS-стилей, аналогичных CitizensListPage

const { Option } = Select;
const { TextArea } = Input;

const NewCitizenPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Преобразуем объекты moment в формат "YYYY-MM-DD"
      const formattedValues = {
        ...values,
        birthDate: values.birthDate ? values.birthDate.format("YYYY-MM-DD") : null,
        applicationHistory: values.applicationHistory
          ? values.applicationHistory.map(item => ({
              ...item,
              applicationDate: item.applicationDate ? item.applicationDate.format("YYYY-MM-DD") : null
            }))
          : [],
        familyMembers: values.familyMembers
          ? values.familyMembers.map(item => ({
              ...item,
              birthDate: item.birthDate ? item.birthDate.format("YYYY-MM-DD") : null
            }))
          : []
      };

      // Получаем текущий список граждан
      const response = await fetch("/citizens");
      const citizens = await response.json();

      // Генерируем новый основной ID
      const maxId = citizens.length > 0 
        ? Math.max(...citizens.map(c => parseInt(c.id))) 
        : 0;
      const newCitizenId = String(maxId + 1);

      // Формируем объект нового гражданина
      const newCitizen = {
        ...formattedValues,
        id: newCitizenId,
        phone: formattedValues.phone || "",
        email: formattedValues.email || "",
        citizenship: formattedValues.citizenship || "Россия",
        workplace: formattedValues.workplace || "",
        profession: formattedValues.profession || "",
        passportNumber: formattedValues.passportNumber || "",
        socialSecurityNumber: formattedValues.socialSecurityNumber || "",
        education: formattedValues.education || "Высшее",
        registrationDate: new Date().toISOString().split("T")[0]
      };

      // Автоматически генерируем ID для каждой заявки: "[citizenId]-[индекс]"
      newCitizen.applicationHistory = (formattedValues.applicationHistory || []).map((item, index) => ({
        ...item,
        applicationId: `${newCitizenId}-${index + 1}`
      }));

      // Отправляем POST-запрос
      await fetch("/citizens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCitizen),
      });

      message.success("Гражданин успешно добавлен!");
      navigate("/citizens-list", { state: { refresh: true } });
    } catch (error) {
      console.error("Ошибка:", error);
      message.error("Ошибка при добавлении гражданина!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="citizens-page">
      <div className="main-toolbar">
        <h2>Добавить нового гражданина</h2>
      </div>
      <div className="form-container">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ 
            education: "Высшее",
            citizenship: "Россия"
          }}
        >
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Основная информация" key="1">
              <Form.Item 
                name="fullName" 
                label="ФИО" 
                rules={[{ required: true, message: 'Обязательное поле' }]}
              >
                <Input placeholder="Иванов Иван Иванович" />
              </Form.Item>
              <Form.Item 
                name="birthDate" 
                label="Дата рождения" 
                rules={[{ required: true, message: 'Обязательное поле' }]}
              >
                <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item 
                name="gender" 
                label="Пол" 
                rules={[{ required: true, message: 'Обязательное поле' }]}
              >
                <Select>
                  <Option value="Мужчина">Мужчина</Option>
                  <Option value="Женщина">Женщина</Option>
                </Select>
              </Form.Item>
              <Form.Item 
                name="maritalStatus" 
                label="Семейное положение" 
                rules={[{ required: true, message: 'Обязательное поле' }]}
              >
                <Select>
                  <Option value="Женат">Женат</Option>
                  <Option value="Не женат">Не женат</Option>
                  <Option value="Замужем">Замужем</Option>
                  <Option value="Не замужем">Не замужем</Option>
                </Select>
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Контактная информация" key="2">
              <Form.Item name="address" label="Адрес">
                <TextArea placeholder="г. Москва, ул. Ленина, д. 15" rows={2} />
              </Form.Item>
              <Form.Item name="phone" label="Телефон">
                <Input placeholder="+7 900 123 45 67" />
              </Form.Item>
              <Form.Item name="email" label="Email">
                <Input placeholder="example@mail.ru" />
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Документы" key="3">
              <Form.Item name="passportNumber" label="Номер паспорта">
                <Input placeholder="1234 567890" />
              </Form.Item>
              <Form.Item name="socialSecurityNumber" label="СНИЛС">
                <Input placeholder="123-45-6789" />
              </Form.Item>
              <Form.Item name="citizenship" label="Гражданство">
                <Input />
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Профессиональная информация" key="4">
              <Form.Item name="workplace" label="Место работы">
                <Input placeholder="ООО 'Компания'" />
              </Form.Item>
              <Form.Item name="profession" label="Профессия">
                <Input placeholder="Менеджер" />
              </Form.Item>
              <Form.Item name="education" label="Образование">
                <Select>
                  <Option value="Высшее">Высшее</Option>
                  <Option value="Среднее профессиональное">Среднее профессиональное</Option>
                  <Option value="Среднее">Среднее</Option>
                  <Option value="Неоконченное среднее">Неоконченное среднее</Option>
                </Select>
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="История заявок" key="5">
              <Form.List name="applicationHistory">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, "applicationDate"]}
                          rules={[{ required: true, message: "Введите дату заявки" }]}
                        >
                          <DatePicker format="YYYY-MM-DD" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "status"]}
                          rules={[{ required: true, message: "Выберите статус" }]}
                        >
                          <Select placeholder="Статус">
                            <Option value="Одобрено">Одобрено</Option>
                            <Option value="Отклонено">Отклонено</Option>
                          </Select>
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Добавить заявку
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Члены семьи" key="6">
              <Form.List name="familyMembers">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, "name"]}
                          rules={[{ required: true, message: "Введите ФИО" }]}
                        >
                          <Input placeholder="ФИО" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "relationship"]}
                          rules={[{ required: true, message: "Введите родство" }]}
                        >
                          <Input placeholder="Родство (например, Сын)" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "birthDate"]}
                          rules={[{ required: true, message: "Введите дату рождения" }]}
                        >
                          <DatePicker format="YYYY-MM-DD" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Добавить члена семьи
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Tabs.TabPane>
          </Tabs>
          <Form.Item className="submit-button">
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              style={{ width: 150 }}
            >
              {loading ? 'Сохранение...' : 'Добавить'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default NewCitizenPage;
