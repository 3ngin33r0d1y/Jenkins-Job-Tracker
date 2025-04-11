import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import ScheduleForm from './ScheduleForm';

const ScheduleContainer = styled.div`
  padding: 20px;
`;

const ScheduleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: var(--primary-color);
`;

const ScheduleList = styled.div`
  margin-top: 20px;
`;

const ScheduleItem = styled.div`
  background-color: var(--surface-color);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ScheduleInfo = styled.div`
  flex: 1;
`;

const ScheduleName = styled.h3`
  margin-bottom: 8px;
  color: var(--text-color);
`;

const ScheduleDetail = styled.div`
  color: var(--text-secondary-color);
  margin-bottom: 4px;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => props.enabled ? 'var(--success-color)' : '#555'};
  color: white;
  margin-left: 8px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  background-color: ${props => props.danger ? 'var(--error-color)' : 'var(--primary-color)'};
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.danger ? '#d32f2f' : 'var(--secondary-color)'};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: var(--text-secondary-color);
`;

const ScheduleManager = () => {
  const dispatch = useDispatch();
  const { jobs } = useSelector(state => state.jobs);
  const { schedules, loading } = useSelector(state => state.schedule);
  const [showForm, setShowForm] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);

  useEffect(() => {
    // Fetch schedules when component mounts
    // dispatch(fetchSchedules());
  }, [dispatch]);

  const handleCreateSchedule = (scheduleData) => {
    // dispatch(createSchedule(scheduleData));
    setShowForm(false);
  };

  const handleUpdateSchedule = (scheduleData) => {
    // dispatch(updateSchedule(scheduleData));
    setEditingSchedule(null);
  };

  const handleDeleteSchedule = (scheduleId) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      // dispatch(deleteSchedule(scheduleId));
    }
  };

  const handleEditClick = (schedule) => {
    setEditingSchedule(schedule);
    setShowForm(false);
  };

  const handleToggleEnabled = (schedule) => {
    const updatedSchedule = {
      ...schedule,
      enabled: !schedule.enabled
    };
    // dispatch(updateSchedule(updatedSchedule));
  };

  return (
    <ScheduleContainer>
      <ScheduleHeader>
        <Title>Job Schedules</Title>
        <Button onClick={() => {
          setShowForm(!showForm);
          setEditingSchedule(null);
        }}>
          {showForm ? 'Cancel' : 'Create New Schedule'}
        </Button>
      </ScheduleHeader>

      {showForm && (
        <ScheduleForm 
          jobs={jobs} 
          onSubmit={handleCreateSchedule} 
        />
      )}

      {editingSchedule && (
        <ScheduleForm 
          jobs={jobs} 
          initialValues={editingSchedule} 
          onSubmit={handleUpdateSchedule} 
        />
      )}

      <ScheduleList>
        {loading ? (
          <div>Loading schedules...</div>
        ) : schedules.length === 0 ? (
          <EmptyState>
            <p>No schedules found. Create a new schedule to get started.</p>
          </EmptyState>
        ) : (
          schedules.map(schedule => (
            <ScheduleItem key={schedule.id}>
              <ScheduleInfo>
                <ScheduleName>
                  {schedule.description || `Schedule for ${schedule.jobName}`}
                  <StatusBadge enabled={schedule.enabled}>
                    {schedule.enabled ? 'Enabled' : 'Disabled'}
                  </StatusBadge>
                </ScheduleName>
                <ScheduleDetail>Job: {schedule.jobName}</ScheduleDetail>
                <ScheduleDetail>Cron: {schedule.cronExpression}</ScheduleDetail>
                <ScheduleDetail>Next Run: {new Date(schedule.nextRun).toLocaleString()}</ScheduleDetail>
              </ScheduleInfo>
              <ActionButtons>
                <Button onClick={() => handleToggleEnabled(schedule)}>
                  {schedule.enabled ? 'Disable' : 'Enable'}
                </Button>
                <Button onClick={() => handleEditClick(schedule)}>Edit</Button>
                <Button danger onClick={() => handleDeleteSchedule(schedule.id)}>Delete</Button>
              </ActionButtons>
            </ScheduleItem>
          ))
        )}
      </ScheduleList>
    </ScheduleContainer>
  );
};

export default ScheduleManager;
