/**
 * Memformat string ISO tanggal/waktu menjadi format lokal yang mudah dibaca.
 * @param {string} dateString - Contoh: "2026-08-30T12:00:00Z"[cite: 1]
 * @returns {string} - Contoh: "30 Ags 2026, 12.00"
 */
export const formatDateTime = (dateString) => {
  if (!dateString) return '-';
  
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  try {
    return new Date(dateString).toLocaleDateString('id-ID', options);
  } catch (error) {
    console.error('Format tanggal gagal:', error);
    return dateString;
  }
};