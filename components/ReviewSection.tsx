import React, { useState } from 'react';
import { Review } from '../types';
import { StarIcon } from './Icons';

interface ReviewSectionProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews: initialReviews, rating, reviewCount }) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [showModal, setShowModal] = useState(false);
  
  // Form State
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  // Calculate distributions (mock logic for visual)
  const distributions = [
    { star: 5, percentage: 80 },
    { star: 4, percentage: 15 },
    { star: 3, percentage: 3 },
    { star: 2, percentage: 1 },
    { star: 1, percentage: 1 },
  ];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview: Review = {
      id: `new-${Date.now()}`,
      authorName: 'You',
      authorAvatar: 'https://ui-avatars.com/api/?name=You&background=random',
      rating: newRating,
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      comment: newComment,
      helpfulCount: 0
    };
    
    setReviews([newReview, ...reviews]);
    setShowModal(false);
    setNewComment('');
    setNewRating(5);
  };

  return (
    <div className="py-12 border-t border-gray-200">
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <StarIcon className="w-6 h-6 text-gray-900" />
        {rating} · {reviews.length} reviews
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
        {/* Rating Breakdown */}
        <div className="space-y-3">
           {distributions.map((dist) => (
             <div key={dist.star} className="flex items-center gap-4 text-sm">
                <span className="w-4">{dist.star}</span>
                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-gray-900 rounded-full" 
                     style={{ width: `${dist.percentage}%` }}
                   />
                </div>
                <span className="w-8 text-right text-gray-500">{dist.percentage}%</span>
             </div>
           ))}
        </div>
        
        {/* Write a review CTA */}
        <div className="flex flex-col justify-center items-start">
           <h3 className="font-semibold text-lg mb-2">Have you been here?</h3>
           <p className="text-gray-600 text-sm mb-4">Share your experience to help others choose their adventure.</p>
           <button 
             onClick={() => setShowModal(true)}
             className="border border-gray-900 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
           >
             Write a review
           </button>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
        {reviews.map((review) => (
          <div key={review.id} className="break-inside-avoid">
            <div className="flex items-center gap-4 mb-4">
               <img 
                 src={review.authorAvatar} 
                 alt={review.authorName} 
                 className="w-12 h-12 rounded-full object-cover bg-gray-100"
               />
               <div>
                  <h4 className="font-bold text-gray-900">{review.authorName}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                     <span>{review.date}</span>
                     {/* Show stars only if not 5 to keep clean, or always show? Airbnb shows date mostly. Let's add stars nicely. */}
                     <div className="flex text-black">
                       {[...Array(5)].map((_, i) => (
                         <span key={i} className={`text-xs ${i < Math.floor(review.rating) ? 'opacity-100' : 'opacity-20'}`}>★</span>
                       ))}
                     </div>
                  </div>
               </div>
            </div>
            <div className="text-gray-700 leading-relaxed">
               {review.comment}
            </div>
            {review.helpfulCount > 0 && (
               <button className="mt-3 flex items-center gap-2 text-sm text-gray-500 font-medium hover:underline decoration-gray-400">
                  <span>Helpful</span>
                  <span>·</span>
                  <span>{review.helpfulCount}</span>
               </button>
            )}
          </div>
        ))}
      </div>

      {/* Write Review Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
           <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-fade-in-up">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                 <h3 className="text-lg font-bold">Write a review</h3>
                 <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                 </button>
              </div>
              <form onSubmit={handleSubmitReview} className="p-6">
                 <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2">How was your experience?</label>
                    <div className="flex gap-2">
                       {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewRating(star)}
                            className="text-2xl focus:outline-none transition-transform hover:scale-110"
                          >
                             {star <= newRating ? '★' : '☆'}
                          </button>
                       ))}
                    </div>
                 </div>
                 <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2">Share your thoughts</label>
                    <textarea 
                       className="w-full border border-gray-300 rounded-xl p-4 min-h-[120px] focus:ring-2 focus:ring-black focus:border-transparent outline-none resize-none"
                       placeholder="What did you like? What could be improved?"
                       value={newComment}
                       onChange={(e) => setNewComment(e.target.value)}
                       required
                    />
                 </div>
                 <button 
                   type="submit"
                   className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all"
                 >
                    Submit Review
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;