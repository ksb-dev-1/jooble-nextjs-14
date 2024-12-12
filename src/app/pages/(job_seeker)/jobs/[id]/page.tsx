const JobDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  return (
    <div className="min-h-[calc(100vh-88px)] pt-[calc(72px+4rem)] pb-[4rem] flex flex-col items-center justify-center">
      {id}
    </div>
  );
};

export default JobDetailPage;
