const EmptyState = () => {
  return (
    <div
      className="
        flex 
        h-full
        items-center 
        justify-center 
        bg-primary-100 
        px-6 
        py-10 
        md:px-8 
        lg:px-4 
        lg:py-6
      "
    >
      <div className="flex flex-col items-center text-center">
        <h3 className="mt-2 text-xl font-semibold">
          Select a chat or start a new conversation
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;
