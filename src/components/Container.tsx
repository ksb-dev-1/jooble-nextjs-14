const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen pt-[calc(68px+2rem)] sm:pt-[calc(68px+4rem)] pb-[2rem] sm:pb-[4rem] flex justify-center">
      <div className="relative max-w-5xl w-full px-4">{children}</div>
    </div>
  );
};

export default Container;
