import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, Descriptions, Spin, Alert, Button } from 'antd';
import FamilyMembersSection from '../components/CitizenComponents/FamilyMembersSection';
import ApplicationHistorySection from '../components/CitizenComponents/ApplicationHistorySection';
import '../styles/CitizenCardPage.scss';

const { TabPane } = Tabs;

const CitizenCardPage = ({ citizenData: initialData, isModal = false, onClose }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [citizenData, setCitizenData] = useState(initialData || null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState(null);

  // Загрузка данных
  useEffect(() => {
    if (!initialData && id) {
      const fetchData = async () => {
        try {
          const response = await fetch('/citizens.json');
          if (!response.ok) throw new Error('Ошибка загрузки');
          const data = await response.json();
          const foundCitizen = data.citizens.find(c => c.id === Number(id));
          if (!foundCitizen) throw new Error('Гражданин не найден');
          setCitizenData(foundCitizen);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [id, initialData]);

  const handleClose = () => {
    if (isModal && onClose) {
      onClose();
    } else {
      navigate('/citizens');
    }
  };

  if (loading) {
    return (
      <div className="spin-container">
        <Spin size="large" tip="Загрузка..." />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Ошибка"
        description={error}
        type="error"
        showIcon
        action={
          <Button type="primary" onClick={handleClose}>
            {isModal ? 'Закрыть' : 'На главную'}
          </Button>
        }
      />
    );
  }

  if (!citizenData) {
    return (
      <Alert
        message="Данные не найдены"
        type="warning"
        showIcon
      />
    );
  }

  return (
    <div className={`citizen-card-page ${isModal ? 'modal-mode' : ''}`}>
      <h1 className="page-title">Карточка гражданина</h1>
      
      <div className="header-info">
        <div className="main-photo">
          <div className="photo-placeholder" />
        </div>
        <div className="quick-info">
          <h2>{citizenData.fullName || 'Не указано'}</h2>
          <p>ID: {citizenData.id || 'Не указан'}</p>
          <p>Дата регистрации: {citizenData.registrationDate || 'Не указана'}</p>
        </div>
      </div>

      <Tabs defaultActiveKey="1">
      <TabPane tab="Основная информация" key="1">
  <div className="info-section">
    <Descriptions bordered column={2}>
      <Descriptions.Item label="ФИО">{citizenData.fullName}</Descriptions.Item>
      <Descriptions.Item label="Дата рождения">{citizenData.birthDate}</Descriptions.Item>
      <Descriptions.Item label="Пол">{citizenData.gender}</Descriptions.Item>
      <Descriptions.Item label="Семейное положение">{citizenData.maritalStatus}</Descriptions.Item>
      <Descriptions.Item label="Адрес" span={2}>{citizenData.address}</Descriptions.Item>
      <Descriptions.Item label="Телефон">{citizenData.phone}</Descriptions.Item>
      <Descriptions.Item label="Email">{citizenData.email}</Descriptions.Item>
      <Descriptions.Item label="Паспорт">{citizenData.passportNumber}</Descriptions.Item>
      <Descriptions.Item label="Гражданство">{citizenData.citizenship}</Descriptions.Item>
    </Descriptions>
  </div>
</TabPane>
        <TabPane tab={`Члены семьи (${citizenData.familyMembers?.length || 0})`} key="2">
          <FamilyMembersSection data={citizenData.familyMembers || []} />
        </TabPane>
        <TabPane tab={`Заявки (${citizenData.applicationHistory?.length || 0})`} key="3">
          <ApplicationHistorySection data={citizenData.applicationHistory || []} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default CitizenCardPage;