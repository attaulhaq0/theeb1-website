import { Link } from 'react-router-dom';

export const TopInfoBar = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#14b8a6] text-white py-2 px-4 nav-smooth">
      <div className="container mx-auto text-center text-sm">
        Join our{' '}
        <Link to="/contact" className="font-semibold underline hover:opacity-80 smooth-transition">
          Free Webinar
        </Link>{' '}
        on AI-Powered EB1A Strategies: How Data Reveals Approval Rates on{' '}
        <span className="font-semibold">October 22nd, 5:00 PM PT</span>
      </div>
    </div>
  );
};
