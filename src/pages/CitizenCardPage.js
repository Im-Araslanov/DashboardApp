import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, Descriptions, Spin, Alert, Button } from 'antd';
import FamilyMembersSection from '../components/CitizenComponents/FamilyMembersSection';
import ApplicationHistorySection from '../components/CitizenComponents/ApplicationHistorySection';
import '../styles/CitizenCardPage.scss';

const CitizenCardPage = (props) => {
  // Если передан пропс citizenId или citizenData — используем их,
  // иначе пытаемся получить id из URL через useParams
  const { id: idFromParams } = useParams();
  const citizenId = props.citizenId || idFromParams;
  const navigate = useNavigate();
  // Если уже передали данные, используем их сразу
  const [citizenData, setCitizenData] = useState(props.citizenData || null);
  const [loading, setLoading] = useState(props.citizenData ? false : true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Если данные уже есть — повторно загружать не нужно
    if (citizenData) return;
    if (!citizenId) {
      setError('Гражданин не найден');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch('/citizens.json');
        if (!response.ok) throw new Error('Ошибка загрузки');
        const data = await response.json();
        
        if (!data.citizens || !Array.isArray(data.citizens)) {
          throw new Error('Некорректные данные');
        }
        
        const foundCitizen = data.citizens.find(c => c.id === Number(citizenId));
        if (!foundCitizen) throw new Error('Гражданин не найден');
        
        setCitizenData(foundCitizen);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [citizenId, citizenData]);

  if (loading) {
    return (
      <div className="spin-container">
        <Spin size="large" tip="Загрузка..." fullscreen />
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
          <Button type="primary" onClick={() => navigate('/')}>
            На главную
          </Button>
        }
      />
    );
  }

  return (
    <div className="citizen-card-page">
      <Button onClick={() => navigate(-1)} className="back-button">
        ← Назад к списку
      </Button>
      
      <h1 className="page-title">Карточка гражданина</h1>
      
      <div className="header-info">
        <div className="main-photo">
          <div className="photo-placeholder" />
        </div>
        <div className="quick-info">
          <h2>{citizenData?.fullName || 'Не указано'}</h2>
          <p>ID: {citizenData?.id || 'Не указан'}</p>
          <p>Дата регистрации: {citizenData?.registrationDate || 'Не указана'}</p>
        </div>
      </div>

      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: '1',
            label: 'Основная информация',
            children: (
              <Descriptions bordered column={2}>
                <Descriptions.Item label="ФИО">{citizenData?.fullName}</Descriptions.Item>
                <Descriptions.Item label="Дата рождения">{citizenData?.birthDate}</Descriptions.Item>
                <Descriptions.Item label="Пол">{citizenData?.gender}</Descriptions.Item>
                <Descriptions.Item label="Семейное положение">{citizenData?.maritalStatus}</Descriptions.Item>
                <Descriptions.Item label="Адрес" span={2}>{citizenData?.address}</Descriptions.Item>
                <Descriptions.Item label="Телефон">{citizenData?.phone}</Descriptions.Item>
                <Descriptions.Item label="Email">{citizenData?.email}</Descriptions.Item>
                <Descriptions.Item label="Паспорт">{citizenData?.passportNumber}</Descriptions.Item>
                <Descriptions.Item label="Гражданство">{citizenData?.citizenship}</Descriptions.Item>
              </Descriptions>
            )
          },
          {
            key: '2',
            label: `Члены семьи (${citizenData?.familyMembers?.length || 0})`,
            children: <FamilyMembersSection data={citizenData?.familyMembers || []} />
          },
          {
            key: '3',
            label: `Заявки (${citizenData?.applicationHistory?.length || 0})`,
            children: <ApplicationHistorySection data={citizenData?.applicationHistory || []} />
          }
        ]}
      />
    </div>
  );
};

export default CitizenCardPage;
