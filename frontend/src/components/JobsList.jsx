import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

const JobsContainer = styled.div`
  padding: 20px;
`;

const JobsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: var(--primary-color);
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 300px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  background-color: var(--background-color);
  border: 1px solid #333;
  border-radius: 4px;
  color: var(--text-color);

  &:focus {
    border-color: var(--primary-color);
    outline: none;
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

const JobsListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const JobCard = styled.div`
  background-color: var(--surface-color);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const JobName = styled.h3`
  margin-bottom: 10px;
  color: var(--text-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const JobDetail = styled.div`
  color: var(--text-secondary-color);
  margin-bottom: 5px;
  font-size: 14px;
`;

const JobActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const ActionButton = styled.button`
  flex: 1;
  background-color: ${props => props.secondary ? 'transparent' : 'var(--primary-color)'};
  color: ${props => props.secondary ? 'var(--primary-color)' : 'white'};
  border: ${props => props.secondary ? '1px solid var(--primary-color)' : 'none'};
  padding: 8px 0;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: ${props => props.secondary ? 'rgba(255, 0, 0, 0.1)' : 'var(--secondary-color)'};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  grid-column: 1 / -1;
  color: var(--text-secondary-color);
`;

const JobsListComponent = () => {
  const dispatch = useDispatch();
  const { jobs, loading } = useSelector(state => state.jobs);
  const [searchTerm, setSearchTerm] = React.useState('');

  // Mock data for demonstration
  const mockJobs = [
    {
      id: 1,
      name: 'Build Frontend',
      status: 'SUCCESS',
      lastRun: '2023-04-10 14:30:22',
      duration: '2m 45s',
      description: 'Builds the React frontend application'
    },
    {
      id: 2,
      name: 'Deploy to Production',
      status: 'FAILURE',
      lastRun: '2023-04-10 15:45:10',
      duration: '5m 12s',
      description: 'Deploys the application to production environment'
    },
    {
      id: 3,
      name: 'Run Unit Tests',
      status: 'SUCCESS',
      lastRun: '2023-04-10 13:15:33',
      duration: '3m 22s',
      description: 'Executes all unit tests'
    },
    {
      id: 4,
      name: 'Database Backup',
      status: 'RUNNING',
      lastRun: '2023-04-10 16:00:00',
      duration: '1m 30s',
      description: 'Creates a backup of the production database'
    },
    {
      id: 5,
      name: 'Security Scan',
      status: 'SUCCESS',
      lastRun: '2023-04-09 22:10:45',
      duration: '10m 05s',
      description: 'Performs security vulnerability scanning'
    },
    {
      id: 6,
      name: 'Build Backend',
      status: 'SUCCESS',
      lastRun: '2023-04-10 14:15:30',
      duration: '1m 55s',
      description: 'Builds the Node.js backend application'
    }
  ];

  // Filter jobs based on search term
  const filteredJobs = mockJobs.filter(job =>
      job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRunJob = (jobId) => {
    console.log(`Running job ${jobId}`);
    // In a real app, this would dispatch an action to run the job
  };

  const handleViewLogs = (jobId) => {
    console.log(`Viewing logs for job ${jobId}`);
    // In a real app, this would navigate to logs view or open a modal
  };

  return (
      <JobsContainer>
        <JobsHeader>
          <Title>Jenkins Jobs</Title>
          <SearchContainer>
            <SearchInput
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
          </SearchContainer>
        </JobsHeader>

        <JobsListGrid>
          {loading ? (
              <EmptyState>Loading jobs...</EmptyState>
          ) : filteredJobs.length === 0 ? (
              <EmptyState>No jobs found matching your search.</EmptyState>
          ) : (
              filteredJobs.map(job => (
                  <JobCard key={job.id}>
                    <JobName>
                      {job.name}
                      <StatusBadge status={job.status}>{job.status}</StatusBadge>
                    </JobName>
                    <JobDetail>{job.description}</JobDetail>
                    <JobDetail><strong>Last Run:</strong> {job.lastRun}</JobDetail>
                    <JobDetail><strong>Duration:</strong> {job.duration}</JobDetail>

                    <JobActions>
                      <ActionButton onClick={() => handleRunJob(job.id)}>
                        Run Now
                      </ActionButton>
                      <ActionButton secondary onClick={() => handleViewLogs(job.id)}>
                        View Logs
                      </ActionButton>
                    </JobActions>
                  </JobCard>
              ))
          )}
        </JobsListGrid>
      </JobsContainer>
  );
};

export default JobsListComponent;
