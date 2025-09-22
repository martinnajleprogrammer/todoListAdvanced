const Totals = ({ taskName, number }: { taskName: string; number: number }) => {
  return (
    <div className="flex ml-0 p-2 justify-center mr-auto max-w-48 w-48">
      <h2 className="flex-2 font-bold text-plum-400 dark:text-plum-200">Tasks:</h2>
      <p className="pl-2 font-bold text-plum-400 dark:text-plum-400">
        <span className="text-plum-400 dark:text-plum-400">{taskName}</span> - {number}
      </p>
    </div>
  );
};
export default Totals;
