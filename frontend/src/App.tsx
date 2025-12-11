import { useState } from 'react';
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';
import CaseForm from './components/CaseForm';
import AnalysisView from './components/AnalysisView';
import { AnalysisRequest, AnalysisResult, analyzeCase } from './lib/api';

export default function App() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (payload: AnalysisRequest) => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeCase(payload);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      setError('Analysis request failed. Check the backend service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout
      sidebar={
        <Sidebar>
          <CaseForm onSubmit={handleSubmit} loading={loading} />
        </Sidebar>
      }
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-gray-500">Intel Dashboard</p>
          <h2 className="text-2xl font-semibold text-white">Analysis Output</h2>
        </div>
        {analysis && (
          <div className="text-right">
            <p className="text-xs text-gray-500">Case</p>
            <p className="text-sm text-gray-200 font-medium">{analysis.case_title}</p>
          </div>
        )}
      </div>
      <AnalysisView analysis={analysis} loading={loading} error={error} />
    </Layout>
  );
}
