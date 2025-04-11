import React, { useState } from 'react';
import styled from 'styled-components';

const ScheduleFormContainer = styled.div`
  background-color: var(--surface-color);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const FormTitle = styled.h3`
  margin-bottom: 16px;
  color: var(--primary-color);
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  background-color: var(--background-color);
  border: 1px solid #333;
  border-radius: 4px;
  color: var(--text-color);
  
  &:focus {
    border-color: var(--primary-color);
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
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
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: var(--secondary-color);
  }
  
  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }
`;

const ScheduleForm = ({ jobs, onSubmit, initialValues = null }) => {
  const [formData, setFormData] = useState(initialValues || {
    jobId: '',
    cronExpression: '',
    enabled: true,
    description: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <ScheduleFormContainer>
      <FormTitle>{initialValues ? 'Edit Schedule' : 'Create New Schedule'}</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="jobId">Select Job</Label>
          <Select 
            id="jobId" 
            name="jobId" 
            value={formData.jobId} 
            onChange={handleChange}
            required
          >
            <option value="">Select a job...</option>
            {jobs.map(job => (
              <option key={job.id} value={job.id}>{job.name}</option>
            ))}
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="cronExpression">Cron Expression</Label>
          <Input 
            type="text" 
            id="cronExpression" 
            name="cronExpression" 
            value={formData.cronExpression} 
            onChange={handleChange}
            placeholder="e.g. 0 0 * * *"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <Input 
            type="text" 
            id="description" 
            name="description" 
            value={formData.description} 
            onChange={handleChange}
            placeholder="Schedule description"
          />
        </FormGroup>
        
        <FormGroup>
          <Label>
            <Input 
              type="checkbox" 
              name="enabled" 
              checked={formData.enabled} 
              onChange={handleChange}
            />
            Enabled
          </Label>
        </FormGroup>
        
        <Button type="submit">
          {initialValues ? 'Update Schedule' : 'Create Schedule'}
        </Button>
      </form>
    </ScheduleFormContainer>
  );
};

export default ScheduleForm;
