export const CompanyLogos = () => {
  const companies = [
    { name: 'Google', logo: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png' },
    { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
    { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
    { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
  ];

  return (
    <div className="w-full overflow-hidden py-12 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="relative flex">
        <div className="flex animate-scroll gap-16 px-8">
          {[...companies, ...companies].map((company, index) => (
            <div
              key={index}
              className="flex items-center justify-center min-w-[150px] h-20 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-2 border-primary/20 hover:border-primary/60 hover:scale-110 p-4"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="max-h-12 max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
