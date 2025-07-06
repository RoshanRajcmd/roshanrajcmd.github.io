import React, { useEffect, useState } from 'react';
import { getMetrics, subscribe } from '../metricsStore';

const thresholds = {
    TTFB: 200,
    FCP: 1000,
    LCP: 2500,
    FID: 100,
};

const getStatus = (name, value) => {
    if (!thresholds[name]) return 'Unknown';
    return value <= thresholds[name] ? 'Good' : 'Needs Improvement';
};

const getColor = (status) => {
    return status === 'Good' ? 'text-green-600' : 'text-yellow-600';
};

const Metrics = () => {
    const [metrics, setMetrics] = useState(getMetrics());

    useEffect(() => {
        const unsubscribe = subscribe((updated) => {
            setMetrics([...updated]);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">📊 Web Vitals Dashboard</h2>
                {metrics.length === 0 ? (
                    <p className="text-gray-500">No metrics available yet...</p>
                ) : (
                    <table className="w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-left text-sm text-gray-600">
                                <th className="p-3">Metric</th>
                                <th className="p-3">Value (ms)</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {metrics.map((metric, index) => {
                                const status = getStatus(metric.name, metric.value);
                                return (
                                    <tr key={index} className="border-b text-sm">
                                        <td className="p-3 font-medium">{metric.name}</td>
                                        <td className="p-3">{metric.value.toFixed(2)}</td>
                                        <td className={`p-3 font-semibold ${getColor(status)}`}>{status}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Metrics;
