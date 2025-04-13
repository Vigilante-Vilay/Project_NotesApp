export function AppBar() {
    return (
      <div className="shadow-lg h-16 flex items-center justify-between px-6 pt-4 pb-4 bg-sky-200">
        <div className="text-lg font-bold">
          Note-ify
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-gray-700 font-medium">
            Welcome
          </div>
          <div className="rounded-full h-10 w-10 bg-gray-200 flex items-center justify-center font-bold text-lg">
            U
          </div>
        </div>
      </div>
    );
  }