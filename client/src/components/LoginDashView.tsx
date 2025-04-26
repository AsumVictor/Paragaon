import React from 'react';

const DashboardPreview: React.FC = () => {
  return (
    <div className="h-full p-12 text-white">
      <div className="italic text-2xl font-light text-emerald-50/90 mb-10">Paragon</div>
      
      <div className="mt-16">
        <h1 className="text-5xl font-serif leading-tight">
          Enter<br />
          the Future
        </h1>
        <h2 className="text-5xl font-serif mt-4 leading-tight">
          of Payments,<br />
          today
        </h2>
      </div>

      <div className="absolute bottom-12 right-8 w-72 h-80 bg-white/10 backdrop-blur-md rounded-xl p-5 text-white shadow-xl">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold">12,347.23 $</div>
          <div className="text-sm text-emerald-100/70">Combined balance</div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-3 mt-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-medium">Primary Card</div>
              <div className="text-xs opacity-70">3495 **** **** 6917</div>
            </div>
            <div className="text-right">
              <div className="font-bold">2,546.64$</div>
              <div className="text-xs text-emerald-100/70">VISA</div>
            </div>
          </div>
        </div>
        
        <button className="w-full mt-4 text-xs bg-white/10 hover:bg-white/20 transition-colors py-2 rounded-md">
          View All
        </button>
      </div>
    </div>
  );
};

export default DashboardPreview;