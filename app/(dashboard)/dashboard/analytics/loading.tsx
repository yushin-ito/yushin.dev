import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const AnalyticsLoading = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle>
                <Skeleton className="h-5 w-20" />
              </CardTitle>
              <Skeleton className="size-4" />
            </CardHeader>
            <CardContent className="mx-1 space-y-0.5">
              <Skeleton className="my-1 h-6 w-10" />
              <Skeleton className="h-4 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pt-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-9 w-[280px] " />
        </CardHeader>
        <CardContent>
          <div className="h-[320px]" />
        </CardContent>
      </Card>
    </>
  );
};

export default AnalyticsLoading;
