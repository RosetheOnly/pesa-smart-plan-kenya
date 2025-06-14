
import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { LogOut, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [withdrawnEmergency, setWithdrawnEmergency] = useState(false);

  // Mock customer data - in real app this would come from backend
  const customerData = {
    totalSavings: 12500,
    installments: [
      {
        id: 1,
        item: "HP ProBook Laptop",
        totalAmount: 45000,
        paidAmount: 30000,
        remainingAmount: 15000,
        installmentsPaid: 6,
        totalInstallments: 9,
        monthlyAmount: 5000,
        nextPaymentDate: "2025-01-15"
      },
      {
        id: 2,
        item: "Samsung Galaxy S23",
        totalAmount: 25000,
        paidAmount: 25000,
        remainingAmount: 0,
        installmentsPaid: 5,
        totalInstallments: 5,
        monthlyAmount: 5000,
        nextPaymentDate: "Completed"
      }
    ]
  };

  const emergencyAmount = Math.floor(customerData.totalSavings * 0.02);

  const handleEmergencyRequest = () => {
    setWithdrawnEmergency(true);
    alert("Emergency fund request submitted! Funds will be available within 24 hours via M-Pesa.");
    setTimeout(() => setWithdrawnEmergency(false), 10000);
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
              <p className="text-muted-foreground">Customer Dashboard</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut size={16} />
            Logout
          </Button>
        </div>

        {/* Savings Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Savings Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Savings</p>
                <p className="text-2xl font-bold">KSh {customerData.totalSavings.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Available Emergency Fund</p>
                <p className="text-xl font-semibold text-green-600">KSh {emergencyAmount}</p>
              </div>
              <div>
                <Button 
                  onClick={handleEmergencyRequest}
                  disabled={withdrawnEmergency}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {withdrawnEmergency ? "Already Requested" : "Request Emergency Fund"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Installments */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Installment Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customerData.installments.map((installment) => (
                <div key={installment.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">{installment.item}</h3>
                      <p className="text-sm text-muted-foreground">
                        KSh {installment.monthlyAmount.toLocaleString()}/month
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">
                        {installment.installmentsPaid}/{installment.totalInstallments} payments
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Next: {installment.nextPaymentDate}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{Math.round((installment.paidAmount / installment.totalAmount) * 100)}%</span>
                    </div>
                    <Progress value={(installment.paidAmount / installment.totalAmount) * 100} />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Paid: KSh {installment.paidAmount.toLocaleString()}</span>
                      <span>Remaining: KSh {installment.remainingAmount.toLocaleString()}</span>
                    </div>
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

export default CustomerDashboard;
