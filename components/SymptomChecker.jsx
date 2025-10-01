'use client';

import SymptomChecker from '../../../components/SymptomChecker';

const specialtyMapping = {
  'Respiratory': ['Pulmonologist', 'ENT Specialist'],
  'Cardiovascular': ['Cardiologist'],
  'Digestive': ['Gastroenterologist'],
  'Neurological': ['Neurologist'],
  'Skin': ['Dermatologist'],
  'Joint/Muscle': ['Orthopedist', 'Rheumatologist'],
  'Mental Health': ['Psychiatrist', 'Psychologist'],
  'General': ['General Physician', 'Internal Medicine Specialist']
};

const doctorsList = {
  'Pulmonologist': [
    { name: 'Dr. Sarah Chen', experience: '15 years', rating: 4.8 },
    { name: 'Dr. Michael Roberts', experience: '12 years', rating: 4.9 }
  ],
  'Cardiologist': [
    { name: 'Dr. James Wilson', experience: '20 years', rating: 4.9 },
    { name: 'Dr. Emily Rodriguez', experience: '18 years', rating: 4.7 }
  ],
  'Gastroenterologist': [
    { name: 'Dr. David Kim', experience: '14 years', rating: 4.8 },
    { name: 'Dr. Lisa Patel', experience: '16 years', rating: 4.9 }
  ],
  'Neurologist': [
    { name: 'Dr. Robert Brown', experience: '22 years', rating: 4.9 },
    { name: 'Dr. Maria Garcia', experience: '17 years', rating: 4.8 }
  ],
  'Dermatologist': [
    { name: 'Dr. Jennifer Lee', experience: '13 years', rating: 4.7 },
    { name: 'Dr. Thomas Anderson', experience: '19 years', rating: 4.8 }
  ],
  'General Physician': [
    { name: 'Dr. William Taylor', experience: '10 years', rating: 4.6 },
    { name: 'Dr. Susan Martinez', experience: '15 years', rating: 4.7 }
  ]
};

export default function CheckerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-300 to-blue-500 flex items-center justify-center font-sans">
      <main className="w-full flex items-center justify-center">
        <section className="bg-white/90 shadow-2xl rounded-3xl px-6 py-8 max-w-lg w-full animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 text-center mb-2 tracking-tight drop-shadow">
            🩺 Symptom Checker
          </h1>
          <p className="text-center text-gray-700 mb-6 text-base md:text-lg">
            Get quick insights into possible conditions based on your symptoms.<br />
            <span className="block text-sm text-red-500 mt-1">
              (This tool does not replace professional medical advice.)
            </span>
          </p>
          <SymptomChecker />
        </section>
      </main>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 1s;
        }
      `}</style>
    </div>
  );
}

export default function SymptomChecker() {
  const getRecommendedDoctors = (conditions) => {
    const recommendedSpecialties = new Set();
    const recommendedDoctors = [];

    conditions.forEach(condition => {
      let specialty = 'General';
      if (condition.name.toLowerCase().includes('respiratory') || condition.name.toLowerCase().includes('breathing')) {
        specialty = 'Respiratory';
      } else if (condition.name.toLowerCase().includes('heart')) {
        specialty = 'Cardiovascular';
      }

      specialtyMapping[specialty]?.forEach(spec => {
        if (doctorsList[spec]) {
          recommendedSpecialties.add(spec);
          doctorsList[spec].forEach(doctor => {
            if (!recommendedDoctors.some(d => d.name === doctor.name)) {
              recommendedDoctors.push(doctor);
            }
          });
        }
      });
    });

    return recommendedDoctors;
  };

  return (
    <>
      {results && results.conditions && results.conditions.length > 0 ? (
        <div className="space-y-4">
          {results.conditions.map((condition, idx) => (
            <div
              key={idx}
              className="border-l-4 border-blue-400 bg-white rounded-xl shadow px-4 py-3 animate-fade-in"
            >
              {/* ... existing condition display code ... */}
            </div>
          ))}
          
          <div className="mt-6">
            <h3 className="text-xl font-bold text-blue-700 mb-4">Recommended Specialists</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getRecommendedDoctors(results.conditions).map((doctor, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-md p-4 border border-blue-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{doctor.name}</h4>
                      <p className="text-sm text-gray-600">Experience: {doctor.experience}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm text-gray-600 ml-1">{doctor.rating}/5.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-xl px-4 py-3 mt-4 text-xs text-yellow-800 shadow-sm font-semibold">
            {/* ... existing disclaimer ... */}
          </div>
        </div>
      ) : (
        <div>No matching conditions found</div>
      )}
    </>
  );
}