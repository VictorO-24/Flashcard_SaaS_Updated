export const getPaystackInstance = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  const PaystackPop = require('@paystack/inline-js').default;
  return PaystackPop;
};

export const initiatePayment = (email, amount, onSuccess, onCancel) => {
  const PaystackPop = getPaystackInstance();
  if (!PaystackPop) return;

  let paystack = PaystackPop.setup({
    key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    email: email,
    amount: amount,
    callback: function(transaction) {
      onSuccess(transaction);
    },
    onClose: function() {
      onCancel();
    },
  });

  paystack.openIframe();
};
