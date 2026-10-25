window.StockPilotUtils = {
  formatCurrency(value, currency = 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0
    }).format(Number(value) || 0);
  },
  today() {
    return new Date().toISOString().slice(0, 10);
  },
  formatDate(value, format = 'DD MMM YYYY') {
    if (!value) return '—';
    const date = new Date(`${value}T12:00:00`);
    if (format === 'YYYY-MM-DD') return value;
    if (format === 'DD/MM/YYYY') {
      return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    }
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  },
  escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[character]);
  }
};
