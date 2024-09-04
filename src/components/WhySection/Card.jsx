const Card = ({ icon, title, description }) => {
  return (
    <div className="bg-[#F8F9FD] rounded-[10px] p-6 flex flex-col items-start max-w-lg mx-auto">
      <img src={icon} alt={title} className="w-12 h-12 mb-4" />
      <h3 className="text-lg font-semibold mb-2 text-center">{title}</h3>
      <p className="text-sm text-left">{description}</p>
    </div>
  );
};

export default Card;
