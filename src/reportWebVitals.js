import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
import { saveMetric } from './metricsStore';

const reportWebVitals = () => {
  const collect = (metric) => {
    saveMetric(metric);
  };

  getCLS(collect);
  getFID(collect);
  getFCP(collect);
  getLCP(collect);
  getTTFB(collect);
};

export default reportWebVitals;
