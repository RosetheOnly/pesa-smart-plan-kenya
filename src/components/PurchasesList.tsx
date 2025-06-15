
import React from "react";

interface Purchase {
  id: string;
  productName: string;
  businessName: string;
  amount: number;
  paymentsCompleted: number;
  totalPayments: number;
  status: 'active' | 'completed';
}

interface Props {
  purchases: Purchase[];
}

const PurchasesList: React.FC<Props> = ({ purchases }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-xl font-bold mb-4">Recent Purchases</h3>
      <div className="space-y-3">
        {purchases.map((purchase) => (
          <div key={purchase.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <div>
              <p className="font-medium">{purchase.productName}</p>
              <p className="text-sm text-gray-600">{purchase.businessName}</p>
            </div>
            <div className="text-right">
              <p className="font-bold">KSh {purchase.amount.toLocaleString()}</p>
              <p className={`text-sm ${purchase.status === 'completed' ? 'text-blue-600' : 'text-green-600'}`}>
                {purchase.status === 'completed' 
                  ? 'Paid in full' 
                  : `${purchase.paymentsCompleted}/${purchase.totalPayments} payments made`
                }
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchasesList;
