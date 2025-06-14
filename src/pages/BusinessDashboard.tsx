
import React from "react";
import { useUser } from "../contexts/UserContext";
import { LogOut, ArrowLeft, Users, TrendingUp, Calendar, DollarSign } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { useNavigate } from "react-router-dom";

const BusinessDashboard = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  // Mock business data
  const businessData = {
    totalRevenue: 850000,
    monthlyRevenue: 125000,
    activeCustomers: 45,
    pendingPayments: 15,
    customers: [
      {
        id: 1,
        name: "John Mburu",
        item: "HP ProBook Laptop",
        totalAmount: 45000,
        paidAmount: 30000,
        nextPayment: "2025-01-15",
        status: "Active"
      },
      {
        id: 2,
        name: "Mary Wanjiku",
        item: "Samsung Galaxy S23",
        totalAmount: 25000,
        paidAmount: 25000,
        nextPayment: "Completed",
        status: "Completed"
      },
      {
        id: 3,
        name: "Peter Kiplagat",
        item: "Dell Inspiron",
        totalAmount: 35000,
        paidAmount: 7000,
        nextPayment: "2025-01-10",
        status: "Overdue"
      }
    ],
    recentTransactions: [
      { date: "2025-01-05", customer: "John Mburu", amount: 5000, item: "HP ProBook" },
      { date: "2025-01-03", customer: "Mary Wanjiku", amount: 5000, item: "Samsung Galaxy" },
      { date: "2025-01-01", customer: "Peter Kiplagat", amount: 7000, item: "Dell Inspiron" }
    ]
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#f6fbfd] p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
              <p className="text-muted-foreground">Business Dashboard</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut size={16} />
            Logout
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="text-green-600" size={20} />
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-xl font-bold">KSh {businessData.totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="text-blue-600" size={20} />
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                  <p className="text-xl font-bold">KSh {businessData.monthlyRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="text-purple-600" size={20} />
                <div>
                  <p className="text-sm text-muted-foreground">Active Customers</p>
                  <p className="text-xl font-bold">{businessData.activeCustomers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="text-orange-600" size={20} />
                <div>
                  <p className="text-sm text-muted-foreground">Pending Payments</p>
                  <p className="text-xl font-bold">{businessData.pendingPayments}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Management */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Customer Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Paid Amount</TableHead>
                  <TableHead>Next Payment</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {businessData.customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.item}</TableCell>
                    <TableCell>KSh {customer.totalAmount.toLocaleString()}</TableCell>
                    <TableCell>KSh {customer.paidAmount.toLocaleString()}</TableCell>
                    <TableCell>{customer.nextPayment}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        customer.status === 'Active' ? 'bg-green-100 text-green-800' :
                        customer.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {customer.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {businessData.recentTransactions.map((transaction, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{transaction.customer}</p>
                    <p className="text-sm text-muted-foreground">{transaction.item}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">KSh {transaction.amount.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessDashboard;
