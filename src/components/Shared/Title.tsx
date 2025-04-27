interface TitleProps {
    title: string;
  }
  
  const Title = ({ title }: TitleProps) => {
    return (
      <div className="w-full flex justify-center">
        <div className="w-max text-center">
          <h1 className="text-white px-7 text-3xl font-bold mb-2">{title}</h1>
          <div className="flex w-full justify-center items-center">
            <div className="w-20 h-[5px] bg-red-600"></div>
            <div className="w-full h-[0.2px] bg-slate-200"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Title;
  