"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function SymptomChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const symptoms = [
    'Fever', 'Headache', 'Cough', 'Sore throat', 'Runny nose', 'Fatigue',
    'Body aches', 'Nausea', 'Vomiting', 'Diarrhea', 'Shortness of breath',
    'Chest pain', 'Dizziness', 'Skin rash', 'Joint pain', 'Loss of appetite',
    'Chills', 'Sweating', 'Abdominal pain', 'Back pain'
  ];

  const conditions = [
    {
      name: 'Common Cold',
      symptoms: ['Runny nose', 'Sore throat', 'Cough', 'Headache', 'Fatigue'],
      severity: 'Mild',
      color: 'border-green-400'
    },
    {
      name: 'Flu',
      symptoms: ['Fever', 'Body aches', 'Fatigue', 'Headache', 'Cough', 'Chills'],
      severity: 'Moderate',
      color: 'border-yellow-400'
    },
    {
      name: 'Food Poisoning',
      symptoms: ['Nausea', 'Vomiting', 'Diarrhea', 'Abdominal pain', 'Fever'],
      severity: 'Moderate',
      color: 'border-yellow-400'
    },
    {
      name: 'Migraine',
      symptoms: ['Headache', 'Nausea', 'Dizziness', 'Fatigue'],
      severity: 'Moderate',
      color: 'border-yellow-400'
    },
    {
      name: 'Possible Serious Condition',
      symptoms: ['Chest pain', 'Shortness of breath'],
      severity: 'Severe',
      color: 'border-red-400'
    }
  ];

  const {
    register,
    handleSubmit,
    reset: formReset,
    watch,
    setValue,
    getValues
  } = useForm({
    defaultValues: {
      age: '',
      symptomSearch: ''
    }
  });

  const symptomSearch = watch('symptomSearch');

  const filteredSymptoms = symptoms.filter(symptom =>
    symptom.toLowerCase().includes(symptomSearch.toLowerCase()) &&
    !selectedSymptoms.includes(symptom)
  );

  const addSymptom = (symptom) => {
    setSelectedSymptoms([...selectedSymptoms, symptom]);
    setValue('symptomSearch', '');
    setDropdown(false);
  };

  const removeSymptom = (symptom) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
  };

  const onSubmit = (data) => {
    if (selectedSymptoms.length === 0) return;
    setLoading(true);
    setTimeout(() => {
      const matchedConditions = conditions.map(condition => {
        const matches = condition.symptoms.filter(symptom =>
          selectedSymptoms.includes(symptom)
        ).length;
        const percentage = Math.round((matches / condition.symptoms.length) * 100);

        return {
          ...condition,
          matchCount: matches,
          percentage: percentage
        };
      }).filter(condition => condition.matchCount > 0)
        .sort((a, b) => b.percentage - a.percentage);

      setResults(matchedConditions);
      setShowResults(true);
      setLoading(false);
    }, 800);
  };

  const resetAll = () => {
    setSelectedSymptoms([]);
    setResults(null);
    setShowResults(false);
    formReset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-200 to-pink-200 flex items-center justify-center py-8 px-2 relative overflow-hidden">
      {/* Decorative blurred circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full opacity-30 blur-3xl -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-300 rounded-full opacity-30 blur-3xl -z-10 animate-pulse-slow"></div>
      <div className="w-full max-w-lg bg-white/90 rounded-3xl shadow-2xl px-8 py-10 animate-fade-in border border-blue-100 backdrop-blur-md">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-500 to-pink-500 text-center mb-2 tracking-tight drop-shadow-lg">
          🩺 Symptom Checker
        </h1>
        <p className="text-center text-gray-700 mb-7 text-lg">
          Get quick insights into possible conditions based on your symptoms.<br />
          <span className="block text-sm text-red-500 mt-1 font-semibold">
            (This tool does not replace professional medical advice.)
          </span>
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
          {!showResults ? (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">👤 Age (optional):</label>
                <input
                  type="number"
                  {...register('age')}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-gray-50"
                  placeholder="Enter your age"
                  min={0}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">🔍 Search and select symptoms:</label>
                <div className="relative">
                  <input
                    type="text"
                    {...register('symptomSearch')}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 transition bg-gray-50"
                    placeholder="Type to search symptoms..."
                    autoComplete="off"
                    onFocus={() => setDropdown(true)}
                    onBlur={() => setTimeout(() => setDropdown(false), 150)}
                  />
                  {dropdown && symptomSearch && (
                    <div className="absolute z-10 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg mt-1 max-h-44 overflow-y-auto animate-fade-in">
                      {filteredSymptoms.length > 0 ? (
                        filteredSymptoms.map((symptom, idx) => (
                          <div
                            key={idx}
                            className="px-4 py-2 cursor-pointer hover:bg-blue-50 transition font-medium"
                            onMouseDown={() => addSymptom(symptom)}
                          >
                            {symptom}
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-gray-400">No symptoms found</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {selectedSymptoms.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Selected Symptoms:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSymptoms.map((symptom, idx) => (
                      <span
                        key={idx}
                        className="bg-gradient-to-r from-blue-100 via-pink-100 to-indigo-100 text-blue-700 px-3 py-1 rounded-full flex items-center text-sm shadow border border-blue-200 font-semibold hover:scale-105 transition-transform"
                      >
                        <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
                        {symptom}
                        <button
                          type="button"
                          className="ml-2 text-blue-500 hover:text-red-500 transition"
                          onClick={() => removeSymptom(symptom)}
                          aria-label="Remove symptom"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className={`flex-1 py-2 rounded-xl text-white font-bold transition shadow-lg text-lg ${
                    selectedSymptoms.length === 0 || loading
                      ? 'bg-gradient-to-r from-blue-200 to-pink-200 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 hover:from-blue-600 hover:to-pink-600'
                  }`}
                  disabled={selectedSymptoms.length === 0 || loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Analyzing...
                    </span>
                  ) : 'Analyze Symptoms'}
                </button>
                {selectedSymptoms.length > 0 && (
                  <button
                    type="button"
                    className="flex-1 py-2 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition shadow-lg text-lg"
                    onClick={resetAll}
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className="mt-5 text-xs text-yellow-800 bg-yellow-100 rounded-xl px-4 py-3 border-l-4 border-yellow-400 shadow-sm font-semibold flex items-center gap-2">
                <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
                This tool is for informational purposes only and should not replace professional medical advice.
              </div>
            </>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-blue-700">Possible Conditions</h2>
                <button
                  type="button"
                  className="text-sm text-pink-600 hover:underline font-semibold"
                  onClick={resetAll}
                >
                  Start Over
                </button>
              </div>
              {results && results.length > 0 ? (
                <div className="space-y-4">
                  {results.map((condition, idx) => (
                    <div
                      key={idx}
                      className={`border-l-4 ${condition.color} bg-white rounded-xl shadow px-4 py-3 animate-fade-in`}
                    >
                      <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
                        {condition.name} <span className="text-xs text-gray-500">({condition.percentage}% match)</span>
                      </h3>
                      <p className="text-sm text-gray-600">Severity: <span className="font-medium">{condition.severity}</span></p>
                      <p className="text-xs text-gray-500">
                        Matched symptoms: {condition.matchCount} of {condition.symptoms.length}
                      </p>
                    </div>
                  ))}
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-xl px-4 py-3 mt-4 text-xs text-yellow-800 shadow-sm font-semibold">
                    <strong>⚠️ Important Disclaimer:</strong>
                    <ul className="list-disc ml-5 mt-1 space-y-1">
                      <li>This is not a medical diagnosis.</li>
                      <li>Always consult a healthcare professional for proper evaluation.</li>
                      <li>Seek immediate medical attention for severe or emergency symptoms.</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 border-l-4 border-red-400 rounded-xl px-4 py-3 text-sm text-red-700 shadow font-semibold">
                  <p>No matching conditions found for your selected symptoms.</p>
                  <p>Please consult a healthcare professional for proper evaluation.</p>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 0.7s;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s infinite;
        }
      `}</style>
    </div>
  );
}