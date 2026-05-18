import { useState } from 'react';
import BasePage from '../components/BasePage';
import { Book, Bookmark, ExternalLink, ChevronDown, ChevronUp, Library } from 'lucide-react';
import { cn } from '../lib/utils';

export default function CourseReadingList() {
  const [openTab, setOpenTab] = useState<'primary' | 'additional' | null>('primary');

  const readingList = [
    { author: 'J. W. Creswell and J. D. Creswell', title: 'Research Design: Qualitative, Quantitative, and Mixed Methods Approaches', edition: '6th ed', publisher: 'SAGE Publications, Inc.', year: '2022' },
    { author: 'K. deMarrais, K. Roulston, and J. Copple', title: 'Qualitative Research Design and Methods: An Introduction (Qualitative Inquiry)', edition: '', publisher: 'Myers Education Press', year: '2024' },
    { author: 'W. E. Martin and K. D. Bridgmon', title: 'Quantitative and Statistical Research Methods: From Hypothesis to Results', edition: '', publisher: 'Wiley', year: '2012' },
  ];

  const additionalMaterials = [
    { author: 'R. H. Hoyle, Ed.', title: 'Handbook of Structural Equation Modeling', publisher: 'The Guilford Press, New York, London', year: 'July 2022', isbn: '978-1-60623-077-x' },
  ];

  return (
    <BasePage 
      title="Reading List" 
      subtitle="Scholarly Library" 
      description="A curated repository of foundational textbooks, empirical journals, and advanced SEM manuals required for the doctoral discourse in Quantitative Methods."
    >
      <div className="space-y-8">
        {/* Primary Reading List */}
        <div className="border-4 border-black bg-white shadow-[10px_10px_0px_rgba(0,0,0,1)]">
          <button 
            onClick={() => setOpenTab(openTab === 'primary' ? null : 'primary')}
            className="w-full flex items-center justify-between p-8 text-left hover:bg-gray-50 transition-all font-black uppercase tracking-tighter text-2xl"
          >
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-primary text-white flex items-center justify-center shrink-0">
                <Book className="w-6 h-6" />
              </div>
              <span>Primary Reading List</span>
            </div>
            {openTab === 'primary' ? <ChevronUp /> : <ChevronDown />}
          </button>

          {openTab === 'primary' && (
            <div className="p-10 border-t-4 border-black divide-y-2 divide-black/5 animate-in slide-in-from-top duration-300">
              {readingList.map((book, idx) => (
                <div key={idx} className="py-8 first:pt-0 last:pb-0 group">
                  <div className="flex items-start gap-8">
                    <span className="text-4xl font-black text-primary/20 group-hover:text-primary transition-colors">0{idx + 1}</span>
                    <div className="space-y-2">
                      <h4 className="text-lg font-black uppercase leading-tight group-hover:text-primary transition-colors">{book.title}</h4>
                      <p className="text-secondary text-xs font-bold uppercase tracking-widest">{book.author}</p>
                      <div className="flex items-center gap-4 pt-4">
                        <span className="bg-black text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-widest">{book.publisher}</span>
                        <span className="text-[10px] font-black text-secondary tracking-widest uppercase">{book.year} {book.edition && `• ${book.edition}`}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Additional Reading Materials */}
        <div className="border-4 border-black bg-white shadow-[10px_10px_0px_rgba(0,0,0,1)]">
          <button 
            onClick={() => setOpenTab(openTab === 'additional' ? null : 'additional')}
            className="w-full flex items-center justify-between p-8 text-left hover:bg-gray-50 transition-all font-black uppercase tracking-tighter text-2xl"
          >
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center shrink-0">
                <Library className="w-6 h-6" />
              </div>
              <span>Additional Reading Materials</span>
            </div>
            {openTab === 'additional' ? <ChevronUp /> : <ChevronDown />}
          </button>

          {openTab === 'additional' && (
            <div className="p-10 border-t-4 border-black animate-in slide-in-from-top duration-300">
              {additionalMaterials.map((book, idx) => (
                <div key={idx} className="bg-gray-50 p-10 border-2 border-black border-dashed flex flex-col md:flex-row gap-10 items-center">
                  <div className="w-32 h-44 bg-black flex items-center justify-center shrink-0 shadow-[8px_8px_0px_rgba(185,28,28,1)]">
                    <Bookmark className="text-white w-12 h-12" />
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-2xl font-black uppercase tracking-tighter">{book.title}</h4>
                    <p className="text-sm font-bold uppercase tracking-widest text-primary">{book.author}</p>
                    <div className="pt-4 space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-secondary">ISBN: {book.isbn}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-secondary">{book.publisher} ({book.year})</p>
                    </div>
                    <button className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] pt-4 hover:text-primary transition-colors">
                      <ExternalLink className="w-4 h-4" /> View Digital Repository
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </BasePage>
  );
}
