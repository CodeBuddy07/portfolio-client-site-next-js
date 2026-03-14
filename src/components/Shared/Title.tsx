interface TitleProps {
  title: string;
  highlight: string; 
  eyebrow: string;   
  description: string;
}

const Title = ({ title, highlight, eyebrow, description }: TitleProps) => {
  const renderTitle = () => {
    if (!highlight) {
      return (
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
          {title}
        </span>
      );
    }

    const idx = title.toUpperCase().lastIndexOf(highlight.toUpperCase());
    if (idx === -1) {
      return (
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
          {title}
        </span>
      );
    }

    const before = title.slice(0, idx);
    const accented = title.slice(idx, idx + highlight.length);

    return (
      <>
        <span className="text-white">{before}</span>
        <span className="text-red-600 relative inline-block">
          {accented}
          <span
            className="absolute left-0 right-0 -bottom-1 h-0.5 rounded-full"
            style={{ background: "linear-gradient(90deg, #dc2626, rgba(255,77,77,0.3))" }}
          />
        </span>
      </>
    );
  };

  return (
    <div className="text-center mb-16">

      {eyebrow && (
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-7 h-px bg-gradient-to-r from-transparent to-gray-700 block" />
          <span className="font-mono text-[10px] tracking-[0.25em] text-gray-600 uppercase">
            {eyebrow}
          </span>
          <span className="w-7 h-px bg-gradient-to-l from-transparent to-gray-700 block" />
        </div>
      )}

      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-widest uppercase mb-4 leading-tight">
        {renderTitle()}
      </h2>


      {description && (
        <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
          {description}
        </p>
      )}

    </div>
  );
};

export default Title;