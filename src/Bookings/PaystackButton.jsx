
// ============= PAYSTACK INTEGRATION =============
export const PaystackButton = ({ email, amount, metadata, onSuccess, onClose, disabled }) => {
  const handlePayment = () => {
    if (!window.PaystackPop) {
      alert("Paystack is not loaded. Please refresh the page.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: 'pk_test_YOUR_PUBLIC_KEY', // Replace with your Paystack public key
      email: email,
      amount: amount * 100, // Convert to pesewas
      currency: 'GHS',
      metadata: metadata,
      callback: function(response) {
        onSuccess(response.reference);
      },
      onClose: function() {
        onClose && onClose();
      }
    });

    handler.openIframe();
  };

  return (
    <button
      type="button"
      onClick={handlePayment}
      disabled={disabled}
      className="w-full bg-amber-600 text-white py-4 rounded-lg font-bold hover:bg-amber-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      Pay with Paystack - GH₵{amount}
    </button>
  );
};
