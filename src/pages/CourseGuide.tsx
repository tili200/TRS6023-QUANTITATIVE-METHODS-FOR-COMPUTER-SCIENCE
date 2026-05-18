import { useState } from 'react';
import BasePage from '../components/BasePage';
import { Upload, FileText, CheckCircle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../lib/utils';

const topics = [
  { 
    id: 1, 
    title: 'Data Mining & SEM', 
    questions: [
      'What is the purpose of data mining and how does it differ from traditional data analysis?',
      'Which technique would you use to find groups of similar observations in a dataset? Explain your answer.',
      'How does classification differ from clustering in data mining tasks? Provide an example.',
      'What is an association rule, and give a real-world scenario where association rule mining is useful?',
      'Which data preprocessing step is most critical before performing any data mining technique, and why?',
      'What are the main differences between supervised and unsupervised learning in the context of data mining?'
    ] 
  },
  { 
    id: 2, 
    title: 'Descriptive Statistics', 
    scenario: 'A study aims to estimate the proportion of students who practice proper waste segregation. The researcher wants a 95% confidence level with a margin of error of 5%, assuming no prior estimate.',
    questions: [
      'Using the appropriate formula, calculate the required sample size.',
      'Explain the meaning of each component in the sample size formula.',
      'Construct a confidence interval and explain its interpretation in the context of this study.',
      'Discuss how increasing the sample size would affect the accuracy and reliability of the results.'
    ] 
  },
  { 
    id: 3, 
    title: 'Probability Distribution', 
    scenario: 'Monthly research productivity scores: 12, 15, 17, 20, 18, 14, 16, 22, 19, 30',
    questions: [
      'Calculate the mean, median, and mode.',
      'Identify whether an outlier exists and explain how it affects the mean.',
      'Discuss which measure of central tendency best represents this dataset and justify your answer.'
    ] 
  },
  {
    id: 4,
    title: 'Correlation & Regression',
    scenario: 'Time (hours) spent on data analysis: 4, 6, 5, 8, 7, 9, 6, 5, 7, 20',
    questions: [
      'Calculate the range of the dataset.',
      'Explain how the large value in the dataset influences dispersion.',
      'Discuss why standard deviation is important when interpreting research data variability.'
    ]
  },
  {
    id: 5,
    title: 'Sampling Design & Estimation',
    scenario: 'A researcher distributes an online survey regarding digital security behaviour to 120 students in one faculty.',
    questions: [
      'Identify and explain the sampling method used in this study.',
      'Discuss TWO (2) potential biases that may arise from this sampling design.',
      'Evaluate whether the findings can be generalized to all students.',
      'Propose an improved sampling design that enhances research validity.'
    ]
  },
  {
      id: 9,
      title: 'Structural Equation Modelling',
      questions: [
          'What type of research question is best addressed using SEM and why?',
          'Describe the difference between observed variables and latent variables in SEM.',
          'What are the main model fit indices used in SEM and what do they indicate?',
          'Why is it necessary to test for the validity and reliability of measurement models before interpreting structural paths?',
          'Explain with an example how SEM analyzes direct and indirect effects.'
      ]
  }
];

export default function CourseGuide() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(1);
  const [uploadedFiles, setUploadedFiles] = useState<Record<number, string>>({});

  const handleUpload = (topicId: number) => {
    // Simulate upload
    setUploadedFiles(prev => ({ ...prev, [topicId]: 'Submission_Draft.pdf' }));
  };

  return (
    <BasePage 
      title="Course Guide" 
      subtitle="Executive Exercises" 
      description="Access weekly doctoral-level exercises. Students are expected to upload comprehensive theoretical and practical responses in PDF/Word format for faculty review."
    >
      <div className="space-y-6">
        {topics.map((topic) => (
          <div key={topic.id} className="border-4 border-black bg-white overflow-hidden shadow-[6px_6px_0px_rgba(0,0,0,1)]">
            <button 
              onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
              className="w-full flex items-center justify-between p-8 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-black">
                  {topic.id.toString().padStart(2, '0')}
                </div>
                <div>
                  <span className="text-[10px] font-black text-primary tracking-[0.2em] uppercase">Topic Module</span>
                  <h3 className="text-xl font-black uppercase tracking-tighter">{topic.title}</h3>
                </div>
              </div>
              {expandedTopic === topic.id ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
            </button>

            {expandedTopic === topic.id && (
              <div className="p-10 border-t-4 border-black bg-gray-50 animate-in slide-in-from-top duration-300">
                {topic.scenario && (
                  <div className="mb-8 p-6 bg-white border-2 border-black border-dashed">
                    <span className="text-[10px] font-black text-primary uppercase mb-2 block tracking-widest">Case Scenario / Dataset</span>
                    <p className="text-sm font-bold text-secondary italic leading-relaxed">{topic.scenario}</p>
                  </div>
                )}
                
                <div className="space-y-6 mb-10">
                  <h4 className="text-xs font-black uppercase tracking-widest text-black border-b border-black pb-2">Required Inquiry</h4>
                  <ul className="space-y-4">
                    {topic.questions.map((q, idx) => (
                      <li key={idx} className="flex gap-4">
                        <span className="text-primary font-black">{idx + 1}.</span>
                        <p className="text-sm font-bold leading-relaxed">{q}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-black text-white">
                  <div className="flex items-center gap-4">
                    {uploadedFiles[topic.id] ? (
                      <CheckCircle className="text-green-400 w-8 h-8" />
                    ) : (
                      <AlertCircle className="text-primary w-8 h-8" />
                    )}
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest">
                        {uploadedFiles[topic.id] ? 'Draft Submitted' : 'Awaiting Submission'}
                      </p>
                      <p className="text-[10px] opacity-60">
                        {uploadedFiles[topic.id] ? uploadedFiles[topic.id] : 'Format: PDF, DOCX (Max 25MB)'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 w-full md:w-auto">
                    <button 
                      onClick={() => handleUpload(topic.id)}
                      className="flex-1 md:flex-none btn-primary !bg-white !text-black hover:!bg-primary hover:!text-white flex items-center justify-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Upload Response
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </BasePage>
  );
}
