import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Role } from '../../types';
import './Sidebar.css';

const Sidebar = () => {
  const { user } = useAuth();

  const getNavLinks = () => {
    if (!user) return [];

    // Common link for all roles
    const commonLinks = [
      { to: "/dashboard", label: "Dashboard" }
    ];

    // Role-specific links
    switch (user.role) {
      case Role.STUDENT:
        return [
          ...commonLinks,
          { to: "/dashboard/profile", label: "Profile" }
        ];

      case Role.INSTRUCTOR:
        return [
          ...commonLinks,
          { to: "/dashboard/quiz", label: "Quiz" },
          { to: "/dashboard/schedule", label: "Schedule" },
          { to: "/dashboard/profile", label: "Profile" }
        ];

      case Role.ADMIN:
        return [
          ...commonLinks,
          { to: "/dashboard/users", label: "Users" }
        ];

      case Role.CONTENT_CREATOR:
        return [
          ...commonLinks,
          { to: "/dashboard/course", label: "Course" },
          { to: "/dashboard/document", label: "Document" },
          { to: "/dashboard/quiz", label: "Quiz" }
        ];

      default:
        return commonLinks;
    }
  };

  const navLinks = getNavLinks();

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          {navLinks.map(link => (
            <li key={link.to}>
              <Link to={link.to}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;