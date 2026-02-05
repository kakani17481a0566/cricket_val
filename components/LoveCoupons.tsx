
import React, { useState } from 'react';

interface Coupon {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const COUPONS: Coupon[] = [
  { id: 1, title: "Village Walk Pass", description: "One long, quiet walk in the village fields at sunset. No phones, just us.", icon: "🌾" },
  { id: 2, title: "Silent Power-Play", description: "Mohith stays silent during an entire cricket match (Challenge level: Dhoni).", icon: "🤫" },
  { id: 3, title: "Doggy Day-Out", description: "Mohith takes the dog for a bath and a walk while you sleep in.", icon: "🐕" },
  { id: 4, title: "Coffee-Free Zone", description: "No coffee smell in the house for 24 hours. A fresh, caffeine-free day!", icon: "🚫" },
  { id: 5, title: "The 'Yes' Umpire", description: "Mohith has to agree with every 'review' Likhita makes today.", icon: "☝️" },
  { id: 6, title: "Captain's Dinner", description: "A special meal served in village style, exactly how you like it.", icon: "🥘" },
];

const LoveCoupons: React.FC = () => {
  const [redeemed, setRedeemed] = useState<number[]>([]);

  const toggleRedeem = (id: number) => {
    if (redeemed.includes(id)) {
      setRedeemed(redeemed.filter(i => i !== id));
    } else {
      setRedeemed([...redeemed, id]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-6xl font-romantic font-bold text-rose-600 mb-4">Likhita's Royal Vouchers</h2>
        <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]">Redeem these to command your Captain Cool.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {COUPONS.map((coupon) => (
          <div 
            key={coupon.id}
            onClick={() => toggleRedeem(coupon.id)}
            className={`relative group cursor-pointer transition-all duration-700 transform ${
              redeemed.includes(coupon.id) ? 'opacity-60 scale-95' : 'hover:scale-105 hover:-rotate-1 active:scale-90'
            }`}
          >
            <div className={`bg-white rounded-[2.5rem] p-10 border-4 border-dashed transition-all duration-500 shadow-xl flex flex-col items-center text-center h-full ${redeemed.includes(coupon.id) ? 'border-gray-200 shadow-none' : 'border-rose-100 group-hover:border-rose-300'}`}>
              <div className={`text-6xl mb-6 transition-transform duration-500 ${redeemed.includes(coupon.id) ? 'grayscale opacity-50' : 'group-hover:scale-125 group-hover:rotate-6'}`}>{coupon.icon}</div>
              <h3 className="text-xl font-black text-rose-700 mb-3 tracking-wide uppercase">{coupon.title}</h3>
              <p className="text-gray-500 mb-8 text-sm font-medium leading-relaxed">{coupon.description}</p>
              <div className={`mt-auto pt-6 border-t w-full text-[10px] font-black tracking-[0.4em] ${redeemed.includes(coupon.id) ? 'text-gray-300' : 'text-rose-200'}`}>
                {redeemed.includes(coupon.id) ? 'REDEEMED' : 'TAP TO ACTIVATE'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoveCoupons;
