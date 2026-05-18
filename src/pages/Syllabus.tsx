import { useState } from 'react';
import { motion } from 'motion/react';
import BasePage from '../components/BasePage';
import { Download, Play, FileText, CheckSquare, ChevronRight, Zap, Trophy, HelpCircle, Edit, Trash2, Upload, PlusCircle, CheckCircle2, BookOpen, LayoutList, Hash } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAppContext } from '../context/AppContext';

const syllabusData = [
  { 
    id: 1, 
    title: 'Data Mining Techniques and Structural Equation Modeling', 
    videos: 3, 
    slides: 'Topic_01_Main.pdf',
    topics: ['Steps of data mining', 'Techniques used in data mining', 'Structural Equation Modelling (SEM)', 'Technique of Structural Equation Modelling', 'SEM for analysis', 'Where to use SEM', 'Linear programming formulation', 'Linear for analysis']
  },
  { 
    id: 2, 
    title: 'Descriptive Statistics: Numerical Methods', 
    videos: 2, 
    slides: 'Topic_02_Stats.pdf',
    topics: ['Descriptive Statistics: Numerical Methods', 'Types of Descriptive Statistics', 'Measures of Dispersion', 'Range & 1.8 Variance', 'Probability']
  },
  { 
    id: 3, 
    title: 'Probability & Probability Distribution', 
    videos: 4, 
    slides: 'Topic_03_Prob.pdf',
    topics: ['Basic Probability Concepts', 'Events and Types', 'Rolling a fair six-sided die.', 'Visualizing Probability', 'Mutually Exclusive Events', 'Marginal Probability', 'Computing Conditional Probabilities']
  },
  { 
    id: 4, 
    title: 'Correlation and Regression', 
    videos: 3, 
    slides: 'Topic_04_Reg.pdf',
    topics: ['Key difference of Correlation and Regression', 'Applications in IT & Engineering', 'Types of Correlation', 'Representation of Correlation', 'Formula for Correlation Coefficient', 'Measuring Correlation']
  },
  { 
    id: 5, 
    title: 'Sampling Design & Estimation Theory', 
    videos: 2, 
    slides: 'Topic_05_Samp.pdf',
    topics: ['Population, Sample & Frame', 'Sampling Frame & Units', 'Probability Sampling', 'Simple Random Sampling', 'Systematic Sampling', 'Stratified Sampling', 'Cluster Sampling', 'Non-Probability Sampling', 'Potential Bias & Errors', 'Statistical Software & Tools']
  },
  { 
    id: 6, 
    title: 'Hypothesis Testing & Linear Models', 
    videos: 3, 
    slides: 'Topic_06_Est.pdf',
    topics: ['Null and Alternative Hypotheses', 'Examples of Hypotheses', 'Types of Tests', 'Statistical Test', 'Z- Test for Means', 'P-Values and Significance', 'Hypothesis Testing Steps', 'Case Study: Testing a New Teaching Method’s Effectiveness', 'Types of Measurement Models', 'Classical Test Theory (CTT)', 'Why Multiple Predictors?', 'MLR Model & Coefficients', 'Assumptions of MLR', 'Matrix Formulation']
  },
  { 
    id: 7, 
    title: 'Structural Equation Modelling (Deep Dive)', 
    videos: 5, 
    slides: 'Topic_07_SEM.pdf',
    topics: ['Key components and concepts of SEM', 'Covariance Structure', 'Estimation Methods', 'Fit Indices', 'Software for SEM', 'Advantages', 'Limitation', 'Employment of SEM']
  },
  { 
    id: 8, 
    title: 'Consultation (Synchronous Session)', 
    videos: 1, 
    slides: 'Topic_08_Consult.pdf',
    topics: ['Weekly Research Sync', 'Q&A Session', 'Module Review', 'Project Guidance']
  },
];

const quizQuestions = [
  {
    id: 1,
    topic: 'Descriptive Statistics (Measures of Central Tendency)',
    scenario: 'A system administrator tracks network latency values: 45ms, 50ms, 52ms, 55ms, and 190ms.',
    question: 'Which measure of central tendency should be used to describe the "typical" network speed without being distorted by the outlier?',
    options: [
      { label: 'A', text: 'Mean' },
      { label: 'B', text: 'Median' },
      { label: 'C', text: 'Mode' },
      { label: 'D', text: 'Range' }
    ],
    correct: 'B',
    rationale: 'The Median is the middle value when data points are arranged in ascending order. In this dataset, the median is 52ms. It is considered a robust statistic because extreme values or outliers (like the 190ms spike caused by a temporary network hitch) do not change its value. Why others are incorrect: (A) Mean: Calculated average is 78.4ms; a single outlier misrepresents the baseline. (C) Mode: Every value occurs once, making it multimodual or unhelpful. (D) Range: This is a measure of dispersion (145ms), not central tendency.'
  },
  {
    id: 2,
    topic: 'Descriptive Statistics (Measures of Dispersion)',
    scenario: 'If two datasets representing student exam scores have the exact same mean, but Dataset A has a standard deviation of 2.5 and Dataset B has a standard deviation of 8.0.',
    question: 'What can be inferred about the data?',
    options: [
      { label: 'A', text: "Dataset A has a wider range of scores" },
      { label: 'B', text: "Dataset B's scores are clustered closer to the average" },
      { label: 'C', text: "Dataset A's scores are more consistently clustered around the average" },
      { label: 'D', text: "Dataset B has fewer outliers" }
    ],
    correct: 'C',
    rationale: 'Standard deviation measures the average distance of data points from the mean. A low standard deviation (Dataset A = 2.5) means most students scored very close to the class average, demonstrating high stability and consistency. Why others are incorrect: (A) Lower SD implies a narrower spread. (B) Dataset B larger SD means scores are scattered further out. (D) Higher variance suggests a higher probability of outliers.'
  },
  {
    id: 3,
    topic: 'Probability Scales',
    scenario: 'An algorithm calculates the probability of a system failure event E under specific edge-case scenarios.',
    question: 'Which of the following values represents a mathematically impossible probability statement?',
    options: [
      { label: 'A', text: 'P(E) = 0' },
      { label: 'B', text: 'P(E) = 1.0' },
      { label: 'C', text: 'P(E) = -0.15' },
      { label: 'D', text: 'P(E) = 1/2' }
    ],
    correct: 'C',
    rationale: 'According to Kolmogorov\'s First Axiom, probability must be a non-negative real number between 0 and 1. A negative probability violates fundamental mathematical laws. Why others are incorrect: (A) P(E)=0 represents an impossible event. (B) P(E)=1.0 denotes absolute certainty. (D) P(E)=1/2 represents a 50% chance, which is valid.'
  },
  {
    id: 4,
    topic: 'Conditional Probability Basics',
    scenario: 'Given that events A and B are completely independent, if P(A) = 0.40 and P(B) = 0.50.',
    question: 'What is the conditional probability P(A|B)?',
    options: [
      { label: 'A', text: '0.20' },
      { label: 'B', text: '0.40' },
      { label: 'C', text: '0.50' },
      { label: 'D', text: '0.90' }
    ],
    correct: 'B',
    rationale: 'If events are independent, the occurrence of one provides zero information about the likelihood of the other. Thus, P(A|B) simplified to baseline P(A) = 0.40. Why others are incorrect: (A) 0.20 is the joint probability P(A and B). (C) 0.50 is the standalone P(B). (D) 0.90 is P(A) + P(B), relevant for mutually exclusive scenarios.'
  },
  {
    id: 5,
    topic: 'Discrete Distributions (Poisson)',
    scenario: 'A DevOps team wants to model the number of severe database errors occurring within a standard 1-hour interval window.',
    question: 'Which probability distribution is best suited for this setting?',
    options: [
      { label: 'A', text: 'Normal Distribution' },
      { label: 'B', text: 'Binomial Distribution' },
      { label: 'C', text: 'Poisson Distribution' },
      { label: 'D', text: 'Uniform Distribution' }
    ],
    correct: 'C',
    rationale: 'Poisson distribution is for the probability of a number of events in a fixed interval. Why others are incorrect: (A) Normal: Continuous variables. (B) Binomial: Needs fixed trials (n) and binary outcome. (D) Uniform: Every outcome equally likely; errors cluster around an average.'
  },
  {
    id: 6,
    topic: 'Continuous Distributions (Normal Curves)',
    scenario: 'In a perfectly symmetrical normal probability distribution curve representing software compilation times.',
    question: 'What is the exact spatial relationship between the mean, median, and mode?',
    options: [
      { label: 'A', text: 'Mean > Median > Mode' },
      { label: 'B', text: 'Mode > Median > Mean' },
      { label: 'C', text: 'They are all exactly equal and located at the center' },
      { label: 'D', text: 'Mode and Mean are equal, but Median is smaller' }
    ],
    correct: 'C',
    rationale: 'Normal distribution exhibits perfect bilateral symmetry; mean, median, and mode all align at the peak central point. Why others are incorrect: (A) Positive skew. (B) Negative skew. (D) Impossible; median sits between mode and mean in asymmetry.'
  },
  {
    id: 7,
    topic: 'Sampling Design Foundations',
    scenario: 'A researcher needs to select a sample from a total population.',
    question: 'Which term describes the actual practical list or mechanism from which individual sample units are drawn?',
    options: [
      { label: 'A', text: 'Target Population' },
      { label: 'B', text: 'Sampling Frame' },
      { label: 'C', text: 'Sampling Unit' },
      { label: 'D', text: 'Strata' }
    ],
    correct: 'B',
    rationale: 'Sampling Frame is the physical registry list or tool (like an active SQL log) used to pull a sample. Why others are incorrect: (A) Target Population: Broad theoretical group. (C) Sample Size: Count (n). (D) Strata: Subgroups sharing common attributes.'
  },
  {
    id: 8,
    topic: 'Probability Sampling (Stratified)',
    scenario: 'An engineer wants to study system performance across 3 distinct server regions. They divide the population into regions and sample proportionally from each.',
    question: 'What method is this?',
    options: [
      { label: 'A', text: 'Convenience Sampling' },
      { label: 'B', text: 'Simple Random Sampling' },
      { label: 'C', text: 'Stratified Random Sampling' },
      { label: 'D', text: 'Cluster Sampling' }
    ],
    correct: 'C',
    rationale: 'Stratified sampling divides population into homogeneous subgroups (strata) and draws random samples independently from each. Why others are incorrect: (A) Convenience: Non-probability access. (B) SRS: Random pool draw without grouping. (D) Cluster: Selects entire heterogeneous groups.'
  },
  {
    id: 9,
    topic: 'Sampling Bias & Methodology Priorities',
    scenario: "A survey regarding campus environmental awareness is deployed solely via a social media link posted on an environmental club's homepage.",
    question: 'What is the fundamental risk associated with this study?',
    options: [
      { label: 'A', text: 'Over-complex p-value math' },
      { label: 'B', text: 'Selection/Convenience bias rendering findings un-generalizable' },
      { label: 'C', text: 'Insufficient measurement instruments' },
      { label: 'D', text: 'Excessive standard deviation' }
    ],
    correct: 'B',
    rationale: 'Sampling bias occurs when finding cannot generalize to the larger population (e.g., environmental club link). Why others are incorrect: (A) The issue is structural data collection. (C) Measurement error concerns faulty tools. (D) Bias doesn\'t automatically expand standard deviation.'
  },
  {
    id: 10,
    topic: 'Linear Regression (Slope Interpretation)',
    scenario: 'In a simple linear regression model predicting system response time (Y) based on concurrent users (X): Y = 0.5673X + 80.',
    question: 'What does the slope coefficient 0.5673 indicate?',
    options: [
      { label: 'A', text: 'When X=0, Y=0.5673' },
      { label: 'B', text: 'For every 1 additional user, response time is predicted to increase by 0.5673 ms' },
      { label: 'C', text: 'The model has an error rate of 56.73%' },
      { label: 'D', text: 'There is a negative relationship' }
    ],
    correct: 'B',
    rationale: 'The slope (m) is the rate of change; each new user adds an estimated 0.5673ms. Why others are incorrect: (A) 0.5673 is not the intercept (80ms). (C) Coefficients are not error percentages. (D) Positive value indicates a direct/positive relationship.'
  },
  {
    id: 11,
    topic: 'Multiple Linear Regression (Assumptions)',
    scenario: 'A researcher detects that two independent predictor variables are heavily correlated (r > 0.90).',
    question: 'Which core assumption is violated?',
    options: [
      { label: 'A', text: 'Homoscedasticity' },
      { label: 'B', text: 'Linearity' },
      { label: 'C', text: 'No Multicollinearity' },
      { label: 'D', text: 'Normality of Residuals' }
    ],
    correct: 'C',
    rationale: 'Multicollinearity occurs when predictors are highly correlated, making it difficult to isolate individual effects. Why others are incorrect: (A) Homoscedasticity: Constant error variance. (B) Linearity: Straight-line pattern. (D) Normality of Residuals: Normally distributed errors.'
  },
  {
    id: 12,
    topic: 'Hypothesis Testing Foundations',
    scenario: 'A data scientist claims that a new patch significantly changes average processing time (historically 75 seconds).',
    question: 'What is the correct structural formulation for the alternative hypothesis (H1)?',
    options: [
      { label: 'A', text: 'H1: μ = 75' },
      { label: 'B', text: 'H1: μ ≠ 75' },
      { label: 'C', text: 'H1: μ ≤ 75' },
      { label: 'D', text: 'H1: σ = 75' }
    ],
    correct: 'B',
    rationale: 'H1 reflects change; "not equal to" signifies a non-directional (two-tailed) test. Why others are incorrect: (A) Equality represents the Null Hypothesis (H0). (C) One-tailed directional claim. (D) Uses sigma (SD) instead of mu (mean).'
  },
  {
    id: 13,
    topic: 'Structural Equation Modeling (Concepts)',
    scenario: 'Within SEM frameworks, which component accounts for unobservable theoretical constructs using multiple direct indicators?',
    options: [
      { label: 'A', text: 'Covariance Matrix Solvers' },
      { label: 'B', text: 'Latent Variables' },
      { label: 'C', text: 'Observed Constants' },
      { label: 'D', text: 'Error Vectors' }
    ],
    question: 'What are these components called?',
    correct: 'B',
    rationale: 'Latent Variables represent abstract concepts (e.g., trust) captured indirectly through multiple measurable signs. Why others are incorrect: (A) Solvers are calculation algorithms. (C) Observed variables are directly measurable. (D) Error Vectors represent measurement error.'
  }
];

const tasksData = [
  { id: 1, title: 'Assignment 1: Applying Quantitative Methods to Research Topics', deadline: ' - ', file: 'Assignment_01_TRS6023.pdf' },
  { id: 2, title: 'Assignment 2: Apply quantitative analysis techniques to real data relevant to your field of study', deadline: ' - ', file: 'Assignment_02_TRS6023.pdf' },
  { id: 3, title: 'Final Project: Design and evaluate appropriate research techniques to assess empirical concerns and problems.', deadline: ' - ', file: 'Final_Project_Brief.pdf' },
];

const matchTerms = [
  { term: 'P-Value', def: 'Probability of obtaining results at least as extreme as observed' },
  { term: 'Skewness', def: 'Measure of the asymmetry of a distribution' },
  { term: 'Kurtosis', def: 'Measure of the "tailedness" of the probability distribution' },
  { term: 'R-Squared', def: 'Coefficient of determination representing the variance explained' },
  { term: 'Z-Score', def: 'Number of standard deviations a data point is from the mean' },
  { term: 'Alpha (α)', def: 'Threshold for rejecting the null hypothesis (type I error rate)' },
];

// Flash Deck Data
const flashDeckData = [
  { id: 1, front: 'Sampling Frame', back: 'A physical registry or mechanism (like a SQL log) used to pull a sample from a target population.' },
  { id: 2, front: 'Standard Deviation', back: 'A measure of the amount of variation or dispersion of a set of values from their mean.' },
  { id: 3, front: 'Cronbach\'s Alpha', back: 'A coefficient of internal consistency used as an estimate of the reliability of a psychometric test.' },
  { id: 4, front: 'Multicollinearity', back: 'A phenomenon in which one predictor variable in a multiple regression model can be linearly predicted from the others.' },
  { id: 5, front: 'Latent Variable', back: 'A variable that is not directly observed but is rather inferred from other variables that are observed.' },
  { id: 6, front: 'P-Value', back: 'The probability of obtaining test results at least as extreme as the observed results, assuming the null hypothesis is correct.' },
  { id: 7, front: 'Homoscedasticity', back: 'The condition in which the variance of the residual/error term in a regression model is constant.' },
  { id: 8, front: 'Type II Error', back: 'The failure to reject a false null hypothesis (a "false negative").' },
  { id: 9, front: 'Central Limit Theorem', back: 'The theorem stating that the distribution of sample means tends towards normality as the sample size increases.' },
  { id: 10, front: 'Heteroscedasticity', back: 'A situation where the variance of errors in a regression model is not constant across observations.' },
];

// Formula Lab Data
const formulaLabData = [
  { id: 1, symbol: 'β', value: 'Beta Coefficient', desc: 'Slope in regression models' },
  { id: 2, symbol: 'ε', value: 'Error Term', desc: 'Residual variance in an equation' },
  { id: 3, symbol: 'λ', value: 'Lambda', desc: 'Poisson arrival rate' },
  { id: 4, symbol: 'χ²', value: 'Chi-Square', desc: 'Test of independence/fit' },
  { id: 5, symbol: 'ρ', value: 'Correlation Coeff', desc: 'Linear relationship strength' },
];

// Variable Sort Data
const variableSortItems = [
  { id: 1, text: 'Monthly Revenue', type: 'quantitative' },
  { id: 2, text: 'Job Title', type: 'qualitative' },
  { id: 3, text: 'Product Rating (1-5)', type: 'qualitative' },
  { id: 4, text: 'Server Temperature', type: 'quantitative' },
  { id: 5, text: 'Marital Status', type: 'qualitative' },
  { id: 6, text: 'Stock Price', type: 'quantitative' },
  { id: 7, text: 'User Gender', type: 'qualitative' },
  { id: 8, text: 'Memory Usage (GB)', type: 'quantitative' },
  { id: 9, text: 'Education Level', type: 'qualitative' },
  { id: 10, text: 'Network Latency (ms)', type: 'quantitative' },
];

export default function Syllabus() {
  const { role, progress, toggleTopicProgress } = useAppContext();
  const [activeTab, setActiveTab] = useState<'slides' | 'lectures' | 'selfcheck' | 'tasks'>('slides');
  const [assessmentMode, setAssessmentMode] = useState<'mcq' | 'duel' | 'sim' | 'flash' | 'formula' | 'sort'>('mcq');
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);
  
  // SIMS Game States
  const [simStep, setSimStep] = useState(0);
  const [simScore, setSimScore] = useState(0);

  // Match Game States
  const [matchSelection, setMatchSelection] = useState<{term: string | null, def: string | null}>({ term: null, def: null });
  const [matches, setMatches] = useState<string[]>([]);
  const [matchScore, setMatchScore] = useState(0);

  // Flash Deck States
  const [flashIndex, setFlashIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashScore, setFlashScore] = useState(0);
  const [completedFlash, setCompletedFlash] = useState(false);

  // Formula Lab States
  const [formulaRound, setFormulaRound] = useState(0);
  const [formulaSelection, setFormulaSelection] = useState<number | null>(null);
  const [formulaScore, setFormulaScore] = useState(0);
  const [formulaFeedback, setFormulaFeedback] = useState<boolean | null>(null);
  const [completedFormula, setCompletedFormula] = useState(false);

  // Variable Sort States
  const [sortIndex, setSortIndex] = useState(0);
  const [sortScore, setSortScore] = useState(0);
  const [sortFeedback, setSortFeedback] = useState<boolean | null>(null);
  const [completedSort, setCompletedSort] = useState(false);

  const currentQuestionSet = quizQuestions;

  const handleMatch = (type: 'term' | 'def', value: string) => {
    const newSelection = { ...matchSelection, [type]: value };
    setMatchSelection(newSelection);

    if (newSelection.term && newSelection.def) {
      const correct = matchTerms.find(m => m.term === newSelection.term && m.def === newSelection.def);
      if (correct) {
        setMatches([...matches, newSelection.term]);
        setMatchScore(matchScore + 20);
      }
      setTimeout(() => setMatchSelection({ term: null, def: null }), 300);
    }
  };

  const handleQuizAnswer = (answer: string) => {
    if (selectedQuiz === null) return;
    const q = currentQuestionSet.find(q => q.id === selectedQuiz);
    if (answer === q?.correct) {
      setQuizFeedback(`CORRECT. ${q.rationale}`);
    } else {
      setQuizFeedback(`INCORRECT. The answer is (${q?.correct}). ${q?.rationale}`);
    }
  };

  const handleSort = (category: 'qualitative' | 'quantitative') => {
    if (completedSort) return;
    const currentItem = variableSortItems[sortIndex];
    if (currentItem.type === category) {
      setSortScore(prev => prev + 10);
      setSortFeedback(true);
    } else {
      setSortFeedback(false);
    }

    setTimeout(() => {
      setSortFeedback(null);
      if (sortIndex < variableSortItems.length - 1) {
        setSortIndex(prev => prev + 1);
      } else {
        setCompletedSort(true);
      }
    }, 1000);
  };

  const handleFormulaChoice = (id: number) => {
    if (formulaFeedback !== null) return;
    if (id === formulaLabData[formulaRound].id) {
      setFormulaScore(prev => prev + 50);
      setFormulaFeedback(true);
    } else {
      setFormulaFeedback(false);
    }

    setTimeout(() => {
      setFormulaFeedback(null);
      if (formulaRound < formulaLabData.length - 1) {
        setFormulaRound(prev => prev + 1);
      } else {
        setCompletedFormula(true);
      }
    }, 1500);
  };

  return (
    <BasePage 
      title="Interactive Syllabus" 
      subtitle="Knowledge Hub" 
      description="Professional multi-modal learning environment featuring embedded PDF lectures, asynchronous tutorials, and gamified self-assessment modules."
    >
      <div className="flex flex-col gap-12">
        {/* Lecturer Quick Actions */}
        {role === 'lecturer' && (
          <div className="bg-black text-white p-8 border-l-8 border-primary flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h4 className="text-xl font-black uppercase tracking-tighter">Lecturer Console</h4>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Manage curriculum, upload new modules or files.</p>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-white text-black px-6 py-3 font-black uppercase text-[10px] tracking-widest hover:bg-primary transition-colors">
                <PlusCircle className="w-4 h-4" /> Add Topic
              </button>
              <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 font-black uppercase text-[10px] tracking-widest border-2 border-primary hover:bg-transparent transition-colors">
                <Upload className="w-4 h-4" /> Batch Upload
              </button>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b-8 border-black overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setActiveTab('slides')}
            className={cn("flex-1 py-6 px-10 font-black uppercase text-xs tracking-widest border-r-4 border-black whitespace-nowrap", activeTab === 'slides' ? 'bg-black text-white' : 'bg-white hover:bg-gray-50')}
          >
            01. Lecture Slides
          </button>
          <button 
            onClick={() => setActiveTab('lectures')}
            className={cn("flex-1 py-6 px-10 font-black uppercase text-xs tracking-widest border-r-4 border-black whitespace-nowrap", activeTab === 'lectures' ? 'bg-black text-white' : 'bg-white hover:bg-gray-50')}
          >
            02. Asynchronous Lectures
          </button>
          <button 
            onClick={() => setActiveTab('selfcheck')}
            className={cn("flex-1 py-6 px-10 font-black uppercase text-xs tracking-widest border-r-4 border-black whitespace-nowrap", activeTab === 'selfcheck' ? 'bg-black text-white' : 'bg-white hover:bg-gray-50')}
          >
            03. Self-Check
          </button>
          <button 
            onClick={() => setActiveTab('tasks')}
            className={cn("flex-1 py-6 px-10 font-black uppercase text-xs tracking-widest whitespace-nowrap", activeTab === 'tasks' ? 'bg-black text-white' : 'bg-white hover:bg-gray-50')}
          >
            04. Tasks
          </button>
        </div>

        {/* Content Area */}
        <div className="animate-in fade-in duration-500">
          {activeTab === 'slides' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {syllabusData.map((item) => (
                <div key={item.id} className="academic-card p-10 bg-white group hover:bg-black hover:text-white transition-all relative">
                  {progress[item.id] && (
                    <div className="absolute -top-4 -right-4 bg-primary text-black p-3 border-2 border-black rotate-12 group-hover:rotate-0 transition-transform">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  )}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-black text-primary tracking-[0.2em] group-hover:text-white">TOPIC {item.id.toString().padStart(2, '0')}</span>
                      <span className="bg-primary/10 text-primary group-hover:bg-white group-hover:text-black text-[8px] font-black px-2 py-0.5 w-fit uppercase tracking-widest border border-primary/20">SIMS Verified</span>
                    </div>
                    <div className="flex gap-4">
                      {role === 'lecturer' && (
                        <>
                          <button className="text-black group-hover:text-white hover:text-primary transition-colors"><Edit className="w-5 h-5" /></button>
                          <button className="text-black group-hover:text-white hover:text-red-500 transition-colors"><Trash2 className="w-5 h-5" /></button>
                        </>
                      )}
                      <FileText className="w-6 h-6 text-black group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">{item.title}</h3>
                  
                  {/* Topic Modules */}
                  <div className="mb-8 space-y-2">
                    {item.topics.slice(0, 3).map((topic, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-primary group-hover:bg-white shrink-0"></div>
                        <span className="text-[9px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100">{topic}</span>
                      </div>
                    ))}
                    {item.topics.length > 3 && (
                      <p className="text-[8px] font-black uppercase tracking-widest text-primary group-hover:text-white mt-1">
                        + {item.topics.length - 3} more modules in this unit
                      </p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button 
                      onClick={() => role === 'student' && toggleTopicProgress(item.id.toString())}
                      className={cn(
                        "btn-primary w-full text-[10px] py-4",
                        progress[item.id] ? "bg-green-600 hover:bg-green-700 border-green-600" : "group-hover:!bg-white group-hover:!text-black"
                      )}
                    >
                      {role === 'lecturer' ? 'Embed Viewer' : (progress[item.id] ? 'Review Content' : 'View & Complete')}
                    </button>
                    <button className="btn-secondary w-full group-hover:!border-white group-hover:!text-white text-[10px] py-4 flex items-center justify-center gap-2">
                       <Download className="w-4 h-4" /> Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'lectures' && (
            <div className="flex items-center justify-center py-20">
              <div className="w-full max-w-4xl aspect-video bg-black border-8 border-black shadow-[20px_20px_0px_rgba(0,0,0,1)] relative group overflow-hidden">
                <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                  <Play className="w-32 h-32 text-primary group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-white/10 pointer-events-none"></div>
                {role === 'lecturer' && (
                  <div className="absolute bottom-8 right-8 z-20">
                    <button className="bg-primary text-black font-black uppercase text-[10px] tracking-widest px-8 py-4 border-2 border-black hover:bg-white transition-colors">Replace Stream</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'selfcheck' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1 space-y-8">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-primary">Challenge Mode</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <button 
                      onClick={() => { setAssessmentMode('mcq'); setSelectedQuiz(null); setQuizFeedback(null); }}
                      className={cn(
                        "flex flex-col items-center justify-center p-6 border-4 transition-all gap-4",
                        assessmentMode === 'mcq' ? "bg-black text-white border-black" : "bg-white border-black hover:bg-gray-50"
                      )}
                    >
                      <CheckSquare className="w-8 h-8" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-center">Mastery MCQs</span>
                    </button>
                    <button 
                      onClick={() => { setAssessmentMode('duel'); setSelectedQuiz(null); setQuizFeedback(null); }}
                      className={cn(
                        "flex flex-col items-center justify-center p-6 border-4 transition-all gap-4",
                        assessmentMode === 'duel' ? "bg-black text-white border-black" : "bg-white border-black hover:bg-gray-50"
                      )}
                    >
                      <Zap className="w-8 h-8" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-center">Stochastic Match</span>
                    </button>
                    <button 
                      onClick={() => { setAssessmentMode('sim'); setSelectedQuiz(null); setQuizFeedback(null); }}
                      className={cn(
                        "flex flex-col items-center justify-center p-6 border-4 transition-all gap-4",
                        assessmentMode === 'sim' ? "bg-black text-white border-black" : "bg-white border-black hover:bg-gray-50"
                      )}
                    >
                      <Play className="w-8 h-8" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-center">SIMS Lab</span>
                    </button>
                    <button 
                      onClick={() => { setAssessmentMode('flash'); setSelectedQuiz(null); setQuizFeedback(null); }}
                      className={cn(
                        "flex flex-col items-center justify-center p-6 border-4 transition-all gap-4",
                        assessmentMode === 'flash' ? "bg-black text-white border-black" : "bg-white border-black hover:bg-gray-50"
                      )}
                    >
                      <BookOpen className="w-8 h-8" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-center">Flash Deck</span>
                    </button>
                    <button 
                      onClick={() => { setAssessmentMode('formula'); setSelectedQuiz(null); setQuizFeedback(null); }}
                      className={cn(
                        "flex flex-col items-center justify-center p-6 border-4 transition-all gap-4",
                        assessmentMode === 'formula' ? "bg-black text-white border-black" : "bg-white border-black hover:bg-gray-50"
                      )}
                    >
                      <Hash className="w-8 h-8" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-center">Formula Lab</span>
                    </button>
                    <button 
                      onClick={() => { setAssessmentMode('sort'); setSelectedQuiz(null); setQuizFeedback(null); }}
                      className={cn(
                        "flex flex-col items-center justify-center p-6 border-4 transition-all gap-4",
                        assessmentMode === 'sort' ? "bg-black text-white border-black" : "bg-white border-black hover:bg-gray-50"
                      )}
                    >
                      <LayoutList className="w-8 h-8" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-center">Variable Sort</span>
                    </button>
                  </div>
                </div>
                
                {assessmentMode === 'mcq' && (
                  <>
                    <h4 className="text-xl font-black uppercase border-b-4 border-black pb-2">Topic Drills</h4>
                    <div className="space-y-4">
                      {currentQuestionSet.map((q) => (
                        <button 
                          key={q.id}
                          onClick={() => { setSelectedQuiz(q.id); setQuizFeedback(null); }}
                          className={cn(
                            "w-full p-6 border-4 text-left transition-all",
                            selectedQuiz === q.id ? 'bg-primary text-white border-primary shadow-[6px_6px_0px_rgba(0,0,0,1)]' : 'bg-white border-black hover:bg-gray-50'
                          )}
                        >
                          <span className="text-[10px] font-black uppercase tracking-widest block mb-1">Module {q.id}</span>
                          <span className="text-sm font-black uppercase tracking-tight">{q.topic}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
                
                {assessmentMode === 'duel' && (
                  <div className="bg-black p-10 text-center space-y-6">
                    <Trophy className="w-12 h-12 text-primary mx-auto" />
                    <h4 className="text-2xl font-black text-white uppercase tracking-tighter">Your Score</h4>
                    <p className="text-6xl font-black text-primary">{matchScore}</p>
                    <button 
                      onClick={() => { setMatches([]); setMatchScore(0); }}
                      className="w-full py-4 bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-primary transition-colors"
                    >
                      Reset Duel
                    </button>
                  </div>
                )}
                
                {assessmentMode === 'sim' && (
                  <div className="bg-primary p-10 text-center space-y-6 text-white border-4 border-black">
                    <Zap className="w-12 h-12 text-white mx-auto animate-pulse" />
                    <h4 className="text-2xl font-black uppercase tracking-tighter">Lab XP</h4>
                    <p className="text-6xl font-black">{simScore}</p>
                    <button 
                      onClick={() => { setSimStep(0); setSimScore(0); }}
                      className="w-full py-4 bg-black text-white font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-colors"
                    >
                      Reset SIM
                    </button>
                  </div>
                )}

                {assessmentMode === 'flash' && (
                  <div className="bg-black p-10 text-center space-y-6 text-white border-4 border-primary">
                    <BookOpen className="w-12 h-12 text-primary mx-auto" />
                    <h4 className="text-2xl font-black uppercase tracking-tighter">Known Cards</h4>
                    <p className="text-6xl font-black text-primary">{flashScore}</p>
                    <button 
                      onClick={() => { setFlashIndex(0); setFlashScore(0); setIsFlipped(false); setCompletedFlash(false); }}
                      className="w-full py-4 bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-primary transition-colors"
                    >
                      Reset Deck
                    </button>
                  </div>
                )}

                {assessmentMode === 'formula' && (
                  <div className="bg-indigo-900 p-10 text-center space-y-6 text-white border-4 border-black">
                    <Hash className="w-12 h-12 text-primary mx-auto" />
                    <h4 className="text-2xl font-black uppercase tracking-tighter">Formula XP</h4>
                    <p className="text-6xl font-black text-primary">{formulaScore}</p>
                    <button 
                      onClick={() => { setFormulaRound(0); setFormulaScore(0); setFormulaFeedback(null); setCompletedFormula(false); }}
                      className="w-full py-4 bg-black text-white font-black uppercase text-xs tracking-widest hover:bg-primary transition-colors"
                    >
                      Reset Lab
                    </button>
                  </div>
                )}

                {assessmentMode === 'sort' && (
                  <div className="bg-emerald-900 p-10 text-center space-y-6 text-white border-4 border-black">
                    <LayoutList className="w-12 h-12 text-primary mx-auto" />
                    <h4 className="text-2xl font-black uppercase tracking-tighter">Sort Score</h4>
                    <p className="text-6xl font-black text-primary">{sortScore}</p>
                    <button 
                      onClick={() => { setSortIndex(0); setSortScore(0); setCompletedSort(false); }}
                      className="w-full py-4 bg-black text-white font-black uppercase text-xs tracking-widest hover:bg-primary transition-colors"
                    >
                      Reset Sort
                    </button>
                  </div>
                )}
              </div>

              <div className="lg:col-span-2">
                {assessmentMode === 'mcq' ? (
                  selectedQuiz ? (
                    <div className="bg-white border-4 border-black p-10 shadow-[10px_10px_0px_rgba(185,28,28,1)]">
                      <div className="space-y-8">
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <HelpCircle className="w-5 h-5 text-primary" />
                            <span className="text-xs font-black uppercase text-primary tracking-widest">Question {selectedQuiz}</span>
                          </div>
                          <div className="p-4 bg-gray-50 border-l-4 border-black mb-6">
                            <p className="text-xs font-bold leading-relaxed">{quizQuestions.find(q => q.id === selectedQuiz)?.scenario}</p>
                          </div>
                          <h4 className="text-xl font-black uppercase tracking-tight leading-tight">
                            {quizQuestions.find(q => q.id === selectedQuiz)?.question}
                          </h4>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {quizQuestions.find(q => q.id === selectedQuiz)?.options.map((opt) => (
                            <button 
                              key={opt.label}
                              onClick={() => handleQuizAnswer(opt.label)}
                              className="group p-4 border-2 border-black flex items-center gap-4 hover:bg-black hover:text-white transition-all text-left"
                            >
                              <span className="w-8 h-8 bg-black group-hover:bg-primary text-white flex items-center justify-center font-black text-xs shrink-0">{opt.label}</span>
                              <span className="text-xs font-bold uppercase tracking-wide">{opt.text}</span>
                            </button>
                          ))}
                        </div>

                        {quizFeedback && (
                          <div className={cn(
                            "p-8 border-4 animate-in zoom-in-95 duration-300",
                            quizFeedback.startsWith('CORRECT') ? 'bg-green-50 border-green-500 text-green-900' : 'bg-red-50 border-primary text-primary'
                          )}>
                            <div className="flex items-start gap-4">
                              <Zap className="w-6 h-6 shrink-0" />
                               <div>
                                 <p className="font-black uppercase tracking-widest text-xs mb-2">Academic Rationale</p>
                                 <p className="text-sm font-bold leading-relaxed">{quizFeedback}</p>
                               </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="h-full academic-card flex flex-col items-center justify-center p-20 bg-gray-50 border-4 border-black border-dashed opacity-40 text-center">
                      <Trophy className="w-20 h-20 mb-8" />
                      <p className="text-sm font-black uppercase tracking-widest">Select a topic drill to begin</p>
                    </div>
                  )
                ) : assessmentMode === 'duel' ? (
                  <div className="bg-white border-4 border-black p-10 h-full shadow-[10px_10px_0px_rgba(0,0,0,1)]">
                    <div className="mb-10 text-center">
                      <h4 className="text-3xl font-black uppercase tracking-tighter">Stochastic Match</h4>
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary">Pair the correct term with its definition</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">Terms</span>
                        {matchTerms.map((m) => (
                          <button
                            key={m.term}
                            disabled={matches.includes(m.term)}
                            onClick={() => handleMatch('term', m.term)}
                            className={cn(
                              "w-full p-4 border-2 font-black uppercase text-xs tracking-tight transition-all text-left",
                              matches.includes(m.term) ? "opacity-20 border-green-500 text-green-500" :
                              matchSelection.term === m.term ? "bg-black text-white border-black scale-105" : "border-black hover:border-primary"
                            )}
                          >
                            {m.term}
                          </button>
                        ))}
                      </div>
                      <div className="space-y-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">Definitions</span>
                        {matchTerms.map((m) => m.def).sort().map((def) => (
                          <button
                            key={def}
                            disabled={matches.includes(matchTerms.find(mt => mt.def === def)?.term || '')}
                            onClick={() => handleMatch('def', def)}
                            className={cn(
                              "w-full p-4 border-2 font-bold text-[10px] leading-tight transition-all text-left h-[72px] flex items-center",
                              matches.includes(matchTerms.find(mt => mt.def === def)?.term || '') ? "opacity-20 border-green-500 text-green-500" :
                              matchSelection.def === def ? "bg-black text-white border-black scale-105" : "border-black hover:border-primary"
                            )}
                          >
                            {def}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {matches.length === matchTerms.length && (
                      <div className="mt-12 bg-primary p-12 text-center text-white border-4 border-black animate-in slide-in-from-bottom-12 duration-500">
                        <Zap className="w-16 h-16 mx-auto mb-6" />
                        <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">Neural Alignment Achieved</h3>
                        <p className="text-xs font-black uppercase tracking-widest mb-8">All core concepts successfully mapped to memory</p>
                        <button 
                          onClick={() => { setMatches([]); setMatchScore(0); }}
                          className="px-12 py-4 bg-white text-black font-black uppercase tracking-widest text-xs border-4 border-black hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all"
                        >
                          Relaunch Duel
                        </button>
                      </div>
                    )}
                  </div>
                ) : assessmentMode === 'sim' ? (
                  <div className="bg-white border-4 border-black p-10 h-full shadow-[10px_10px_0px_rgba(0,0,0,1)] flex flex-col">
                    <div className="mb-10 text-center">
                      <h4 className="text-3xl font-black uppercase tracking-tighter">SIMS Lab: Research Flow</h4>
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary">Navigate complex research scenarios</p>
                    </div>

                    {simStep < quizQuestions.length ? (
                      <div className="flex-1 flex flex-col space-y-8 animate-in slide-in-from-right duration-300">
                        <div className="bg-gray-50 border-l-8 border-black p-8">
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-40">Scenario Lab {simStep + 1}</p>
                          <p className="text-lg font-black uppercase leading-tight italic">"{quizQuestions[simStep].scenario}"</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="font-black uppercase text-xs tracking-widest">Decision Point: {quizQuestions[simStep].question}</p>
                          <div className="grid grid-cols-1 gap-4">
                            {quizQuestions[simStep].options.map((opt) => (
                              <button
                                key={opt.label}
                                onClick={() => {
                                  if (opt.label === quizQuestions[simStep].correct) {
                                    setSimScore(prev => prev + 100);
                                  }
                                  setSimStep(prev => prev + 1);
                                }}
                                className="p-6 border-4 border-black text-left font-black uppercase text-xs hover:bg-black hover:text-white transition-all flex items-center justify-between group"
                              >
                                <span>{opt.text}</span>
                                <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-2 transition-transform" />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center space-y-10 animate-in zoom-in-95 duration-500">
                        <div className="relative">
                          <Trophy className="w-32 h-32 text-primary" />
                          <Zap className="w-12 h-12 text-black absolute -top-4 -right-4 animate-bounce" />
                        </div>
                        <div className="text-center">
                          <h3 className="text-5xl font-black uppercase tracking-tighter mb-2">Lab Completed</h3>
                          <p className="text-xl font-black text-primary uppercase">Final XP: {simScore}</p>
                        </div>
                        <button 
                          onClick={() => { setSimStep(0); setSimScore(0); }}
                          className="px-16 py-6 bg-black text-white font-black uppercase tracking-widest border-4 border-black hover:bg-primary transition-colors"
                        >
                          Restart SIMS
                        </button>
                      </div>
                    )}
                  </div>
                ) : assessmentMode === 'flash' ? (
                  <div className="bg-white border-4 border-black p-12 h-full shadow-[10px_10px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center text-center">
                    <BookOpen className="w-16 h-16 text-primary mb-8" />
                    <h4 className="text-3xl font-black uppercase tracking-tighter mb-4">
                      {completedFlash ? "Deck Mastery" : `Flash Deck (${flashIndex + 1}/${flashDeckData.length})`}
                    </h4>
                    
                    {completedFlash ? (
                      <div className="space-y-8 animate-in zoom-in duration-500 w-full max-w-md">
                        <Trophy className="w-24 h-24 text-primary mx-auto" />
                        <div className="space-y-2">
                           <p className="text-4xl font-black uppercase">Study Complete</p>
                           <p className="text-sm font-bold uppercase tracking-widest opacity-60">You confirmed knowledge of {flashScore} out of {flashDeckData.length} core concepts.</p>
                        </div>
                        <button 
                          onClick={() => { setFlashIndex(0); setFlashScore(0); setIsFlipped(false); setCompletedFlash(false); }}
                          className="btn-primary w-full py-4 font-black uppercase tracking-widest"
                        >
                          Restart Deck
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm font-bold uppercase tracking-widest opacity-60 mb-8 max-w-sm">Academic definitions for Postgraduate rigorous study.</p>
                        
                        <div 
                          onClick={() => setIsFlipped(!isFlipped)}
                          className="w-full max-w-md aspect-[4/3] relative cursor-pointer group [perspective:1000px]"
                        >
                          <div className={cn(
                            "absolute inset-0 transition-all duration-500 flex items-center justify-center p-12 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] [backface-visibility:hidden]",
                            isFlipped ? "[transform:rotateY(180deg)] bg-primary text-white" : "bg-white text-black"
                          )}>
                            <div className="flex flex-col items-center justify-center h-full w-full">
                              <p className="text-2xl font-black uppercase tracking-tight">
                                {flashDeckData[flashIndex].front}
                              </p>
                              <p className="absolute bottom-6 text-[8px] font-black uppercase tracking-widest opacity-40">Tap to flip</p>
                            </div>
                          </div>
                          <div className={cn(
                            "absolute inset-0 transition-all duration-500 flex items-center justify-center p-12 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] [backface-visibility:hidden]",
                            isFlipped ? "bg-primary text-white" : "[transform:rotateY(-180deg)] bg-white text-black"
                          )}>
                            <div className="flex flex-col items-center justify-center h-full w-full">
                              <p className="text-sm font-bold uppercase tracking-tight leading-relaxed">
                                {flashDeckData[flashIndex].back}
                              </p>
                              <p className="absolute bottom-6 text-[8px] font-black uppercase tracking-widest opacity-40">Tap to see term</p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-12 flex gap-6">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setIsFlipped(false); setFlashIndex(prev => Math.max(0, prev - 1)); }}
                            className="btn-secondary px-8 py-3 text-xs"
                          >
                            Previous
                          </button>
                          <button 
                             onClick={(e) => { 
                               e.stopPropagation(); 
                               setFlashScore(prev => prev + 1); 
                               if (flashIndex < flashDeckData.length - 1) {
                                  setFlashIndex(prev => prev + 1);
                                  setIsFlipped(false);
                               } else {
                                  setCompletedFlash(true);
                               }
                             }}
                             className="btn-primary px-8 py-3 text-xs"
                          >
                            I Know This
                          </button>
                          <button 
                             onClick={(e) => { 
                               e.stopPropagation(); 
                               if (flashIndex < flashDeckData.length - 1) {
                                  setFlashIndex(prev => prev + 1);
                                  setIsFlipped(false);
                               } else {
                                  setCompletedFlash(true);
                               }
                             }}
                             className="btn-secondary px-8 py-3 text-xs"
                          >
                            Next
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ) : assessmentMode === 'formula' ? (
                  <div className="bg-white border-4 border-black p-12 h-full shadow-[10px_10px_0px_rgba(0,0,0,1)] flex flex-col items-center">
                    <Hash className="w-16 h-16 text-primary mb-8" />
                    <h4 className="text-3xl font-black uppercase tracking-tighter mb-4 text-center">
                      {completedFormula ? "Lab Analysis Results" : `Formula Lab (${formulaRound + 1}/${formulaLabData.length})`}
                    </h4>
                    
                    {completedFormula ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in duration-500 w-full max-w-md">
                        <Trophy className="w-24 h-24 text-primary" />
                        <h3 className="text-4xl font-black uppercase">Sequence Calibration Complete</h3>
                        <p className="text-xl font-bold uppercase">Total XP Earned: {formulaScore}</p>
                        <button 
                          onClick={() => { setFormulaRound(0); setFormulaScore(0); setFormulaFeedback(null); setCompletedFormula(false); }}
                          className="btn-primary w-full py-4 font-black uppercase tracking-widest"
                        >
                          Restart Lab
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-12">Match the symbol to the correct semantic value</p>
                        
                        <div className="flex flex-col items-center gap-12 w-full max-w-2xl">
                          <div className="w-40 h-40 bg-black text-white flex items-center justify-center text-7xl font-black border-8 border-primary shadow-[12px_12px_0px_rgba(185,28,28,1)]">
                            {formulaLabData[formulaRound].symbol}
                          </div>

                          <div className="grid grid-cols-2 gap-4 w-full">
                            {formulaLabData.map((f, idx) => (
                               <button
                                 key={f.id}
                                 onClick={() => { setFormulaSelection(f.id); handleFormulaChoice(f.id); }}
                                 className={cn(
                                   "p-6 border-4 border-black font-black uppercase text-xs transition-all",
                                   formulaFeedback !== null && f.id === formulaLabData[formulaRound].id ? "bg-green-500 text-white border-green-700" :
                                   formulaFeedback === false && formulaSelection === f.id ? "bg-red-500 text-white" :
                                   "bg-white hover:bg-black hover:text-white"
                                 )}
                               >
                                 {f.value}
                               </button>
                            ))}
                          </div>
                        </div>
                        
                        {formulaFeedback !== null && (
                          <div className={cn(
                            "mt-10 p-6 border-4 font-black uppercase text-sm tracking-widest animate-in slide-in-from-top duration-300",
                            formulaFeedback ? "bg-green-100 border-green-500 text-green-700" : "bg-red-100 border-primary text-primary"
                          )}>
                            {formulaFeedback ? "AUTHENTIC ALIGNMENT" : "CALCULATION ERROR"}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <div className="bg-white border-4 border-black p-12 h-full shadow-[10px_10px_0px_rgba(0,0,0,1)] flex flex-col items-center">
                    <LayoutList className="w-16 h-16 text-primary mb-8" />
                    <h4 className="text-3xl font-black uppercase tracking-tighter mb-2">Variable Sort</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-12">Classify the data into active research categories</p>
                    
                    {completedSort ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in duration-500">
                        <Trophy className="w-24 h-24 text-primary" />
                        <h3 className="text-4xl font-black uppercase">Classification Complete</h3>
                        <p className="text-xl font-bold uppercase">Accuracy achieved: {Math.round((sortScore / (variableSortItems.length * 10)) * 100)}%</p>
                        <button 
                          onClick={() => { setSortIndex(0); setSortScore(0); setCompletedSort(false); }}
                          className="btn-primary px-12 py-4"
                        >
                          Restart Sort
                        </button>
                      </div>
                    ) : (
                      <div className="w-full flex-1 flex flex-col md:flex-row gap-12">
                        <div className="flex-1 space-y-6">
                           <div className="p-10 border-4 border-black bg-gray-50 flex flex-col items-center justify-center min-h-[300px] relative">
                             <span className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-6 underline">Active Item {sortIndex + 1}/{variableSortItems.length}</span>
                             <h4 className="text-4xl font-black uppercase tracking-tighter text-center">{variableSortItems[sortIndex].text}</h4>
                             
                             {sortFeedback !== null && (
                               <motion.div 
                                 initial={{ scale: 0.5, opacity: 0 }}
                                 animate={{ scale: 1, opacity: 1 }}
                                 className={cn(
                                   "absolute inset-0 flex items-center justify-center bg-black/90 text-white z-10",
                                   sortFeedback ? "text-primary" : "text-red-500"
                                 )}
                               >
                                 <span className="text-4xl font-black uppercase tracking-widest">{sortFeedback ? "CORRECT" : "WRONG"}</span>
                               </motion.div>
                             )}
                           </div>
                        </div>

                        <div className="w-full md:w-64 flex flex-col gap-6">
                          <button 
                            onClick={() => handleSort('qualitative')}
                            className="flex-1 border-4 border-black p-8 bg-white hover:bg-black hover:text-white transition-all flex flex-col items-center justify-center"
                          >
                             <span className="text-xl font-black uppercase tracking-tight">Qualitative</span>
                             <span className="text-[8px] font-bold uppercase opacity-60">Categorical</span>
                          </button>
                          <button 
                            onClick={() => handleSort('quantitative')}
                            className="flex-1 border-4 border-black p-8 bg-white hover:bg-black hover:text-white transition-all flex flex-col items-center justify-center"
                          >
                             <span className="text-xl font-black uppercase tracking-tight">Quantitative</span>
                             <span className="text-[8px] font-bold uppercase opacity-60">Numerical</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {tasksData.map((task) => (
                  <div key={task.id} className="border-4 border-black p-10 bg-white group hover:bg-black hover:text-white transition-all relative">
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[10px] font-black text-primary tracking-[0.2em] group-hover:text-white uppercase transition-colors">Assessment {task.id}</span>
                      <div className="flex gap-4">
                        {role === 'lecturer' && (
                          <>
                            <button className="text-black group-hover:text-white hover:text-primary transition-colors"><Edit className="w-5 h-5" /></button>
                            <button className="text-black group-hover:text-white hover:text-red-500 transition-colors"><Trash2 className="w-5 h-5" /></button>
                          </>
                        )}
                        <FileText className="w-6 h-6 text-black group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">{task.title}</h3>
                    <div className="p-4 bg-gray-50 border-l-4 border-black mb-8 group-hover:bg-white group-hover:text-black transition-colors">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Final Submission</p>
                      <p className="text-sm font-black italic">{task.deadline}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {role === 'student' && (
                        <button className="btn-primary w-full group-hover:!bg-white group-hover:!text-black text-[10px] py-4 uppercase font-black tracking-widest flex items-center justify-center gap-2">
                          <Upload className="w-4 h-4" /> Upload Report
                        </button>
                      )}
                      <button className="btn-primary w-full group-hover:!bg-white group-hover:!text-black text-[10px] py-4 uppercase font-black tracking-widest">
                        {role === 'lecturer' ? 'Grade Submissions' : 'Embed Instructions'}
                      </button>
                      <button className="btn-secondary w-full group-hover:!border-white group-hover:!text-white text-[10px] py-4 flex items-center justify-center gap-2 uppercase font-black tracking-widest">
                        <Download className="w-4 h-4" /> Download Brief
                      </button>
                    </div>
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
