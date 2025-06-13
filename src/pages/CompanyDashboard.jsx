import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const CompanyDashboard = () => {
  // Dashboard statistics
  const stats = {
    totalEvents: 24,
    ticketsSold: 1842,
    totalRevenue: "$42,850",
    activeUsers: 342,
    conversionRate: "18.7%",
    pendingApprovals: 7
  };

  // Recent activity data
  const [recentActivity] = useState([
    { id: 1, user: "Alex Johnson", action: "Created new event", event: "Tech Summit 2023", time: "10 min ago" },
    { id: 2, user: "Maria Garcia", action: "Updated payment settings", event: "", time: "25 min ago" },
    { id: 3, user: "System", action: "Completed backup", event: "", time: "1 hour ago" },
    { id: 4, user: "David Chen", action: "Processed refund", event: "Music Festival", time: "2 hours ago" },
    { id: 5, user: "Sarah Williams", action: "Added new admin", event: "", time: "5 hours ago" },
  ]);

  // Recent events data
  const [recentEvents] = useState([
    { id: 1, name: "Tech Summit 2023", date: "2023-10-15", attendees: 850, status: "Active", ticketsSold: 850, revenue: "$25,500" },
    { id: 2, name: "Music Festival", date: "2023-11-22", attendees: 450, status: "Active", ticketsSold: 450, revenue: "$13,500" },
    { id: 3, name: "Business Workshop", date: "2023-09-30", attendees: 120, status: "Completed", ticketsSold: 120, revenue: "$3,600" },
    { id: 4, name: "Art Exhibition", date: "2023-12-05", attendees: 180, status: "Upcoming", ticketsSold: 180, revenue: "$5,400" },
    { id: 5, name: "Food Expo", date: "2023-08-15", attendees: 320, status: "Completed", ticketsSold: 320, revenue: "$9,600" },
  ]);

  // Revenue data for chart
  const revenueData = [
    { month: 'Jan', revenue: 8500 },
    { month: 'Feb', revenue: 9200 },
    { month: 'Mar', revenue: 7800 },
    { month: 'Apr', revenue: 10500 },
    { month: 'May', revenue: 11200 },
    { month: 'Jun', revenue: 12850 },
    { month: 'Jul', revenue: 14200 },
    { month: 'Aug', revenue: 13600 },
    { month: 'Sep', revenue: 11800 },
    { month: 'Oct', revenue: 14500 },
    { month: 'Nov', revenue: 16200 },
    { month: 'Dec', revenue: 18500 },
  ];

  // Ticket sales by category
  const ticketData = [
    { name: 'VIP', value: 35 },
    { name: 'General', value: 45 },
    { name: 'Student', value: 15 },
    { name: 'Group', value: 5 }
  ];

  // Color palette for charts
  const COLORS = ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796'];

  // Event status colors
  const statusColors = {
    Active: "success",
    Upcoming: "info",
    Completed: "secondary",
    Draft: "warning",
    Cancelled: "danger"
  };

  // User management data
  const [users] = useState([
    { id: 1, name: "Alex Johnson", email: "alex@example.com", role: "Admin", lastActive: "Today", status: "Active" },
    { id: 2, name: "Maria Garcia", email: "maria@example.com", role: "Event Manager", lastActive: "Yesterday", status: "Active" },
    { id: 3, name: "David Chen", email: "david@example.com", role: "Support", lastActive: "2 days ago", status: "Active" },
    { id: 4, name: "Sarah Williams", email: "sarah@example.com", role: "Finance", lastActive: "Today", status: "Active" },
    { id: 5, name: "James Wilson", email: "james@example.com", role: "Event Manager", lastActive: "1 week ago", status: "Inactive" },
  ]);

  return (
    <div className="container-fluid">
      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Company Dashboard</h1>
        <div className="d-flex">
          <button className="btn btn-sm btn-primary shadow-sm me-2">
            <i className="fas fa-download fa-sm text-white-50 me-1"></i> Generate Report
          </button>
          <button className="btn btn-sm btn-success shadow-sm">
            <i className="fas fa-plus fa-sm text-white-50 me-1"></i> Create Event
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row">
        <div className="col-xl-2 col-md-4 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs fw-bold text-primary text-uppercase mb-1">
                    Total Events
                  </div>
                  <div className="h5 mb-0 fw-bold text-gray-800">{stats.totalEvents}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-calendar fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-2 col-md-4 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs fw-bold text-success text-uppercase mb-1">
                    Tickets Sold
                  </div>
                  <div className="h5 mb-0 fw-bold text-gray-800">{stats.ticketsSold}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-ticket-alt fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-2 col-md-4 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs fw-bold text-info text-uppercase mb-1">
                    Total Revenue
                  </div>
                  <div className="h5 mb-0 fw-bold text-gray-800">{stats.totalRevenue}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-2 col-md-4 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs fw-bold text-warning text-uppercase mb-1">
                    Active Users
                  </div>
                  <div className="h5 mb-0 fw-bold text-gray-800">{stats.activeUsers}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-users fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-2 col-md-4 mb-4">
          <div className="card border-left-secondary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs fw-bold text-secondary text-uppercase mb-1">
                    Conversion Rate
                  </div>
                  <div className="h5 mb-0 fw-bold text-gray-800">{stats.conversionRate}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-percent fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-2 col-md-4 mb-4">
          <div className="card border-left-danger shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs fw-bold text-danger text-uppercase mb-1">
                    Pending Approvals
                  </div>
                  <div className="h5 mb-0 fw-bold text-gray-800">{stats.pendingApprovals}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-exclamation-circle fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="row">
        {/* Revenue Chart */}
        <div className="col-xl-8 col-lg-7">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 fw-bold text-primary">Monthly Revenue</h6>
              <div className="dropdown no-arrow">
                <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                </button>
                <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuButton">
                  <button className="dropdown-item">This Year</button>
                  <button className="dropdown-item">Last Year</button>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item">Export Data</button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="chart-area" style={{ height: '320px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#4e73df" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Category Chart */}
        <div className="col-xl-4 col-lg-5">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 fw-bold text-primary">Ticket Sales by Category</h6>
            </div>
            <div className="card-body">
              <div className="chart-pie pt-4 pb-2" style={{ height: '280px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ticketData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {ticketData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-center small">
                {ticketData.map((data, index) => (
                  <span key={index} className="me-3">
                    <i className="fas fa-circle" style={{ color: COLORS[index] }}></i> {data.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Row - Tables */}
      <div className="row">
        {/* Recent Events */}
        <div className="col-lg-7 mb-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 fw-bold text-primary">Recent Events</h6>
              <a href="#" className="btn btn-sm btn-outline-primary">View All</a>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Event Name</th>
                      <th>Date</th>
                      <th>Attendees</th>
                      <th>Revenue</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentEvents.map(event => (
                      <tr key={event.id}>
                        <td className="fw-bold">{event.name}</td>
                        <td>{event.date}</td>
                        <td>{event.attendees}</td>
                        <td>{event.revenue}</td>
                        <td>
                          <span className={`badge bg-${statusColors[event.status] || 'secondary'}`}>
                            {event.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-1" title="Edit">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-info" title="Analytics">
                            <i className="fas fa-chart-bar"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-lg-5 mb-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 fw-bold text-primary">Recent Activity</h6>
            </div>
            <div className="card-body">
              <div className="list-group">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="list-group-item list-group-item-action border-0">
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                        <i className="fas fa-user"></i>
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between">
                          <h6 className="mb-1">{activity.user}</h6>
                          <small className="text-muted">{activity.time}</small>
                        </div>
                        <p className="mb-1">{activity.action} {activity.event && <span className="text-primary">"{activity.event}"</span>}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <a href="#" className="btn btn-block btn-light mt-3">View All Activity</a>
            </div>
          </div>
        </div>
      </div>

      {/* User Management */}
      <div className="row">
        <div className="col-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 fw-bold text-primary">User Management</h6>
              <button className="btn btn-sm btn-success">
                <i className="fas fa-plus me-1"></i> Add User
              </button>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Last Active</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td className="fw-bold">{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`badge bg-${user.role === 'Admin' ? 'danger' : 'info'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>{user.lastActive}</td>
                        <td>
                          <span className={`badge bg-${user.status === 'Active' ? 'success' : 'secondary'}`}>
                            {user.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-1">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-danger">
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row">
        <div className="col-12">
          <div className="card shadow">
            <div className="card-header py-3">
              <h6 className="m-0 fw-bold text-primary">Quick Actions</h6>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-md-2 mb-3">
                  <button className="btn btn-light rounded-circle p-3">
                    <i className="fas fa-calendar-plus fa-2x text-primary"></i>
                  </button>
                  <p className="mt-2 mb-0">Create Event</p>
                </div>
                <div className="col-md-2 mb-3">
                  <button className="btn btn-light rounded-circle p-3">
                    <i className="fas fa-ticket-alt fa-2x text-success"></i>
                  </button>
                  <p className="mt-2 mb-0">Manage Tickets</p>
                </div>
                <div className="col-md-2 mb-3">
                  <button className="btn btn-light rounded-circle p-3">
                    <i className="fas fa-chart-line fa-2x text-info"></i>
                  </button>
                  <p className="mt-2 mb-0">View Reports</p>
                </div>
                <div className="col-md-2 mb-3">
                  <button className="btn btn-light rounded-circle p-3">
                    <i className="fas fa-users fa-2x text-warning"></i>
                  </button>
                  <p className="mt-2 mb-0">Manage Users</p>
                </div>
                <div className="col-md-2 mb-3">
                  <button className="btn btn-light rounded-circle p-3">
                    <i className="fas fa-cog fa-2x text-secondary"></i>
                  </button>
                  <p className="mt-2 mb-0">Settings</p>
                </div>
                <div className="col-md-2 mb-3">
                  <button className="btn btn-light rounded-circle p-3">
                    <i className="fas fa-question-circle fa-2x text-danger"></i>
                  </button>
                  <p className="mt-2 mb-0">Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;