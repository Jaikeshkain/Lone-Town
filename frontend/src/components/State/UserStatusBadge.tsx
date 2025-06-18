import React from 'react';

type UserStatus = 'frozen' | 'matched' | 'available';

interface UserStatusBadgeProps {
  status: UserStatus;
}

const UserStatusBadge: React.FC<UserStatusBadgeProps> = ({ status }) => {
  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case 'frozen':
        return 'blue';
      case 'matched':
        return 'green';
      case 'available':
        return 'gray';
      default:
        return 'gray';
    }
  };

  return (
    <div className={`status-badge ${status}`} style={{ backgroundColor: getStatusColor(status) }}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
};

export default UserStatusBadge; 