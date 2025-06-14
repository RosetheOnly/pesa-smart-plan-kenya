
export const calculateServiceFee = (installmentAmount: number): number => {
  // Define fee tiers based on installment amount
  if (installmentAmount <= 1000) {
    return 1; // Very low value items
  } else if (installmentAmount <= 2000) {
    return 2;
  } else if (installmentAmount <= 3000) {
    return 3;
  } else if (installmentAmount <= 4000) {
    return 5;
  } else if (installmentAmount <= 6000) {
    return 7;
  } else if (installmentAmount <= 8000) {
    return 10;
  } else if (installmentAmount <= 10000) {
    return 12;
  } else {
    return 15; // High value items
  }
};

export const calculateTotalWithFee = (installmentAmount: number): number => {
  return installmentAmount + calculateServiceFee(installmentAmount);
};
