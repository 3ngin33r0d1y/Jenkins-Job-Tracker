import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardContainer = styled.div`
  padding: 20px;
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const DashboardTitle = styled.h2`
  color: var(--primary-color);
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background-color: var(--surface-color);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StatTitle = styled.h3`
  margin-bottom: 10px;
  color: var(--text-color);
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.success ? 'var(--success-color)' : props.failure ? 'var(--error-color)' : 'var(--primary-color)'};
`;

const ChartContainer = styled.div`
  background-color: var(--surface-color);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  align-items: center;
`;

const FilterLabel = styled.label`
  color: var(--text-color);
  font-weight: 500;
`;

const DateInput = styled.input`
  background-color: var(--background-color);
  border: 1px solid #333;
  border-radius: 4px;
  color: var(--text-color);
  padding: 8px 12px;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const Button = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: var(--secondary-color);
  }
`;

const JobsTable = styled.div`
  background-color: var(--surface-color);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px 15px;
  border-bottom: 1px solid #333;
  color: var(--primary-color);
`;

const TableRow = styled.tr`
  &:hover {
    background-color: rgba(255, 0, 0, 0.05);
  }
`;

const TableCell = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #333;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props =>
      props.status === 'SUCCESS' ? 'var(--success-color)' :
          props.status === 'FAILURE' ? 'var(--error-color)' :
              props.status === 'RUNNING' ? 'var(--warning-color)' : '#555'};
  color: white;
`;

const Dashboard = () => {
  // Mock data for demonstration
  const [stats, setStats] = useState({
    totalJobs: 0,
    successCount: 0,
    failureCount: 0,
    runningCount: 0
  });

  const [jobs, setJobs] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days ago
    endDate: new Date().toISOString().split('T')[0] // today
  });

  // Mock data for chart
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Successful Jobs',
        data: [],
        backgroundColor: 'rgba(76, 175, 80, 0.6)',
      },
      {
        label: 'Failed Jobs',
        data: [],
        backgroundColor: 'rgba(244, 67, 54, 0.6)',
      }
    ]
  });

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#b3b3b3'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#b3b3b3'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#ffffff'
        }
      },
      title: {
        display: true,
        text: 'Job Results by Date',
        color: '#ffffff',
        font: {
          size: 16
        }
      }
    }
  };

  // Function to generate mock data
  const generateMockData = () => {
    // Parse dates
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);

    // Generate date range
    const dates = [];
    const successData = [];
    const failureData = [];

    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));

      // Random data
      const successCount = Math.floor(Math.random() * 10);
      const failureCount = Math.floor(Math.random() * 5);

      successData.push(successCount);
      failureData.push(failureCount);

      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Update chart data
    setChartData({
      labels: dates,
      datasets: [
        {
          label: 'Successful Jobs',
          data: successData,
          backgroundColor: 'rgba(76, 175, 80, 0.6)',
        },
        {
          label: 'Failed Jobs',
          data: failureData,
          backgroundColor: 'rgba(244, 67, 54, 0.6)',
        }
      ]
    });

    // Generate mock jobs
    const mockJobs = [];
    for (let i = 1; i <= 10; i++) {
      const status = Math.random() > 0.7 ? 'FAILURE' : Math.random() > 0.9 ? 'RUNNING' : 'SUCCESS';
      const date = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));

      mockJobs.push({
        id: i,
        name: `Job ${i}`,
        status,
        lastRun: date.toLocaleString(),
        duration: `${Math.floor(Math.random() * 10) + 1}m ${Math.floor(Math.random() * 50) + 10}s`
      });
    }

    setJobs(mockJobs);

    // Update stats
    const successCount = mockJobs.filter(job => job.status === 'SUCCESS').length;
    const failureCount = mockJobs.filter(job => job.status === 'FAILURE').length;
    const runningCount = mockJobs.filter(job => job.status === 'RUNNING').length;

    setStats({
      totalJobs: mockJobs.length,
      successCount,
      failureCount,
      runningCount
    });
  };

  // Handle date filter change
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Apply date filter
  const applyDateFilter = () => {
    generateMockData();
  };

  // Initial data load
  useEffect(() => {
    generateMockData();
  }, []);

  return (
      <DashboardContainer>
        <DashboardHeader>
          <DashboardTitle>Jenkins Dashboard</DashboardTitle>
        </DashboardHeader>

        <StatsContainer>
          <StatCard>
            <StatTitle>Total Jobs</StatTitle>
            <StatValue>{stats.totalJobs}</StatValue>
          </StatCard>
          <StatCard>
            <StatTitle>Successful Jobs</StatTitle>
            <StatValue success>{stats.successCount}</StatValue>
          </StatCard>
          <StatCard>
            <StatTitle>Failed Jobs</StatTitle>
            <StatValue failure>{stats.failureCount}</StatValue>
          </StatCard>
          <StatCard>
            <StatTitle>Running Jobs</StatTitle>
            <StatValue>{stats.runningCount}</StatValue>
          </StatCard>
        </StatsContainer>

        <ChartContainer>
          <FilterContainer>
            <FilterLabel>Date Range:</FilterLabel>
            <DateInput
                type="date"
                name="startDate"
                value={dateRange.startDate}
                onChange={handleDateChange}
            />
            <FilterLabel>to</FilterLabel>
            <DateInput
                type="date"
                name="endDate"
                value={dateRange.endDate}
                onChange={handleDateChange}
            />
            <Button onClick={applyDateFilter}>Apply</Button>
          </FilterContainer>

          <div style={{ height: '300px' }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </ChartContainer>

        <JobsTable>
          <DashboardTitle>Recent Jobs</DashboardTitle>
          <Table>
            <thead>
            <tr>
              <TableHeader>Job Name</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Last Run</TableHeader>
              <TableHeader>Duration</TableHeader>
            </tr>
            </thead>
            <tbody>
            {jobs.map(job => (
                <TableRow key={job.id}>
                  <TableCell>{job.name}</TableCell>
                  <TableCell>
                    <StatusBadge status={job.status}>
                      {job.status}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>{job.lastRun}</TableCell>
                  <TableCell>{job.duration}</TableCell>
                </TableRow>
            ))}
            </tbody>
          </Table>
        </JobsTable>
      </DashboardContainer>
  );
};

export default Dashboard;
