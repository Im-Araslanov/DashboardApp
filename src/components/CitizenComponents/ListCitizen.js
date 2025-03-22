import React, { useState, useEffect, useMemo } from "react";
import { Table, Input, Pagination, Modal, Spin, Alert } from "antd";
import CitizenCardPage from "../../pages/CitizenCardPage";
import "./ListCitizen.scss";

const CitizenList = () => {
  const [citizens, setCitizens] = useState([]);
  const [selectedCitizen, setSelectedCitizen] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ field: null, order: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const pageSize = 20;

  // Загрузка данных из файла
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/citizens.json");
        if (!response.ok) throw new Error("Ошибка загрузки данных");
        const data = await response.json();

        if (!data.citizens || !Array.isArray(data.citizens)) {
          throw new Error("Некорректный формат данных");
        }

        setCitizens(data.citizens);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterableFields = useMemo(
    () => [
      "fullName",
      "birthDate",
      "phone",
      "address",
      "citizenship",
      "profession",
    ],
    []
  );

  const processedData = useMemo(() => {
    if (!citizens) return [];

    return citizens
      .filter((item) => {
        const matchesSearch = filterableFields.some((field) =>
          String(item[field]).toLowerCase().includes(searchTerm.toLowerCase())
        );

        const matchesFilters = Object.entries(filters).every(([key, value]) =>
          !value || String(item[key]).toLowerCase() === value.toLowerCase()
        );

        return matchesSearch && matchesFilters;
      })
      .sort((a, b) => {
        if (!sortConfig.field) return 0;
        const aValue = a[sortConfig.field];
        const bValue = b[sortConfig.field];

        if (aValue < bValue) return sortConfig.order === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.order === "asc" ? 1 : -1;
        return 0;
      });
  }, [citizens, searchTerm, filters, sortConfig, filterableFields]);

  const columns = [
    {
      title: "ФИО",
      dataIndex: "fullName",
      sorter: true,
    },
    {
      title: "Дата рождения",
      dataIndex: "birthDate",
      sorter: true,
    },
    {
      title: "Телефон",
      dataIndex: "phone",
    },
    {
      title: "Адрес",
      dataIndex: "address",
    },
    {
      title: "Гражданство",
      dataIndex: "citizenship",
      filters: [
        { text: "Россия", value: "Россия" },
        { text: "Беларусь", value: "Беларусь" },
      ],
    },
    {
      title: "Профессия",
      dataIndex: "profession",
      filters: [
        { text: "Менеджер", value: "Менеджер" },
        { text: "Инженер", value: "Инженер" },
      ],
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    setSortConfig({
      field: sorter.field,
      order: sorter.order === "ascend" ? "asc" : "desc",
    });
    setFilters(filters);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" tip="Загрузка данных..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <Alert message="Ошибка" description={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <div className="citizen-list-container">
      <div className="list-header">
        <Input.Search
          placeholder="Поиск по всем полям..."
          onChange={handleSearch}
          style={{ width: 400 }}
        />
        <div className="total-count">
          Всего записей: {processedData.length}
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={processedData.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )}
        rowKey="id"
        onChange={handleTableChange}
        pagination={false}
        onRow={(record) => ({
          onClick: () => setSelectedCitizen(record),
        })}
      />

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={processedData.length}
        onChange={(page) => setCurrentPage(page)}
        showSizeChanger={false}
      />

      <Modal
        title="Карточка гражданина"
        open={!!selectedCitizen}
        onCancel={() => setSelectedCitizen(null)}
        footer={null}
        width={800}
      >
        {selectedCitizen && (
          <CitizenCardPage
            citizenId={selectedCitizen.id}
            citizenData={selectedCitizen}
          />
        )}
      </Modal>
    </div>
  );
};

export default CitizenList;
