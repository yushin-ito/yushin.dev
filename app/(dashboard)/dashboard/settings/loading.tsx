import { Skeleton } from "@/components/ui/skeleton";

const SettingsLoading = () => {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <Skeleton className="h-5 w-20" />
        <div className="flex flex-col space-y-4">
          <div className="flex items-end space-x-6">
            <Skeleton className="size-20" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full" />
      <div className="space-y-4">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-7 max-w-sm" />
      </div>
      <hr className="w-full" />
      <div className="flex flex-col space-y-6">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-7 w-40" />
      </div>
    </div>
  );
};

export default SettingsLoading;
