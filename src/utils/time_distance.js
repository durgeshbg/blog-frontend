export default function distance(d1, d2 = new Date(), plural = '') {
  const y_gap = d2.getFullYear() - d1.getFullYear();
  const m_gap = d2.getMonth() - d1.getMonth();
  const d_gap = d2.getDate() - d1.getDate();
  const hh_gap = d2.getHours() - d1.getHours();
  const mm_gap = d2.getMinutes() - d1.getMinutes();
  const ss_gap = d2.getSeconds() - d1.getSeconds();
  if (y_gap > 0) {
    plural = y_gap == 1 ? '' : 's';
    return `${y_gap} year${plural} ago`;
  } else if (m_gap > 0) {
    plural = m_gap == 1 ? '' : 's';
    return `${m_gap} month${plural} ago`;
  } else if (d_gap > 0) {
    plural = d_gap == 1 ? '' : 's';
    return `${d_gap} day${plural} ago`;
  } else if (hh_gap > 0) {
    plural = hh_gap == 1 ? '' : 's';
    return `${hh_gap} hour${plural} ago`;
  } else if (mm_gap > 0) {
    plural = mm_gap == 1 ? '' : 's';
    return `${mm_gap} minute${plural} ago`;
  } else if (ss_gap > 0) {
    plural = ss_gap == 1 ? '' : 's';
    return `${ss_gap} second${plural} ago`;
  }
}
