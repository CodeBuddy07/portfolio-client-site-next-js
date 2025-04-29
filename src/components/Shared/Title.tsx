interface TitleProps {
  title: string;
  description?: string;
}

const Title = ({ title, description }: TitleProps) => {
  return (
    <div className="text-center mb-16">
      <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500 inline-block mb-4">
        {title}
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-6"></div>
      <p className="text-gray-400 max-w-xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default Title;
