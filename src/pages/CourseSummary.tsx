import { useState } from 'react';
import BasePage from '../components/BasePage';
import { ChevronDown, ChevronUp, CheckCircle2, Calendar, Target, BookOpen } from 'lucide-react';
import { cn } from '../lib/utils';

export default function CourseSummary() {
  const [activeTab, setActiveTab] = useState<'objective' | 'outcome' | 'outline'>('objective');

  const tabs = [
    { id: 'objective', label: 'Course Objective', icon: Target },
    { id: 'outcome', label: 'Course Outcome', icon: CheckCircle2 },
    { id: 'outline', label: 'Course Outline (W1-W8)', icon: Calendar },
  ];

  const outcomes = [
    { code: 'CLO 1', text: 'Create relevant complex research data to generate evidence-based insights and propose solutions for information technology problems through a comprehensive data analytics report (C6, PLO2)' },
    { code: 'CLO 2', text: 'Demonstrate a sustained commitment to collaborative engagement by appropriately applying advanced quantitative methods to address and solve complex research problems within given scenarios (A5, PLO4)' },
    { code: 'CLO 3', text: 'Generate innovative solutions to complex and critical research problems through the advanced application of data analytics software, demonstrating doctoral-level analytical and problem-solving competence (C6, PLO6)' },
    { code: 'CLO 4', text: 'Critically evaluate the validity, accuracy, and consistency of findings derived from quantitative data analysis in a research project, demonstrating advanced interpretation and scholarly judgement at doctoral level (C6, PLO7)' },
    { code: 'CLO 5', text: 'Demonstrate advanced integration of social responsibility principles in research activities, ensuring outcomes that generate meaningful and positive impact on the wider community (A5, PLO8)' },
  ];

  const weeks = [
    { week: 1, topic: 'Data Mining Techniques and Structural Equation Modeling', items: ['Steps of data mining', 'Techniques used in data mining', 'Structural Equation Modelling (SEM)', 'Technique of Structural Equation Modelling', 'SEM for analysis', 'Where to use SEM', 'Linear programming formulation', 'Linear for analysis'] },
    { week: 2, topic: 'Descriptive Statistics: Numerical Methods', items: ['Descriptive Statistics: Numerical Methods', 'Types of Descriptive Statistics', 'Measures of Dispersion', 'Range & 1.8 Variance', 'Probability'] },
    { week: 3, topic: 'Probability & Probability Distribution', items: ['Basic Probability Concepts', 'Events and Types', 'Rolling a fair six-sided die.', 'Visualizing Probability', 'Mutually Exclusive Events', 'Marginal Probability', 'Computing Conditional Probabilities'] },
    { week: 4, topic: 'Correlation and Regression', items: ['Key difference of Correlation and Regression', 'Applications in IT & Engineering', 'Types of Correlation', 'Representation of Correlation', 'Formula for Correlation Coefficient', 'Measuring Correlation'] },
    { week: 5, topic: 'Sampling Design & Estimation Theory', items: ['Population, Sample & Frame', 'Sampling Frame & Units', 'Probability Sampling', 'Simple Random Sampling', 'Systematic Sampling', 'Stratified Sampling', 'Cluster Sampling', 'Non-Probability Sampling', 'Potential Bias & Errors', 'Statistical Software & Tools'] },
    { week: 6, topic: 'Hypothesis Testing & Linear Models', items: ['Null and Alternative Hypotheses', 'Examples of Hypotheses', 'Types of Tests', 'Statistical Test', 'Z- Test for Means', 'P-Values and Significance', 'Hypothesis Testing Steps', 'Case Study: Testing a New Teaching Method’s Effectiveness', 'Types of Measurement Models', 'Classical Test Theory (CTT)', 'Why Multiple Predictors?', 'MLR Model & Coefficients', 'Assumptions of MLR', 'Matrix Formulation'] },
    { week: 7, topic: 'Structural Equation Modelling (Deep Dive)', items: ['Key components and concepts of SEM', 'Covariance Structure', 'Estimation Methods', 'Fit Indices', 'Software for SEM', 'Advantages', 'Limitation', 'Employment of SEM'] },
    { week: 8, topic: 'Consultation (Synchronous)', items: [] },
  ];

  return (
    <BasePage 
      title="Course Summary" 
      subtitle="Foundational Intelligence" 
      description="Examine the core architecture of the TRS6023 module, including learning goals, doctoral-level outcomes, and the rigorous 14-week curriculum schedule."
    >
      <div className="flex flex-col border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] bg-white">
        {/* Tab Headers */}
        <div className="flex border-b-4 border-black">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex-1 flex items-center justify-center gap-3 py-6 px-4 font-black uppercase text-xs tracking-[0.2em] transition-all",
                activeTab === tab.id 
                  ? "bg-black text-white" 
                  : "bg-white text-black hover:bg-primary/5"
              )}
            >
              <tab.icon className="w-5 h-5" />
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-12 min-h-[600px]">
          {activeTab === 'objective' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex items-start gap-8">
                <div className="w-24 h-24 bg-primary text-white flex items-center justify-center shrink-0 border-4 border-black">
                  <BookOpen className="w-12 h-12" />
                </div>
                <div className="space-y-6">
                  <h3 className="text-3xl font-black uppercase tracking-tighter">Course Objective</h3>
                  <div className="h-1 w-20 bg-primary"></div>
                </div>
              </div>
              <p className="text-lg font-medium leading-relaxed text-secondary border-l-8 border-black pl-8 italic">
                This course introduces quantitative methods including statistical analysis, regression analysis, and 
                structural equation modeling. It equips students with the skills to design, execute, and critically 
                evaluate research projects using quantitative methods. The course covers in-depth topics such as 
                statistical analysis, coding and thematic analysis, and the integration of mixed methods, alongside 
                practical training in the use of relevant software tools like SPSS, R etc. Emphasizing ethical 
                considerations, data interpretation, and the presentation of research findings, this course prepares 
                students for high-level research and analysis in their respective fields, fostering the understanding 
                of diverse research paradigms and their applications. Teaching and learning are conducted through 
                a variety of approaches such as lectures, problem-based learning, article/case study discussion, 
                group discussion, feedback question, group presentation, problem-based learning using statistical 
                software and student directed learning to enhance critical thinking and research skills. Assessment 
                is conducted through assignments and final research project.
              </p>
            </div>
          )}

          {activeTab === 'outcome' && (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-12">Competency Benchmarks</h3>
              <div className="grid gap-6">
                {outcomes.map((outcome, idx) => (
                  <div key={idx} className="flex gap-8 group">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-white border-4 border-black flex items-center justify-center font-black transition-colors group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                        {idx + 1}
                      </div>
                      <div className="w-1 flex-1 bg-black/10 mt-2"></div>
                    </div>
                    <div className="pb-8">
                      <span className="text-[10px] font-black text-primary tracking-widest uppercase mb-2 block">{outcome.code}</span>
                      <p className="text-sm font-bold leading-relaxed uppercase tracking-wide opacity-80 group-hover:opacity-100 transition-opacity">
                        {outcome.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'outline' && (
            <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
              <div className="flex justify-between items-end border-b-4 border-black pb-4">
                <h3 className="text-3xl font-black uppercase tracking-tighter">Academic Roadmap</h3>
                <span className="text-[10px] font-black text-secondary tracking-widest uppercase">Weeks 01 — 08</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 mt-8">
                {weeks.map((week) => (
                  <div key={week.week} className="border-l-4 border-primary pl-6 py-2 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-black text-primary">WEEK {week.week.toString().padStart(2, '0')}</span>
                    </div>
                    <h4 className="text-sm font-black uppercase tracking-tight mb-4">{week.topic}</h4>
                    <ul className="grid grid-cols-1 gap-1">
                      {week.items.slice(0, 4).map((item, i) => (
                        <li key={i} className="text-[10px] uppercase font-bold text-secondary flex items-center gap-2">
                          <span className="w-1 h-1 bg-black"></span>
                          {item}
                        </li>
                      ))}
                      {week.items.length > 4 && (
                        <li className="text-[10px] uppercase font-black text-primary mt-1">+ {week.items.length - 4} more concepts</li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </BasePage>
  );
}
